'use client'

import type React from 'react'

import { useCallback, useState } from 'react'
import { DiagramType } from '@/types/uml-types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Circle,
  Square,
  FileText,
  Box,
  Clock,
  Diamond,
  Download,
  Upload,
  Trash2,
  Save,
  StickyNote,
  Layers,
  ChevronLeft,
  ChevronRight,
  Type,
} from 'lucide-react'

interface UMLToolbarProps {
  diagramType: DiagramType
}

export function UMLToolbar({ diagramType }: UMLToolbarProps) {
  const [collapsed, setCollapsed] = useState(false)

  // Handle drag start for creating new nodes
  const onDragStart = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>,
      nodeType: string,
      data: any = {}
    ) => {
      event.dataTransfer.setData('application/reactflow/type', nodeType)
      event.dataTransfer.setData(
        'application/reactflow/data',
        JSON.stringify(data)
      )
      event.dataTransfer.effectAllowed = 'move'
    },
    []
  )

  // Render toolbar based on diagram type
  const renderToolbarContent = () => {
    switch (diagramType) {
      case DiagramType.UseCase:
        return (
          <div className='grid grid-cols-2 gap-2'>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-blue-50 hover:bg-blue-100 transition-colors'
              draggable
              onDragStart={(e) => onDragStart(e, 'actor', { name: 'Actor' })}
            >
              <User className='h-8 w-8 text-blue-600' />
              <span className='text-xs'>Actor</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-blue-50 hover:bg-blue-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'useCase', { name: 'Use Case' })
              }
            >
              <Circle className='h-8 w-8 text-blue-600' />
              <span className='text-xs'>Use Case</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-yellow-50 hover:bg-yellow-100 transition-colors'
              draggable
              onDragStart={(e) => onDragStart(e, 'note', { text: 'Note' })}
            >
              <FileText className='h-8 w-8 text-yellow-600' />
              <span className='text-xs'>Note</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-yellow-50 hover:bg-yellow-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'sticky', { text: 'Add your notes here...' })
              }
            >
              <StickyNote className='h-8 w-8 text-yellow-600' />
              <span className='text-xs'>Sticky Note</span>
            </div>
          </div>
        )

      case DiagramType.Activity:
        return (
          <div className='grid grid-cols-2 gap-2'>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', { name: 'Activity', type: 'action' })
              }
            >
              <Square className='h-8 w-8 rounded-md text-orange-600' />
              <span className='text-xs'>Action</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', {
                  name: 'Decision',
                  type: 'decision',
                })
              }
            >
              <Diamond className='h-8 w-8 text-orange-600' />
              <span className='text-xs'>Decision</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', {
                  name: 'Merge',
                  type: 'Mmrge',
                })
              }
            >
              <Diamond className='h-8 w-8 text-orange-600' />
              <span className='text-xs'>Merge</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'fork', {
                  orientation: 'horizontal',
                  name: 'Fork',
                  type: 'fork',
                })
              }
            >
              <div className='h-2 w-8 bg-black' />
              <span className='text-xs'>Fork</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'join', {
                  orientation: 'horizontal',
                  name: 'Join',
                  type: 'join',
                })
              }
            >
              <div className='h-2 w-8 bg-black' />
              <span className='text-xs'>Join</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', { name: 'Start', type: 'start' })
              }
            >
              <Circle className='h-8 w-8 fill-black' />
              <span className='text-xs'>Start</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', { name: 'End', type: 'end' })
              }
            >
              <Circle className='h-8 w-8 border-4' />
              <span className='text-xs'>End</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-yellow-50 hover:bg-yellow-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'sticky', { text: 'Add your notes here...' })
              }
            >
              <StickyNote className='h-8 w-8 text-yellow-600' />
              <span className='text-xs'>Sticky Note</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-gray-50 hover:bg-gray-100 transition-colors'
              draggable
              onDragStart={(e) => onDragStart(e, 'text', { text: 'Text' })}
            >
              <Type className='h-8 w-8 text-gray-600' />
              <span className='text-xs'>Text</span>
            </div>
          </div>
        )

      case DiagramType.State:
        return (
          <div className='grid grid-cols-2 gap-2'>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-purple-50 hover:bg-purple-100 transition-colors'
              draggable
              onDragStart={(e) => onDragStart(e, 'state', { name: 'State' })}
            >
              <Square className='h-8 w-8 rounded-xl text-purple-600' />
              <span className='text-xs'>State</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-purple-50 hover:bg-purple-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'state', { name: 'Initial', type: 'initial' })
              }
            >
              <Circle className='h-8 w-8 fill-black' />
              <span className='text-xs'>Initial</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-purple-50 hover:bg-purple-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'state', { name: 'Final', type: 'final' })
              }
            >
              <Circle className='h-8 w-8 border-4' />
              <span className='text-xs'>Final</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-purple-50 hover:bg-purple-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'state', {
                  name: 'Decision',
                  type: 'decision',
                })
              }
            >
              <Diamond className='h-8 w-8 text-orange-600' />
              <span className='text-xs'>Decision</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-yellow-50 hover:bg-yellow-100 transition-colors'
              draggable
              onDragStart={(e) => onDragStart(e, 'note', { text: 'Note' })}
            >
              <FileText className='h-8 w-8 text-yellow-600' />
              <span className='text-xs'>Note</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-yellow-50 hover:bg-yellow-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'sticky', { text: 'Add your notes here...' })
              }
            >
              <StickyNote className='h-8 w-8 text-yellow-600' />
              <span className='text-xs'>Sticky Note</span>
            </div>
          </div>
        )

      case DiagramType.InteractionOverview:
        return (
          <div className='grid grid-cols-2 gap-2'>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', { name: 'Frame', type: 'frame' })
              }
            >
              <Layers className='h-8 w-8 text-orange-600' />
              <span className='text-xs'>Frame</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', { name: 'Activity', type: 'action' })
              }
            >
              <Square className='h-8 w-8 rounded-md text-orange-600' />
              <span className='text-xs'>Activity</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', { name: 'Start', type: 'start' })
              }
            >
              <Circle className='h-8 w-8 fill-black' />
              <span className='text-xs'>Start</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-orange-50 hover:bg-orange-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'activity', { name: 'End', type: 'end' })
              }
            >
              <Circle className='h-8 w-8 border-4' />
              <span className='text-xs'>End</span>
            </div>
            <div
              className='flex flex-col items-center gap-1 p-3 border rounded-lg cursor-grab touch-manipulation bg-yellow-50 hover:bg-yellow-100 transition-colors'
              draggable
              onDragStart={(e) =>
                onDragStart(e, 'sticky', { text: 'Add your notes here...' })
              }
            >
              <StickyNote className='h-8 w-8 text-yellow-600' />
              <span className='text-xs'>Sticky Note</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (collapsed) {
    return (
      <div className='flex flex-col gap-2 items-center'>
        <Button
          variant='outline'
          size='icon'
          className='h-10 w-10 rounded-full shadow-md'
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className='h-5 w-5' />
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 w-[220px] relative'>
      <Button
        variant='outline'
        size='icon'
        className='h-8 w-8 absolute -right-4 top-0 rounded-full shadow-md bg-white'
        onClick={() => setCollapsed(true)}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      <Tabs defaultValue='elements' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 bg-primary/10'>
          <TabsTrigger
            value='elements'
            className='text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
          >
            Elements
          </TabsTrigger>
          <TabsTrigger
            value='actions'
            className='text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
          >
            Actions
          </TabsTrigger>
        </TabsList>
        <TabsContent value='elements' className='mt-2'>
          {renderToolbarContent()}
        </TabsContent>
        <TabsContent value='actions' className='mt-2'>
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant='outline'
              className='h-14 flex flex-col items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100'
            >
              <Save className='h-5 w-5' />
              <span className='text-xs'>Save</span>
            </Button>
            <Button
              variant='outline'
              className='h-14 flex flex-col items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100'
            >
              <Upload className='h-5 w-5' />
              <span className='text-xs'>Load</span>
            </Button>
            <Button
              variant='outline'
              className='h-14 flex flex-col items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100'
            >
              <Download className='h-5 w-5' />
              <span className='text-xs'>Export</span>
            </Button>
            <Button
              variant='outline'
              className='h-14 flex flex-col items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100'
            >
              <Trash2 className='h-5 w-5' />
              <span className='text-xs'>Clear</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className='text-xs text-muted-foreground p-2 bg-muted/50 rounded-lg'>
        <p className='mb-1 font-medium'>Touch Controls:</p>
        <ul className='list-disc pl-4 space-y-1'>
          <li>Drag elements from toolbar</li>
          <li>Pinch to zoom in/out</li>
          <li>Two fingers to pan</li>
          <li>Tap to select</li>
          <li>Use sticky notes for annotations</li>
        </ul>
      </div>
    </div>
  )
}
