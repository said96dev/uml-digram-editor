'use client'

import { memo, useState } from 'react'
import {
  Handle,
  Position,
  type NodeProps,
  NodeResizeControl,
  NodeResizer,
} from 'reactflow'
import { Input } from '@/components/ui/input'
import { ResizeIcon } from './ResizeIcon'

interface UseCaseNodeData {
  name: string
  width?: number
  height?: number
}

export const UseCaseNode = memo(
  ({ data, selected }: NodeProps<UseCaseNodeData>) => {
    const [name, setName] = useState(data.name || 'Use Case')
    const [dimensions, setDimensions] = useState({
      width: data?.width || 100,
      height: data?.height || 50,
    })

    return (
      <div
        className={` rounded-full bg-blue-50 border-2 ${
          selected ? 'border-primary' : 'border-gray-300'
        } shadow-md`}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        <NodeResizer
          color='#1971c2'
          isVisible={selected}
          minWidth={100}
          minHeight={50}
          handleStyle={{ width: 8, height: 8 }}
          lineStyle={{ stroke: '#1971c2', strokeWidth: 1 }}
          keepAspectRatio={false}
          onResize={(_, newDimensions) => {
            setDimensions(newDimensions)
          }}
        />

        {/* Existing Handles */}
        <Handle
          type='target'
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
        <Handle
          type='target'
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

        <div
          className='flex items-center justify-center h-full p-2 overflow-hidden'
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {selected ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='text-center border-none shadow-none bg-transparent w-full'
              onBlur={(e) => {
                // Update node data here if needed
              }}
            />
          ) : (
            <div className='text-center font-medium truncate'>{name}</div>
          )}
        </div>
      </div>
    )
  }
)

UseCaseNode.displayName = 'UseCaseNode'
