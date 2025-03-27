import { memo } from "react"
import { type NodeProps, NodeResizer } from "reactflow"

export const GroupNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`p-4 rounded-lg bg-background/80 backdrop-blur-sm border-2 ${
        selected ? "border-primary" : "border-border"
      }`}
    >
      <NodeResizer color="#1971c2" isVisible={selected} minWidth={200} minHeight={100} />
      <div className="font-medium text-sm mb-2">{data.label}</div>
    </div>
  )
})

GroupNode.displayName = "GroupNode"

