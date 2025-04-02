'use client'

import { memo, useState } from 'react'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'
import { Input } from '@/components/ui/input'

interface ObjectNodeData {
  name: string
  width?: number
  height?: number
}

export const ObjectNode = memo(
  ({ data, selected }: NodeProps<ObjectNodeData>) => {
    const [name, setName] = useState(data.name || 'Object')
    const [dimensions, setDimensions] = useState({
      width: data?.width || 150,
      height: data?.height || 80,
    })

    return (
      <div
        className={`relative p-4 bg-cyan-50 border-2 ${
          selected ? 'border-primary' : 'border-gray-300'
        } shadow-md`}
      >
        <NodeResizer
          color='#1971c2'
          isVisible={selected}
          minWidth={150}
          minHeight={80}
          handleStyle={{ width: 8, height: 8 }}
          lineStyle={{ stroke: '#1971c2', strokeWidth: 3 }}
          keepAspectRatio={false}
          onResize={(_, newDimensions) => {
            setDimensions(newDimensions)
          }}
        />

        <Handle
          type='source'
          position={Position.Top}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='top'
        />
        <Handle
          type='source'
          position={Position.Bottom}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='bottom'
        />
        <Handle
          type='source'
          position={Position.Left}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='left'
        />
        <Handle
          type='source'
          position={Position.Right}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='right'
        />

        <div className='flex items-center justify-center h-full'>
          {selected ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='text-center border-none shadow-none bg-transparent underline'
              onBlur={(e) => {
                // Update node data here if needed
              }}
            />
          ) : (
            <div className='text-center font-medium underline'>{name}</div>
          )}
        </div>
      </div>
    )
  }
)

ObjectNode.displayName = 'ObjectNode'
