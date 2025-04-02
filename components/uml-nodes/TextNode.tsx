import { memo, useCallback, useState } from 'react'
import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from 'reactflow'
import { Textarea } from '../ui/textarea'
import { useNodeUpdate } from '@/hooks/use-node-update'
import { Input } from '../ui/input'

export const TextNode = memo(({ data, selected, id }: NodeProps) => {
  const [text, setText] = useState(data.text || 'Text')
  const { updateNodeData } = useNodeUpdate()
  const handleTextChange = (newText: string) => {
    setText(newText)
    updateNodeData(id, 'text', newText)
  }

  return (
    <div
      className={`${selected ? 'ring-2 ring-primary' : 'shadow-none'}`}
      style={{
        background: 'transparent',
      }}
    >
      {selected ? (
        <Input
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className='border-0 shadow-none bg-transparent resize-none min-w-[100px] focus:ring-0 focus:outline-none'
          style={{
            boxShadow: 'none',
            outline: 'none',
            border: 'none',
            background: 'transparent',
          }}
          placeholder='Enter text...'
        />
      ) : (
        <div className='text-sm'>{text}</div>
      )}
    </div>
  )
})
TextNode.displayName = 'TextNode'
