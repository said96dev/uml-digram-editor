"use client"

import { memo, useState } from "react"
import { type NodeProps, NodeResizer, Position, Handle } from "reactflow"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical } from "lucide-react"

interface StickyNoteData {
  text: string
  color?: string
}

export const StickyNote = memo(({ data, selected }: NodeProps<StickyNoteData>) => {
  const [text, setText] = useState(data.text || "Add your notes here...")
  const colors = ["bg-yellow-100", "bg-blue-100", "bg-green-100", "bg-purple-100", "bg-pink-100", "bg-orange-100"]
  const [colorIndex, setColorIndex] = useState(data.color ? colors.indexOf(data.color) : 0)

  const handleColorChange = () => {
    setColorIndex((colorIndex + 1) % colors.length)
  }

  return (
    <div
      className={`relative p-4 shadow-md ${colors[colorIndex]} border-2 ${
        selected ? "border-primary" : "border-transparent"
      }`}
      style={{
        width: 150,
        minHeight: 100,
        transform: "rotate(-1deg)",
      }}
    >
      <NodeResizer
        color="#1971c2"
        isVisible={selected}
        minWidth={150}
        minHeight={100}
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

      {/* Handles on all sides to connect from anywhere */}
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

      {/* Color change button - only visible when selected */}
      {selected && (
        <div
          className="absolute top-1 right-1 p-1 rounded-full bg-white shadow-sm cursor-pointer"
          onClick={handleColorChange}
        >
          <GripVertical className="h-4 w-4 text-gray-500" />
        </div>
      )}

      <div className="h-full">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-none shadow-none bg-transparent resize-none h-full text-sm"
          placeholder="Add your notes here..."
        />
      </div>
    </div>
  )
})

StickyNote.displayName = "StickyNote"

