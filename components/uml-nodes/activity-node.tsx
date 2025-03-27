"use client"

import { memo, useState } from "react"
import { Handle, Position, type NodeProps, NodeResizer } from "reactflow"
import { Input } from "@/components/ui/input"

interface ActivityNodeData {
  name: string
  type?: "action" | "decision" | "start" | "end" | "frame"
}

export const ActivityNode = memo(({ data, selected }: NodeProps<ActivityNodeData>) => {
  const [name, setName] = useState(data.name || "Activity")
  const type = data.type || "action"

  if (type === "start") {
    return (
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-black shadow-md" />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="bottom"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="right"
        />
        <Handle type="source" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
        <Handle
          type="source"
          position={Position.Left}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="left"
        />
      </div>
    )
  }

  if (type === "end") {
    return (
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-white border-4 border-black shadow-md" />
        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="left"
        />
        <Handle
          type="target"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="bottom"
        />
        <Handle
          type="target"
          position={Position.Right}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="right"
        />
      </div>
    )
  }

  if (type === "decision") {
    return (
      <div className="relative" style={{ width: 100, height: 100 }}>
        {/* Diamond shape container */}
        <div
          className="absolute w-full h-full bg-orange-50 border-2 border-gray-300 shadow-md"
          style={{
            transform: "rotate(45deg)",
            top: 0,
            left: 0,
          }}
        />

        {/* Content container (not rotated) */}
        <div className="absolute inset-0 flex items-center justify-center">
          {selected ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center border-none shadow-none bg-transparent w-full"
              onBlur={(e) => {
                // Update node data here if needed
              }}
            />
          ) : (
            <div className="text-center font-medium">{name}</div>
          )}
        </div>

        {/* Handles positioned at the diamond points */}
        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="bottom"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="right"
        />
        <Handle
          type="source"
          position={Position.Left}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="left"
        />
      </div>
    )
  }

  if (type === "frame") {
    return (
      <div
        className={`relative p-4 bg-orange-50 border-2 ${selected ? "border-primary" : "border-gray-300"} shadow-md`}
        style={{ width: 200, minHeight: 150 }}
      >
        <NodeResizer
          color="#1971c2"
          isVisible={selected}
          minWidth={200}
          minHeight={150}
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

        <div className="absolute top-0 left-0 border-b border-r border-gray-300 px-4 py-1 bg-orange-100">
          {selected ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm border-none shadow-none bg-transparent"
              onBlur={(e) => {
                // Update node data here if needed
              }}
            />
          ) : (
            <div className="text-sm font-medium">{name}</div>
          )}
        </div>

        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="bottom"
        />
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="left"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-white border-2 border-gray-400"
          id="right"
        />
      </div>
    )
  }

  // Default action node
  return (
    <div
      className={`relative p-4 rounded-md bg-orange-50 border-2 ${
        selected ? "border-primary" : "border-gray-300"
      } shadow-md`}
      style={{ width: 150, minHeight: 60 }}
    >
      <NodeResizer
        color="#1971c2"
        isVisible={selected}
        minWidth={150}
        minHeight={60}
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

      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        id="bottom"
      />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-white border-2 border-gray-400" id="left" />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        id="right"
      />

      <div className="flex items-center justify-center h-full">
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
    </div>
  )
})

ActivityNode.displayName = "ActivityNode"

