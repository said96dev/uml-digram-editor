'use client'

import { memo, useState } from 'react'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'
import { Input } from '@/components/ui/input'

interface TimelineNodeData {
  name: string
}

export const TimelineNode = memo(
  ({ data, selected }: NodeProps<TimelineNodeData>) => {
    const [name, setName] = useState(data.name || 'Timeline')

    return (
      <div
        className='relative bg-cyan-50 border-2 border-gray-300 shadow-md'
        style={{ width: 300, minHeight: 150 }}
      >
        <NodeResizer
          color='#1971c2'
          isVisible={selected}
          minWidth={300}
          minHeight={150}
          handleStyle={{ width: 8, height: 8 }}
          lineStyle={{ stroke: '#1971c2', strokeWidth: 3 }}
          keepAspectRatio={false}
          // Disable horizontal resizing to keep width constant
          handleComponent={{
            left: () => null,
            right: () => null,
            top: undefined,
            bottom: undefined,
          }}
        />

        {/* Timeline label */}
        <div
          className={`absolute left-0 top-0 p-2 bg-cyan-100 border-r border-b ${
            selected ? 'border-primary' : 'border-gray-300'
          } text-center`}
        >
          {selected ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='text-center border-none shadow-none bg-transparent'
              onBlur={(e) => {
                // Update node data here if needed
              }}
            />
          ) : (
            <div className='text-center font-medium'>{name}</div>
          )}
        </div>

        {/* Timeline horizontal line */}
        <div className='absolute top-16 left-0 w-full h-0.5 bg-gray-600' />

        {/* Time markers */}
        <div className='absolute top-16 left-0 w-0.5 h-3 bg-gray-800' />
        <div className='absolute top-16 left-1/4 w-0.5 h-3 bg-gray-800' />
        <div className='absolute top-16 left-2/4 w-0.5 h-3 bg-gray-800' />
        <div className='absolute top-16 left-3/4 w-0.5 h-3 bg-gray-800' />
        <div className='absolute top-16 right-0 w-0.5 h-3 bg-gray-800' />

        {/* Time labels */}
        <div className='absolute top-20 left-0 text-xs text-gray-800 font-medium'>
          t0
        </div>
        <div className='absolute top-20 left-1/4 text-xs text-gray-800 -translate-x-1/2 font-medium'>
          t1
        </div>
        <div className='absolute top-20 left-2/4 text-xs text-gray-800 -translate-x-1/2 font-medium'>
          t2
        </div>
        <div className='absolute top-20 left-3/4 text-xs text-gray-800 -translate-x-1/2 font-medium'>
          t3
        </div>
        <div className='absolute top-20 right-0 text-xs text-gray-800 -translate-x-full font-medium'>
          t4
        </div>

        {/* State line */}
        <div className='absolute top-8 left-0 w-full h-0.5 bg-gray-400' />
        <div className='absolute top-8 left-1/4 w-0.5 h-8 bg-gray-400' />
        <div className='absolute top-8 left-2/4 w-0.5 h-8 bg-gray-400' />
        <div className='absolute top-8 left-3/4 w-0.5 h-8 bg-gray-400' />

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
      </div>
    )
  }
)

TimelineNode.displayName = 'TimelineNode'
