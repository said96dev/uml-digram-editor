'use client'

import type React from 'react'
import { useCallback } from 'react'
import 'reactflow/dist/style.css'
import { Trash2 } from 'lucide-react'
import { type NodeProps, useReactFlow } from 'reactflow'

export function withDeleteButton(
  NodeComponent: React.ComponentType<NodeProps>
) {
  return (props: NodeProps) => {
    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        setNodes((nds) => nds.filter((n) => n.id !== props.id))
      },
      [props.id]
    )
    const { setNodes } = useReactFlow()
    return (
      <div className='relative'>
        {props.selected && (
          <button
            className='absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors'
            onClick={handleDelete}
            title='Node löschen'
          >
            <Trash2 className='h-3.5 w-3.5' />
          </button>
        )}
        <NodeComponent {...props} />
      </div>
    )
  }
}
