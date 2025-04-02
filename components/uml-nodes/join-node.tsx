'use client'

import { memo, useState } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import { Input } from '../ui/input'
import { useNodeUpdate } from '@/hooks/use-node-update'

interface JoinNodeData {
  orientation?: 'horizontal' | 'vertical'
  name?: string
}

export const JoinNode = memo(
  ({ data, selected, id }: NodeProps<JoinNodeData>) => {
    const orientation = data?.orientation || 'horizontal'
    const [name, setName] = useState(data.name || 'Activity')
    const { updateNodeData } = useNodeUpdate()
    const handleTextChange = (newText: string) => {
      setName(newText)
      updateNodeData(id, 'name', newText)
    }
    if (orientation === 'horizontal') {
      return (
        <div className='relative' style={{ width: 120, height: 20 }}>
          {/* Horizontal bar */}
          <div
            className={`w-full h-full bg-white border border-black  rounded-sm ${
              selected ? 'ring-2 ring-primary' : ''
            }`}
          />

          {/* Multiple input handles at the top */}
          <Handle
            type='target'
            position={Position.Top}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='top-left'
            style={{ left: '25%' }}
          />
          <Handle
            type='target'
            position={Position.Top}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='top-right'
            style={{ left: '75%' }}
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            {selected ? (
              <Input
                value={name}
                onChange={(e) => handleTextChange(e.target.value)}
                className='text-center border-none shadow-none bg-transparent w-full'
                onBlur={(e) => {
                  // Update node data here if needed
                }}
              />
            ) : (
              <div className='text-center font-medium'>{name}</div>
            )}
          </div>
          {/* Single output handle at the bottom */}
          <Handle
            type='source'
            position={Position.Bottom}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='bottom'
          />
        </div>
      )
    } else {
      return (
        <div className='relative' style={{ width: 20, height: 120 }}>
          {/* Vertical bar */}
          <div
            className={`w-full h-full bg-black rounded-sm ${
              selected ? 'ring-2 ring-primary' : ''
            }`}
          />

          {/* Multiple input handles at the left */}
          <Handle
            type='target'
            position={Position.Left}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='left-top'
            style={{ top: '25%' }}
          />
          <Handle
            type='target'
            position={Position.Left}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='left-bottom'
            style={{ top: '75%' }}
          />

          {/* Single output handle at the right */}
          <Handle
            type='source'
            position={Position.Right}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='right'
          />
        </div>
      )
    }
  }
)

JoinNode.displayName = 'JoinNode'
