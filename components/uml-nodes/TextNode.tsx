import { memo, useState } from 'react'
import { NodeProps } from 'reactflow'
import { Textarea } from '../ui/textarea'

export const TextNode = memo(({ data, selected }: NodeProps) => {
  const [text, setText] = useState(data.text || 'Text')

  return (
    <div
      className={`p-2 ${selected ? 'ring-2 ring-primary' : ''}`}
      style={{ background: 'transparent' }}
    >
      {selected ? (
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='border-none shadow-none bg-transparent resize-none min-w-[100px]'
          placeholder='Enter text...'
        />
      ) : (
        <div className='text-sm'>{text}</div>
      )}
    </div>
  )
})
TextNode.displayName = 'TextNode'
