'use client'

import { memo, useState } from 'react'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'
import { Input } from '@/components/ui/input'
import { useNodeUpdate } from '@/hooks/use-node-update'

interface ActivityNodeData {
  name: string
  type?: 'action' | 'decision' | 'start' | 'end' | 'merge' | 'frame'
  width?: number
  height?: number
}

export const ActivityNode = memo(
  ({ data, selected, id }: NodeProps<ActivityNodeData>) => {
    const [name, setName] = useState(data.name || 'Activity')
    const type = data.type || 'action'
    const { updateNodeData, updateNodeDataBatch } = useNodeUpdate()
    const handleTextChange = (newText: string) => {
      setName(newText)
      updateNodeData(id, 'name', newText)
    }
    const [dimensions, setDimensions] = useState({
      width: data?.width || 100,
      height: data?.height || 50,
    })
    if (type === 'start') {
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
    if (type === 'frame') {
      return (
        <div
          className={`relative p-4 bg-transparent-50 border-2 ${
            selected ? 'border-primary' : 'border-orange-300'
          } shadow-md`}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            transition: 'width 0.2s, height 0.2s',
            zIndex: -1, // Niedrigerer z-index, damit Kanten sichtbar sind
          }}
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
            onResizeEnd={(_, newDimensions) => {
              updateNodeDataBatch(id, {
                width: newDimensions.width,
                height: newDimensions.height,
              })
            }}
          />
          <div className='absolute top-0 left-0 border-b border-r border-gray-300 px-4 py-1 bg-orange-100'>
            {selected ? (
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='text-sm border-none shadow-none bg-transparent'
                onBlur={(e) => {
                  // Update node data here if needed
                }}
              />
            ) : (
              <div className='text-sm font-medium'>{name}</div>
            )}
          </div>

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
        </div>
      )
    }
    if (type === 'end') {
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

    if (type === 'merge') {
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

    // Default action node
    return (
      <div
        className={`relative p-4 rounded-md bg-orange-200 border-2 ${
          selected ? 'border-primary' : 'border-gray-300'
        } shadow-md`}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <NodeResizer
          color='#1971c2'
          isVisible={selected}
          minWidth={150}
          minHeight={60}
          handleStyle={{ width: 8, height: 8 }}
          lineStyle={{ stroke: '#1971c2', strokeWidth: 3 }}
          keepAspectRatio={false}
          // Disable horizontal resizing to keep width constant
          onResize={(_, newDimensions) => {
            setDimensions(newDimensions)
          }}
          onResizeEnd={(_, newDimensions) => {
            updateNodeDataBatch(id, {
              width: newDimensions.width,
              height: newDimensions.height,
            })
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

        <div className='flex items-center justify-center h-full'>
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

ActivityNode.displayName = 'ActivityNode'
