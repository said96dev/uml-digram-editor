'use client'

import type React from 'react'

import { memo, useCallback, useState } from 'react'
import {
  type EdgeProps,
  getSmoothStepPath,
  EdgeLabelRenderer,
  useReactFlow,
} from 'reactflow'
import { X } from 'lucide-react'
import { Input } from '../ui/input'

export const AssociationEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    markerEnd,
  }: EdgeProps) => {
    const { setEdges } = useReactFlow()

    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })
    const handleDeleteEdge = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation()
        setEdges((edges) => edges.filter((edge) => edge.id !== id))
      },
      [id, setEdges]
    )
    const [isEditing, setIsEditing] = useState(false)
    const [label, setLabel] = useState(data?.label || '')

    const handleLabelChange = useCallback(
      (newLabel: string) => {
        setLabel(newLabel)
        setEdges((edges) =>
          edges.map((edge) => {
            if (edge.id === id) {
              return {
                ...edge,
                data: { ...edge.data, label: newLabel },
              }
            }
            return edge
          })
        )
      },
      [id, setEdges]
    )

    return (
      <>
        <path
          id={id}
          className='react-flow__edge-path stroke-gray-600'
          d={edgePath}
          strokeWidth={3}
          markerEnd={markerEnd || 'url(#association-arrow)'}
        />
        {/* Edge Label */}
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              backgroundColor: 'white',
            }}
            className='nodrag'
          >
            {isEditing ? (
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onBlur={() => {
                  handleLabelChange(label)
                  setIsEditing(false)
                }}
                className='text-xs w-24 py-0 px-1 h-6'
                autoFocus
              />
            ) : (
              <div
                className='px-2 py-0.5 bg-white text-xs border border-gray-200 rounded shadow-sm cursor-pointer'
                onClick={() => setIsEditing(true)}
              >
                {label || ''}
              </div>
            )}
          </div>
        </EdgeLabelRenderer>

        {/* Delete button */}
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(50%, 50%) translate(${labelX}px,${labelY}px)`,

              pointerEvents: 'all',
            }}
            className='nodrag'
          >
            <button
              className='w-5 h-5 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-red-100 hover:border-red-300 transition-colors'
              onClick={handleDeleteEdge}
            >
              <X className='w-3 h-3 text-gray-500 hover:text-red-500' />
            </button>
          </div>
        </EdgeLabelRenderer>
      </>
    )
  }
)

AssociationEdge.displayName = 'AssociationEdge'
