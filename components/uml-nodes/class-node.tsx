"use client"

import { memo, useState } from "react"
import { Handle, Position, type NodeProps, NodeResizer } from "reactflow"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ClassNodeData {
  name: string
  attributes?: string
  methods?: string
}

export const ClassNode = memo(({ data, selected }: NodeProps<ClassNodeData>) => {
  const [name, setName] = useState(data.name || "Class")
  const [attributes, setAttributes] = useState(data.attributes || "")
  const [methods, setMethods] = useState(data.methods || "")

  return (
    <div
      className={`relative bg-green-50 border-2 ${selected ? "border-primary" : "border-gray-300"} shadow-md`}
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

      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-gray-400" id="top" />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        id="bottom"
      />
      <Handle type="source" position={Position.Left} className="w-3 h-3 bg-white border-2 border-gray-400" id="left" />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-white border-2 border-gray-400"
        id="right"
      />

      {/* Class name */}
      <div className="p-2 border-b-2 border-gray-300 font-bold text-center bg-green-100">
        {selected ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center border-none shadow-none bg-transparent font-bold"
            onBlur={(e) => {
              // Update node data here if needed
            }}
          />
        ) : (
          <div className="text-center">{name}</div>
        )}
      </div>

      {/* Attributes */}
      <div className="p-2 border-b-2 border-gray-300">
        {selected ? (
          <Textarea
            value={attributes}
            onChange={(e) => setAttributes(e.target.value)}
            className="border-none shadow-none bg-transparent resize-none h-16 text-sm"
            placeholder="- attribute1: type
- attribute2: type"
            onBlur={(e) => {
              // Update node data here if needed
            }}
          />
        ) : (
          <div className="text-sm">
            {attributes || <span className="text-gray-400 text-xs">- attribute: type</span>}
          </div>
        )}
      </div>

      {/* Methods */}
      <div className="p-2">
        {selected ? (
          <Textarea
            value={methods}
            onChange={(e) => setMethods(e.target.value)}
            className="border-none shadow-none bg-transparent resize-none h-16 text-sm"
            placeholder="+ method1(): returnType
+ method2(param: type): returnType"
            onBlur={(e) => {
              // Update node data here if needed
            }}
          />
        ) : (
          <div className="text-sm">
            {methods || <span className="text-gray-400 text-xs">+ method(): returnType</span>}
          </div>
        )}
      </div>
    </div>
  )
})

ClassNode.displayName = "ClassNode"

