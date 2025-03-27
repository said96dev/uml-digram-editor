import { memo } from "react"
import { Handle, Position, type NodeProps, NodeResizer } from "reactflow"

export const CustomNode = memo(({ data, selected }: NodeProps) => {
  const { label, inputs = 1, outputs = 1, color = "#ff9900" } = data

  return (
    <div
      className={`relative p-4 rounded-lg shadow-lg border-2 ${selected ? "border-primary" : "border-border"}`}
      style={{ backgroundColor: color, minWidth: 150, minHeight: 60 }}
    >
      <NodeResizer color="#1971c2" isVisible={selected} minWidth={150} minHeight={60} />

      {/* Input handles */}
      {Array.from({ length: inputs }).map((_, i) => (
        <Handle
          key={`input-${i}`}
          id={String.fromCharCode(97 + i)} // a, b, c, ...
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          style={{ left: `${((i + 1) * 100) / (inputs + 1)}%` }}
        />
      ))}

      {/* Output handles */}
      {Array.from({ length: outputs }).map((_, i) => (
        <Handle
          key={`output-${i}`}
          id={String.fromCharCode(97 + i)} // a, b, c, ...
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          style={{ left: `${((i + 1) * 100) / (outputs + 1)}%` }}
        />
      ))}

      <div className="text-center font-medium text-white drop-shadow-md">{label}</div>
    </div>
  )
})

CustomNode.displayName = "CustomNode"

