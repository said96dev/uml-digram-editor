'use client'

import { memo, useState } from 'react'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'
import { Input } from '@/components/ui/input'
import { useNodeUpdate } from '@/hooks/use-node-update'

interface StateNodeData {
  name: string
  type?: 'initial' | 'final' | 'normal' | 'decision'
  width?: number
  height?: number
}

export const StateNode = memo(
  ({ data, selected, id }: NodeProps<StateNodeData>) => {
    const [name, setName] = useState(data.name || 'State')
    const type = data.type || 'normal'

    const [dimensions, setDimensions] = useState({
      width: data?.width || 100,
      height: data?.height || 100,
    })
    const { updateNodeData } = useNodeUpdate()
    const handleTextChange = (newText: string) => {
      setName(newText)
      updateNodeData(id, 'name', newText)
    }

    if (type === 'decision') {
      return (
        <div
          className='relative'
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          {/* Diamond shape container */}
          <div
            className='absolute w-full h-full bg-orange-50 border-2 border-gray-300 shadow-md'
            style={{
              transform: 'rotate(45deg)',
              top: 0,
              left: 0,
            }}
          />

          {/* Content container (not rotated) */}
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

          {/* Handles positioned at the diamond points */}
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
            position={Position.Right}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='right'
          />
          <Handle
            type='source'
            position={Position.Left}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='left'
          />
        </div>
      )
    }

    if (type === 'initial') {
      return (
        <div className='relative'>
          <div className='w-16 h-16 rounded-full bg-black  shadow-md' />
          <Handle
            type='source'
            position={Position.Bottom}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='bottom'
          />
          <Handle
            type='source'
            position={Position.Right}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='right'
          />
          <div className='absolute inset-0 flex items-center justify-center text-white'>
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

          <Handle
            type='source'
            position={Position.Top}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='top'
          />
          <Handle
            type='source'
            position={Position.Left}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='left'
          />
        </div>
      )
    }
    if (type === 'final') {
      return (
        <div className='relative'>
          <div className='w-16 h-16 rounded-full bg-white border-4 border-black shadow-md' />
          <Handle
            type='target'
            position={Position.Top}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='top'
          />
          <Handle
            type='target'
            position={Position.Left}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='left'
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

          <Handle
            type='target'
            position={Position.Bottom}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='bottom'
          />
          <Handle
            type='target'
            position={Position.Right}
            className='w-3 h-3 bg-white border-2 border-gray-400'
            id='right'
          />
        </div>
      )
    }

    return (
      <div
        className={`relative p-4 rounded-xl bg-purple-50 border-2 ${
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

        <div className='flex flex-col items-center justify-center h-full gap-2'>
          {selected ? (
            <Input
              value={name}
              onChange={(e) => handleTextChange(e.target.value)}
              className='text-center border-none shadow-none bg-transparent'
              onBlur={(e) => {
                // Update node data here if needed
              }}
            />
          ) : (
            <div className='text-center font-medium'>{name}</div>
          )}
        </div>
      </div>
    )
  }
)

StateNode.displayName = 'StateNode'
