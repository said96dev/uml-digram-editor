"use client"

import type React from "react"

import { memo, useCallback } from "react"
import { type EdgeProps, getStraightPath, EdgeLabelRenderer, useReactFlow } from "reactflow"
import { X } from "lucide-react"

export const MessageEdge = memo(
  ({ id, sourceX, sourceY, targetX, targetY, data, style = {}, markerEnd, animated }: EdgeProps) => {
    const { setEdges } = useReactFlow()

    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    })

    // Enhanced animation style for better visibility
    const animationStyle = animated
      ? {
          ...style,
          strokeDasharray: 5,
          animation: "flowAnimation 1.5s infinite linear",
        }
      : style

    const handleDeleteEdge = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation()
        setEdges((edges) => edges.filter((edge) => edge.id !== id))
      },
      [id, setEdges],
    )

    return (
      <>
        <path
          id={id}
          className="react-flow__edge-path stroke-gray-600"
          d={edgePath}
          strokeWidth={2} // Increased stroke width for better visibility
          style={animationStyle}
          markerEnd={markerEnd || "url(#message-arrow)"}
        />
        {data?.label && (
          <EdgeLabelRenderer>
            <div
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: "all",
              }}
              className="px-2 py-1 bg-white text-xs border border-gray-200 rounded nodrag shadow-sm"
            >
              {data.label}
            </div>
          </EdgeLabelRenderer>
        )}

        {/* Delete button */}
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${(sourceX + targetX) / 2}px,${(sourceY + targetY) / 2 - 15}px)`,
              pointerEvents: "all",
            }}
            className="nodrag"
          >
            <button
              className="w-5 h-5 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-red-100 hover:border-red-300 transition-colors"
              onClick={handleDeleteEdge}
            >
              <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </EdgeLabelRenderer>
      </>
    )
  },
)

MessageEdge.displayName = "MessageEdge"

