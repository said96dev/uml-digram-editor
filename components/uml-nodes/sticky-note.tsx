'use client'

import { memo, useState } from 'react'
import { type NodeProps, NodeResizer, Position, Handle } from 'reactflow'
import { Textarea } from '@/components/ui/textarea'
import { GripVertical } from 'lucide-react'
import { useNodeUpdate } from '@/hooks/use-node-update'

interface StickyNoteData {
  text: string
  color?: string
  width?: number
  height?: number
}

export const StickyNote = memo(
  ({ data, selected, id }: NodeProps<StickyNoteData>) => {
    const [text, setText] = useState(data.text || 'Add your notes here...')
    const colors = [
      'bg-yellow-100',
      'bg-blue-100',
      'bg-green-100',
      'bg-purple-100',
      'bg-pink-100',
      'bg-orange-100',
    ]
    const [colorIndex, setColorIndex] = useState(
      data.color ? colors.indexOf(data.color) : 0
    )
    const [dimensions, setDimensions] = useState({
      width: data?.width || 150,
      height: data?.height || 100,
    })
    const { updateNodeData, updateNodeDataBatch } = useNodeUpdate()
    const handleTextChange = (newText: string) => {
      setText(newText)
      updateNodeData(id, 'text', newText)
    }
    const handleColorChange = () => {
      setColorIndex((colorIndex + 1) % colors.length)
    }

    return (
      <div
        className={`relative  p-2 shadow-md ${
          colors[colorIndex]
        } border-2 text-xs ${
          selected ? 'border-primary' : 'border-transparent '
        }`}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          transform: 'rotate(-1deg)',
        }}
      >
        <NodeResizer
          color='#1971c2'
          isVisible={selected}
          minWidth={100}
          minHeight={50}
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

        {/* Handles on all sides to connect from anywhere */}
        <Handle
          type='source'
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

        {selected && (
          <div className='absolute -bottom-8  flex gap-1 m-auto'>
            {colors.map((color, index) => (
              <div
                key={color}
                onClick={() => {
                  setColorIndex(index)
                  updateNodeData(id, 'color', color)
                }}
                className={`w-4 h-4 rounded-full cursor-pointer border ${
                  index === colorIndex ? 'border-black' : 'border-transparent'
                } ${color}`}
              />
            ))}
          </div>
        )}

        <div className='h-full  p-0 w-full m-0'>
          <Textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            className='!max-w-[1000px] !min-h-[40px] border-none shadow-none bg-transparent resize-none h-full !text-xs p-0 m-0 '
            placeholder='Add your notes here...'
          />
        </div>
      </div>
    )
  }
)

StickyNote.displayName = 'StickyNote'
