'use client'

import { memo, useState } from 'react'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'
import { User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useNodeUpdate } from '@/hooks/use-node-update'

interface ActorNodeData {
  name: string
  width?: number
  height?: number
}

export const ActorNode = memo(
  ({ data, selected, id }: NodeProps<ActorNodeData>) => {
    const [name, setName] = useState(data.name || 'Actor')
    const [dimensions, setDimensions] = useState({
      width: data?.width || 100,
      height: data?.height || 120,
    })
    const { updateNodeData, updateNodeDataBatch } = useNodeUpdate()
    const handleTextChange = (newText: string) => {
      setName(newText)
      updateNodeData(id, 'name', newText)
    }
    console.log(data.name)
    return (
      <div
        className={` p-4 rounded-lg  shadow-md relative bg-blue-50 border-2 ${
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
          minHeight={120}
          handleStyle={{ width: 8, height: 8 }}
          lineStyle={{ stroke: '#1971c2', strokeWidth: 1 }}
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

        <Handle
          type='source'
          position={Position.Bottom}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='bottom'
        />
        <Handle
          type='target'
          position={Position.Top}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='top'
        />
        <Handle
          type='source'
          position={Position.Right}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='right'
        />
        <Handle
          type='target'
          position={Position.Left}
          className='w-3 h-3 bg-white border-2 border-gray-400'
          id='left'
        />

        <div className='flex flex-col items-center justify-center h-full gap-2'>
          <div className='p-2 rounded-full bg-white shadow-sm'>
            <User className='h-8 w-8 text-blue-600' />
          </div>

          {selected ? (
            <Input
              value={name}
              onChange={(e) => handleTextChange(e.target.value)}
              className='text-center border-none shadow-none bg-transparent text-sm w-full'
              onBlur={(e) => {
                // Update node data here if needed
              }}
            />
          ) : (
            <div className='text-center font-medium text-sm mt-2'>{name}</div>
          )}
        </div>
      </div>
    )
  }
)

ActorNode.displayName = 'ActorNode'
