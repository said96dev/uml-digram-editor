"use client"

import { memo, useState } from "react"
import { Handle, Position, type NodeProps, NodeResizer } from "reactflow"
import { Textarea } from "@/components/ui/textarea"

interface NoteNodeData {
  text: string
}

export const NoteNode = memo(({ data, selected }: NodeProps<NoteNodeData>) => {
  const [text, setText] = useState(data.text || "Note")

  return (
    <div
      className={`relative p-4 bg-yellow-50 border-2 ${selected ? "border-primary" : "border-yellow-300"} shadow-md`}
      style={{
        width: 180,
        minHeight: 100,
        clipPath: "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
      }}
    >
      <NodeResizer
        color="#1971c2"
        isVisible={selected}
        minWidth={180}
        minHeight={100}
        handleStyle={{ width: 8, height: 8 }}
        lineStyle={{ stroke: "#1971c2", strokeWidth: 1 }}
        keepAspectRatio={false}
      />

      {/* Folded corner effect */}
      <div
        className="absolute top-0 right-0 w-4 h-4 bg-yellow-300"
        style={{
          clipPath: "polygon(0% 0%, 100% 100%, 100% 0%)",
        }}
      />

      {/* Handles on all sides - ensuring notes can connect to other nodes */}
      <Handle type="source" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        id="right"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        id="bottom"
      />
      <Handle type="source" position={Position.Left} className="w-3 h-3 bg-white border-2 border-gray-400" id="left" />

      <div className="h-full">
        {selected ? (
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-none shadow-none bg-transparent resize-none h-full"
            onBlur={(e) => {
              // Update node data here if needed
            }}
          />
        ) : (
          <div className="text-sm">{text}</div>
        )}
      </div>
    </div>
  )
})

NoteNode.displayName = "NoteNode"

