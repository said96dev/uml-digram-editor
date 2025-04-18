'use client'

import type React from 'react'

import { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  type Connection,
  type NodeTypes,
  type EdgeTypes,
  Panel,
  useReactFlow,
  ConnectionMode,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { UMLDiagramSelector } from '@/components/uml-diagram-selector'
import { UMLToolbar } from '@/components/uml-toolbar'
import { useUMLNodes } from '@/hooks/use-uml-nodes'
import { DiagramType } from '@/types/uml-types'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

// Import node components directly
import { ActorNode } from '@/components/uml-nodes/actor-node'
import { UseCaseNode } from '@/components/uml-nodes/use-case-node'
import { ClassNode } from '@/components/uml-nodes/class-node'
import { StateNode } from '@/components/uml-nodes/state-node'
import { ActivityNode } from '@/components/uml-nodes/activity-node'
import { LifelineNode } from '@/components/uml-nodes/lifeline-node'
import { NoteNode } from '@/components/uml-nodes/note-node'
import { ObjectNode } from '@/components/uml-nodes/object-node'
import { TimelineNode } from '@/components/uml-nodes/timeline-node'
import { StickyNote } from '@/components/uml-nodes/sticky-note'
import { ForkNode } from '@/components/uml-nodes/fork-node'
import { JoinNode } from '@/components/uml-nodes/join-node'

// Import edge components directly
import { AssociationEdge } from '@/components/uml-edges/association-edge'
import { GeneralizationEdge } from '@/components/uml-edges/generalization-edge'
import { DependencyEdge } from '@/components/uml-edges/dependency-edge'
import { MessageEdge } from '@/components/uml-edges/message-edge'
import { TransitionEdge } from '@/components/uml-edges/transition-edge'
import {
  Trash2,
  Save,
  Type,
  ArrowRight,
  ArrowUpRight,
  ScissorsLineDashedIcon as DashedLine,
} from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { withDeleteButton } from './uml-nodes/deleteButton'
import { TextNode } from './uml-nodes/TextNode'

let nodeTypes: NodeTypes = {
  actor: withDeleteButton(ActorNode),
  useCase: withDeleteButton(UseCaseNode),
  class: withDeleteButton(ClassNode),
  state: withDeleteButton(StateNode),
  activity: withDeleteButton(ActivityNode),
  lifeline: withDeleteButton(LifelineNode),
  note: withDeleteButton(NoteNode),
  object: withDeleteButton(ObjectNode),
  timeline: withDeleteButton(TimelineNode),
  sticky: withDeleteButton(StickyNote),
  fork: withDeleteButton(ForkNode),
  join: withDeleteButton(JoinNode),
}

// Define custom edge types
const edgeTypes: EdgeTypes = {
  association: AssociationEdge,
  generalization: GeneralizationEdge,
  dependency: DependencyEdge,
  message: MessageEdge,
  transition: TransitionEdge,
}

nodeTypes = {
  actor: withDeleteButton(ActorNode),
  useCase: withDeleteButton(UseCaseNode),
  class: withDeleteButton(ClassNode),
  state: withDeleteButton(StateNode),
  activity: withDeleteButton(ActivityNode),
  lifeline: withDeleteButton(LifelineNode),
  note: withDeleteButton(NoteNode),
  object: withDeleteButton(ObjectNode),
  timeline: withDeleteButton(TimelineNode),
  sticky: withDeleteButton(StickyNote),
  text: withDeleteButton(TextNode),
  fork: withDeleteButton(ForkNode),
  join: withDeleteButton(JoinNode),
}
export function DiagramEditor() {
  const [diagramType, setDiagramType] = useState<DiagramType>(
    DiagramType.UseCase
  )
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { project, fitView, getNodes, getEdges } = useReactFlow()
  const { getNodesByDiagramType, getInitialEdges } = useUMLNodes()
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)

  // Function to export diagram as image
  const handleExportAsImage = useCallback(() => {
    if (!reactFlowWrapper.current) return

    // Import html2canvas dynamically
    import('html2canvas')
      .then((html2canvas) => {
        const reactFlowContainer = document.querySelector('.react-flow')
        if (!reactFlowContainer) {
          toast.error('Export Failed', {
            description: 'Could not find the diagram to export.',
          })
          return
        }

        toast.success('Exporting Diagram', {
          description: 'Preparing your diagram for export...',
        })

        // Hide controls and panels temporarily for clean export
        const controls = document.querySelector('.react-flow__controls')
        const panels = document.querySelectorAll('.react-flow__panel')
        const minimap = document.querySelector('.react-flow__minimap')

        // Store original display values
        // const controlsDisplay = view?.style.display
        const panelsDisplay = Array.from(panels).map(
          (panel) => (panel as HTMLElement).style.display
        )
        //        const minimapDisplay = minimap?.style.display

        // Hide elements for screenshot
        // if (controls) controls.style.display = 'none'
        panels.forEach(
          (panel) => ((panel as HTMLElement).style.display = 'none')
        )
        // if (minimap) minimap.style.display = 'none'

        // Take screenshot
        html2canvas
          .default(reactFlowContainer as HTMLElement, {
            backgroundColor: '#f9fafb', // Light gray background
            scale: 2, // Higher resolution
          })
          .then((canvas) => {
            // Restore display of controls and panels
            //  if (controls) controls.style.display = controlsDisplay || ''
            panels.forEach(
              (panel, i) =>
                ((panel as HTMLElement).style.display = panelsDisplay[i] || '')
            )
            // if (minimap) minimap.style.display = minimapDisplay || ''

            // Convert to image and download
            const image = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = image
            link.download = `uml-diagram-${new Date()
              .toISOString()
              .slice(0, 10)}.png`
            link.click()

            toast.success('Export Successful', {
              description: 'Your diagram has been exported as an image.',
            })
          })
          .catch((error) => {
            console.error('Error exporting diagram as image:', error)
            toast.error('Export Failed', {
              description:
                'There was an error exporting your diagram as an image.',
            })

            // Restore display of controls and panels even if there's an error
            //  if (controls) controls.style.display = controlsDisplay || ''
            panels.forEach(
              (panel, i) =>
                ((panel as HTMLElement).style.display = panelsDisplay[i] || '')
            )
            //    if (minimap) minimap.style.display = minimapDisplay || ''
          })
      })
      .catch((error) => {
        console.error('Error loading html2canvas:', error)
        toast('Export Failed', {
          description: 'Could not load the image export library.',
        })
      })
  }, [])

  // Add this right after the variable declarations at the top of the component

  // Function to save diagram to localStorage
  const handleSaveDiagram = useCallback(() => {
    try {
      const diagramData = {
        savedNodes: nodes,
        savedEdges: edges,
        savedDiagramType: diagramType,
      }
      localStorage.setItem('umlDiagram', JSON.stringify(diagramData))
      toast.success('Diagram Saved', {
        description: 'Your diagram has been saved to local storage.',
      })
    } catch (error) {
      console.error('Error saving diagram to localStorage:', error)
      toast.error('Save Failed', {
        description: 'There was an error saving your diagram.',
      })
    }
  }, [nodes, edges, diagramType])

  // Function to export diagram as JSON
  const handleExportDiagram = useCallback(() => {
    try {
      const diagramData = {
        nodes: getNodes(),
        edges: getEdges(),
        diagramType,
      }

      const dataStr = JSON.stringify(diagramData, null, 2)
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
        dataStr
      )}`

      const exportFileDefaultName = `uml-diagram-${new Date()
        .toISOString()
        .slice(0, 10)}.json`

      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()

      toast.success('Diagram Exported', {
        description: 'Your diagram has been exported as a JSON file.',
      })
    } catch (error) {
      console.error('Error exporting diagram:', error)
      toast.error('Export Failed', {
        description: 'There was an error exporting your diagram.',
      })
    }
  }, [getNodes, getEdges, diagramType])

  // Function to import diagram from JSON
  const handleImportDiagram = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (!target.files?.length) return

      const file = target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const result = event.target?.result
          if (typeof result !== 'string') return

          const importedData = JSON.parse(result)

          if (
            importedData.nodes &&
            importedData.edges &&
            importedData.diagramType
          ) {
            // Check if there's an existing diagram
            if (nodes.length > 0 || edges.length > 0) {
              // Create a confirmation dialog
              if (
                window.confirm(
                  'Do you want to replace your current diagram with the imported one? This action cannot be undone.'
                )
              ) {
                // Replace the current diagram
                setNodes(importedData.nodes)
                setEdges(importedData.edges)
                setDiagramType(importedData.diagramType)

                // Save to localStorage automatically
                setTimeout(() => {
                  const diagramData = {
                    savedNodes: importedData.nodes,
                    savedEdges: importedData.edges,
                    savedDiagramType: importedData.diagramType,
                  }
                  localStorage.setItem(
                    'umlDiagram',
                    JSON.stringify(diagramData)
                  )

                  // Set a timeout to fit view
                  fitView({ padding: 0.5, duration: 800 })

                  toast.success('Diagram Imported', {
                    description:
                      'Your diagram has been imported and saved to local storage.',
                  })
                }, 100)
              }
            } else {
              // No existing diagram, just import
              setNodes(importedData.nodes)
              setEdges(importedData.edges)
              setDiagramType(importedData.diagramType)

              // Save to localStorage automatically
              setTimeout(() => {
                const diagramData = {
                  savedNodes: importedData.nodes,
                  savedEdges: importedData.edges,
                  savedDiagramType: importedData.diagramType,
                }
                localStorage.setItem('umlDiagram', JSON.stringify(diagramData))

                // Set a timeout to fit view
                fitView({ padding: 0.5, duration: 800 })

                toast.success('Diagram Imported', {
                  description:
                    'Your diagram has been imported and saved to local storage.',
                })
              }, 100)
            }
          } else {
            throw new Error('Invalid diagram format')
          }
        } catch (error) {
          console.error('Error importing diagram:', error)
          toast.error('Import Failed', {
            description: 'The selected file is not a valid UML diagram.',
          })
        }
      }

      reader.readAsText(file)
    }

    input.click()
  }, [nodes, edges, setNodes, setEdges, setDiagramType, fitView])

  // Function to clear all nodes and edges
  const handleClearAll = useCallback(() => {
    setNodes([])
    setEdges([])
    toast.success('Diagram Cleared', {
      description: 'All elements have been removed from the diagram.',
    })
  }, [setNodes, setEdges])

  // Listen for toolbar actions
  useEffect(() => {
    const handleToolbarAction = (event: CustomEvent) => {
      const { action } = event.detail

      switch (action) {
        case 'save':
          handleSaveDiagram()
          break
        case 'export':
          handleExportDiagram()
          break
        case 'exportImage':
          handleExportAsImage()
          break
        case 'import':
          handleImportDiagram()
          break
        case 'clear':
          handleClearAll()
          break
        default:
          break
      }
    }

    // Add event listener
    document.addEventListener(
      'uml-toolbar-action',
      handleToolbarAction as EventListener
    )

    // Clean up
    return () => {
      document.removeEventListener(
        'uml-toolbar-action',
        handleToolbarAction as EventListener
      )
    }
  }, [
    handleSaveDiagram,
    handleExportDiagram,
    handleExportAsImage,
    handleImportDiagram,
    handleClearAll,
  ])
  // Add this right after the variable declarations at the top of the component
  useEffect(() => {
    // This prevents the ResizeObserver loop limit exceeded error
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ResizeObserver loop')) {
        // Prevent the error from showing in the console
        event.stopImmediatePropagation()
      }
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  // Initialize with default nodes or load from localStorage when component mounts
  useEffect(() => {
    // Try to load from localStorage first
    try {
      const savedDiagram = localStorage.getItem('umlDiagram')
      if (savedDiagram) {
        const { savedNodes, savedEdges, savedDiagramType } =
          JSON.parse(savedDiagram)
        setNodes(savedNodes)
        setEdges(savedEdges)
        setDiagramType(savedDiagramType)

        // Set a timeout to fit view
        setTimeout(() => {
          fitView({ padding: 0.5, duration: 800 })
        }, 100)

        toast.success('Diagram Loaded', {
          description: 'Your saved diagram has been loaded successfully.',
        })
        return
      }
    } catch (error) {
      console.error('Error loading diagram from localStorage:', error)
    }

    // If no saved diagram, load default
    const initialNodes = getNodesByDiagramType(DiagramType.UseCase)
    const initialEdges = getInitialEdges(DiagramType.UseCase)
    setNodes(initialNodes)
    setEdges(initialEdges)

    // Set a timeout to fit view with more zoom out
    setTimeout(() => {
      fitView({ padding: 0.5, duration: 800 })
    }, 100)
  }, [getNodesByDiagramType, getInitialEdges, setNodes, setEdges, fitView])

  useEffect(() => {
    const selectedEdge = edges.find((edge) => edge.selected)
    setSelectedEdgeId(selectedEdge ? selectedEdge.id : null)
  }, [edges])
  // Handle diagram type change
  const handleDiagramTypeChange = useCallback(
    (type: DiagramType) => {
      setDiagramType(type)
      // Load initial nodes and edges for the selected diagram type
      const initialNodes = getNodesByDiagramType(type)
      const initialEdges = getInitialEdges(type)
      setNodes(initialNodes)
      setEdges(initialEdges)

      // Set a timeout to fit view with more zoom out
      setTimeout(() => {
        fitView({ padding: 0.5, duration: 800 })
      }, 100)
    },
    [getNodesByDiagramType, getInitialEdges, setNodes, setEdges, fitView]
  )

  // Function to select all nodes
  const handleSelectAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: true,
      }))
    )
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        selected: true,
      }))
    )
    setIsSelecting(true)
  }, [setNodes, setEdges])

  // Function to clear selection
  const handleClearSelection = useCallback(() => {
    if (isSelecting) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          selected: false,
        }))
      )
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          selected: false,
        }))
      )
      setIsSelecting(false)
    }
  }, [isSelecting, setNodes, setEdges])

  // Ändern Sie die handleDeleteSelectedEdges-Funktion in handleDeleteAllEdges
  // Ersetzen Sie die Implementierung der Funktion
  const handleDeleteAllEdges = useCallback(() => {
    setEdges([])
    toast.success('All Edges Deleted', {
      description: 'All connections have been removed from the diagram.',
    })
  }, [setEdges])

  /*   // Function to save diagram to localStorage
  const handleSaveDiagram = useCallback(() => {
    try {
      const diagramData = {
        savedNodes: nodes,
        savedEdges: edges,
        savedDiagramType: diagramType,
      }
      localStorage.setItem('umlDiagram', JSON.stringify(diagramData))
      toast({
        title: 'Diagram Saved',
        description: 'Your diagram has been saved to local storage.',
      })
    } catch (error) {
      console.error('Error saving diagram to localStorage:', error)
      toast({
        title: 'Save Failed',
        description: 'There was an error saving your diagram.',
        variant: 'destructive',
      })
    }
  }, [nodes, edges, diagramType]) */

  // Fix the onConnect function to properly handle connections based on diagram type
  const onConnect = useCallback(
    (params: Connection) => {
      // Determine edge type based on diagram type
      let edgeType = 'default'

      switch (diagramType) {
        case DiagramType.UseCase:
          edgeType = 'association'
          break

        case DiagramType.State:
          edgeType = 'transition'
          break

        case DiagramType.Activity:
          edgeType = 'transition'
          break
        case DiagramType.InteractionOverview:
          edgeType = 'dependency'
          break

        default:
          edgeType = 'association'
      }

      const newEdge = {
        ...params,
        type: edgeType,
        //animated: diagramType === DiagramType.UseCase,
        data: { label: '' },
      }

      setEdges((eds) => addEdge(newEdge, eds))
    },
    [diagramType, setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // Fix the onDrop function to properly handle dragged elements
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!reactFlowBounds) {
        return
      }

      const nodeType = event.dataTransfer.getData('application/reactflow/type')
      const nodeDataString = event.dataTransfer.getData(
        'application/reactflow/data'
      )

      // Check if the dropped element is a node
      if (!nodeType) {
        return
      }

      let nodeData = {}
      try {
        if (nodeDataString) {
          nodeData = JSON.parse(nodeDataString)
        }
      } catch (error) {
        console.error('Error parsing node data:', error)
      }

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: `node-${Date.now()}`,
        type: nodeType,
        position,
        data: nodeData,
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [project, setNodes]
  )

  // Function to change edge type
  const handleChangeEdgeType = useCallback(
    (edgeId: string, newType: string, label?: string) => {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === edgeId) {
            return {
              ...edge,
              type: newType,
              data: {
                ...edge.data,
                label: label,
              },
              style: newType.includes('dashed')
                ? { strokeDasharray: '5,5' }
                : {},
              animated: newType === 'message',
              markerEnd:
                newType === 'generalization'
                  ? 'url(#generalization-arrow)'
                  : newType === 'association'
                  ? 'url(#association-arrow)'
                  : newType === 'dependency'
                  ? 'url(#arrow)'
                  : newType === 'transition'
                  ? MarkerType.Arrow
                  : 'url(#arrow)',
            }
          }
          return edge
        })
      )

      toast.info('Edge Type Changed', {
        description: `Connection type changed to ${newType}`,
      })
    },
    [setEdges]
  )

  // Function to add text node
  const handleAddTextNode = useCallback(
    (event: React.MouseEvent) => {
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!reactFlowBounds) return
      const position = project({
        x: event.clientX,
        y: event.clientY - reactFlowBounds.height / 2,
      })

      const newNode = {
        id: `text-${Date.now()}`,
        type: 'text',
        position,
        data: { text: 'Text' },
      }

      setNodes((nds) => nds.concat(newNode))

      toast.success('Text Added', {
        description: 'Text node added to diagram. Click to edit.',
      })
    },
    [project, setNodes]
  )

  return (
    <div ref={reactFlowWrapper} className='w-full h-full touch-manipulation'>
      <ContextMenu>
        <ContextMenuTrigger className='w-full h-full'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            snapToGrid={true}
            snapGrid={[20, 20]}
            fitView
            attributionPosition='bottom-right'
            onDragOver={onDragOver}
            onDrop={onDrop}
            className='bg-gray-50 touch-manipulation'
            minZoom={0.2}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            zoomOnScroll={false}
            zoomOnPinch={true}
            panOnScroll={true}
            panOnDrag={true}
            onPaneClick={handleClearSelection}
            connectionLineStyle={{ stroke: '#ff00f21a', strokeWidth: 4 }}
            connectionMode={ConnectionMode.Loose}
            selectionOnDrag={true}
            multiSelectionKeyCode='Shift'
            selectionKeyCode='Control'
            deleteKeyCode={['Backspace', 'Delete']}
          >
            {/* SVG Definitions for markers */}
            <svg style={{ position: 'absolute', top: 0, left: 0 }}>
              <defs>
                <marker
                  id='arrow'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='5'
                  markerWidth='2'
                  markerHeight='2'
                  orient='auto-start-reverse'
                >
                  <path
                    d='M 0 0 L 10 5 L 0 10 z'
                    fill='none'
                    stroke='#4b4b4b'
                  />
                </marker>
                <marker
                  id='association-arrow'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='5'
                  markerWidth='8'
                  markerHeight='8'
                  orient='auto-start-reverse'
                >
                  <path d='M 0 0 L 10 5 L 0 10 z' fill='#4b4b4b' />
                </marker>
                <marker
                  id='generalization-arrow'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='5'
                  markerWidth='8'
                  markerHeight='8'
                  orient='auto-start-reverse'
                >
                  <path
                    d='M 0 0 L 10 5 L 0 10 z'
                    fill='white'
                    stroke='#4B5563'
                    strokeWidth='3'
                  />
                </marker>
                <marker
                  id='message-arrow'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='5'
                  markerWidth='2'
                  markerHeight='2'
                  orient='auto-start-reverse'
                >
                  <path
                    d='M 0 0 L 10 5 L 0 10'
                    fill='none'
                    stroke='#4b4b4b'
                    strokeWidth='3'
                  />
                </marker>
                <marker
                  id='transition-arrow'
                  viewBox='0 0 10 10'
                  refX='8'
                  refY='5'
                  markerWidth='2'
                  markerHeight='2'
                  orient='auto-start-reverse'
                >
                  <path d='M 0 0 L 10 5 L 0 10 z' fill='#4b4b4b' />
                </marker>
              </defs>
            </svg>
            {/* Diagram Type Selector */}
            <Panel position='top-center' className='p-2  rounded-lg '>
              <div className='flex flex-col gap-4 items-center justify-center'>
                {' '}
                <div className='bg-background'>
                  <UMLDiagramSelector
                    currentType={diagramType}
                    onChange={handleDiagramTypeChange}
                  />
                </div>
                {selectedEdgeId && (
                  <div className='flex gap-2 items-center bg-[#006aff1a] p-4 shadow-md mb-2 border border-primary/20 '>
                    <span className='text-xs font-medium mr-2'>
                      Connection Type:
                    </span>
                    <Button
                      size='sm'
                      variant='outline'
                      className='h-8 px-2 text-xs'
                      onClick={() =>
                        handleChangeEdgeType(selectedEdgeId, 'association')
                      }
                    >
                      <ArrowRight className='h-4 w-4 mr-1' />
                      Association
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='h-8 px-2 text-xs'
                      onClick={() =>
                        handleChangeEdgeType(selectedEdgeId, 'generalization')
                      }
                    >
                      <ArrowUpRight className='h-4 w-4 mr-1' />
                      Generalization
                    </Button>

                    <Button
                      size='sm'
                      variant='outline'
                      className='h-8 px-2 text-xs'
                      onClick={() =>
                        handleChangeEdgeType(
                          selectedEdgeId,
                          'dependency',
                          '<<include>>'
                        )
                      }
                    >
                      <DashedLine className='h-4 w-4 mr-1' />
                      Include
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='h-8 px-2 text-xs'
                      onClick={() =>
                        handleChangeEdgeType(
                          selectedEdgeId,
                          'dependency',
                          '<<extend>>'
                        )
                      }
                    >
                      <DashedLine className='h-4 w-4 mr-1' />
                      Extend
                    </Button>
                  </div>
                )}
              </div>
            </Panel>
            {/* Edge Type Selector - Fixed position under diagram selector */}

            {/* UML Toolbar */}
            <Panel
              position='top-left'
              className='p-2 bg-background rounded-lg shadow-md'
            >
              <UMLToolbar diagramType={diagramType} />
            </Panel>

            {/* Action Buttons */}
            <Panel
              position='top-right'
              className='p-2 bg-background rounded-lg shadow-md flex gap-2'
            >
              <Button
                variant='outline'
                className='h-10 bg-primary/10 hover:bg-primary/20'
                onClick={handleSelectAll}
              >
                Select All
              </Button>
              {/* Ändern Sie den Button-Text und die onClick-Funktion */}
              <Button
                variant='outline'
                className='h-10 bg-destructive/10 hover:bg-destructive/20 text-destructive'
                onClick={handleDeleteAllEdges}
              >
                <Trash2 className='h-5 w-5 mr-1' />
                Delete All Edges
              </Button>
              <Button
                variant='outline'
                className='h-10 bg-green-100 hover:bg-green-200 text-green-700'
                onClick={handleSaveDiagram}
              >
                <Save className='h-5 w-5 mr-1' />
                Save
              </Button>
            </Panel>
            {/* Text Tool */}
            <Panel
              position='bottom-center'
              className='p-2 bg-background rounded-lg shadow-md mb-2'
            >
              <Button
                variant='outline'
                className='h-10 bg-primary/10 hover:bg-primary/20 flex items-center gap-2'
                onClick={handleAddTextNode}
              >
                <Type className='h-5 w-5' />
                Add Text
              </Button>
            </Panel>

            {/* Selection Instructions */}
            <Panel position='bottom-left' className='bg-transparent'>
              <div className='text-xs text-muted-foreground ml-16 p-4 bg-background/80 shadow-md mb-2 backdrop-blur-sm rounded-lg'>
                <p className='font-medium mb-1'>Controls:</p>
                <ul className='list-disc pl-4 space-y-1'>
                  <li>Drag on empty area to create selection box</li>
                  <li>Hold Shift to select multiple nodes</li>
                  <li>Click on connection to change its type</li>
                  <li>Use "Add Text" to place text anywhere</li>
                </ul>
              </div>
            </Panel>

            <Controls showInteractive={false} className='touch-manipulation'>
              {/* Custom larger touch controls could be added here */}
            </Controls>

            <MiniMap
              nodeStrokeWidth={3}
              zoomable
              pannable
              className='bg-white touch-manipulation'
            />

            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color='#113d96'
            />
          </ReactFlow>
        </ContextMenuTrigger>

        <ContextMenuContent className='w-64'>
          <ContextMenuItem
            onClick={handleAddTextNode}
            className='flex items-center gap-2'
          >
            <Type className='h-4 w-4' />
            Add Text
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
