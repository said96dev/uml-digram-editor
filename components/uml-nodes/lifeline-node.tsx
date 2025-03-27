"use client"

import { memo, useState } from "react"
import { Handle, Position, type NodeProps, NodeResizer } from "reactflow"
import { Input } from "@/components/ui/input"

interface LifelineNodeData {
  name: string
}

export const LifelineNode = memo(({ data, selected }: NodeProps<LifelineNodeData>) => {
  const [name, setName] = useState(data.name || "Object")

  return (
    <div className="relative" style={{ width: 150, minHeight: 200 }}>
      <NodeResizer
        color="#1971c2"
        isVisible={selected}
        minWidth={150}
        minHeight={200}
        handleStyle={{ width: 8, height: 8 }}
        lineStyle={{ stroke: "#1971c2", strokeWidth: 1 }}
        keepAspectRatio={false}
        // Disable horizontal resizing to keep width constant
        handleComponent={{
          left: () => null,
          right: () => null,
          top: undefined,
          bottom: undefined,
        }}
      />

      {/* Object box at the top */}
      <div
        className={`p-2 bg-cyan-50 border-2 ${
          selected ? "border-primary" : "border-gray-300"
        } text-center mb-2 shadow-md`}
      >
        {selected ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center border-none shadow-none bg-transparent"
            onBlur={(e) => {
              // Update node data here if needed
            }}
          />
        ) : (
          <div className="text-center font-medium">{name}</div>
        )}
      </div>

      {/* Dashed lifeline */}
      <div className="w-0.5 h-full bg-gray-300 mx-auto border-dashed border-l-2" />

      {/* Activation box */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-4 h-1/3 bg-cyan-200 border border-gray-400" />

      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
      <Handle
        type="source"
        position={Position.Left}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        style={{ top: "40%" }}
        id="left"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        style={{ top: "40%" }}
        id="right"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        style={{ bottom: "10%" }}
        id="bottom"
      />
    </div>
  )
})

LifelineNode.displayName = "LifelineNode"

