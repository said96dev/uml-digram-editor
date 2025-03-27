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
} from 'reactflow'
import 'reactflow/dist/style.css'
import { UMLDiagramSelector } from '@/components/uml-diagram-selector'
import { UMLToolbar } from '@/components/uml-toolbar'
import { useUMLNodes } from '@/hooks/use-uml-nodes'
import { DiagramType } from '@/types/uml-types'
import { Button } from '@/components/ui/button'
import { Trash2, Save } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

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

// Import edge components directly
import { AssociationEdge } from '@/components/uml-edges/association-edge'
import { GeneralizationEdge } from '@/components/uml-edges/generalization-edge'
import { DependencyEdge } from '@/components/uml-edges/dependency-edge'
import { MessageEdge } from '@/components/uml-edges/message-edge'
import { TransitionEdge } from '@/components/uml-edges/transition-edge'

// Define custom node types
const nodeTypes: NodeTypes = {
  actor: ActorNode,
  useCase: UseCaseNode,
  class: ClassNode,
  state: StateNode,
  activity: ActivityNode,
  lifeline: LifelineNode,
  note: NoteNode,
  object: ObjectNode,
  timeline: TimelineNode,
  sticky: StickyNote,
}

// Define custom edge types
const edgeTypes: EdgeTypes = {
  association: AssociationEdge,
  generalization: GeneralizationEdge,
  dependency: DependencyEdge,
  message: MessageEdge,
  transition: TransitionEdge,
}

export function DiagramEditor() {
  const [diagramType, setDiagramType] = useState<DiagramType>(
    DiagramType.UseCase
  )
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { project, fitView } = useReactFlow()
  const { getNodesByDiagramType, getInitialEdges } = useUMLNodes()
  const [isSelecting, setIsSelecting] = useState(false)

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

        toast({
          title: 'Diagram Loaded',
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
    toast({
      title: 'All Edges Deleted',
      description: 'All connections have been removed from the diagram.',
    })
  }, [setEdges])

  // Function to save diagram to localStorage
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
  }, [nodes, edges, diagramType])

  // Fix the onConnect function to properly handle connections based on diagram type
  const onConnect = useCallback(
    (params: Connection) => {
      // Determine edge type based on diagram type
      let edgeType = 'default'

      switch (diagramType) {
        case DiagramType.UseCase:
          edgeType = 'association'
          break
        case DiagramType.Sequence:
          edgeType = 'message'
          break
        case DiagramType.State:
          edgeType = 'transition'
          break
        case DiagramType.Communication:
          edgeType = 'message'
          break
        case DiagramType.Activity:
          edgeType = 'transition'
          break
        case DiagramType.InteractionOverview:
          edgeType = 'dependency'
          break
        case DiagramType.Timing:
          edgeType = 'generalization'
          break
        default:
          edgeType = 'association'
      }

      const newEdge = {
        ...params,
        type: edgeType,
        animated: diagramType === DiagramType.Sequence,
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

  return (
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
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }} // More zoomed out initially
      nodesDraggable={true}
      nodesConnectable={true}
      elementsSelectable={true}
      zoomOnScroll={false} // Better for touch
      zoomOnPinch={true} // Enable pinch to zoom
      panOnScroll={true} // Pan instead of zoom on scroll
      panOnDrag={true} // Enable panning with all mouse buttons and touch
      onPaneClick={handleClearSelection} // Clear selection when clicking on the pane
      connectionLineStyle={{ stroke: '#4B5563', strokeWidth: 2 }}
      connectionMode={ConnectionMode.Loose}
    >
      {/* SVG Definitions for markers */}
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            id='arrow'
            viewBox='0 0 10 10'
            refX='8'
            refY='5'
            markerWidth='6'
            markerHeight='6'
            orient='auto-start-reverse'
          >
            <path d='M 0 0 L 10 5 L 0 10 z' fill='currentColor' />
          </marker>
          <marker
            id='association-arrow'
            viewBox='0 0 10 10'
            refX='8'
            refY='5'
            markerWidth='6'
            markerHeight='6'
            orient='auto-start-reverse'
          >
            <path d='M 0 0 L 10 5 L 0 10 z' fill='#4B5563' />
          </marker>
          <marker
            id='generalization-arrow'
            viewBox='0 0 10 10'
            refX='8'
            refY='5'
            markerWidth='6'
            markerHeight='6'
            orient='auto-start-reverse'
          >
            <path
              d='M 0 0 L 10 5 L 0 10 z'
              fill='white'
              stroke='#4B5563'
              strokeWidth='1'
            />
          </marker>
          <marker
            id='message-arrow'
            viewBox='0 0 10 10'
            refX='8'
            refY='5'
            markerWidth='6'
            markerHeight='6'
            orient='auto-start-reverse'
          >
            <path
              d='M 0 0 L 10 5 L 0 10'
              fill='none'
              stroke='#4B5563'
              strokeWidth='1.5'
            />
          </marker>
          <marker
            id='transition-arrow'
            viewBox='0 0 10 10'
            refX='8'
            refY='5'
            markerWidth='6'
            markerHeight='6'
            orient='auto-start-reverse'
          >
            <path d='M 0 0 L 10 5 L 0 10 z' fill='#4B5563' />
          </marker>
        </defs>
      </svg>

      {/* Diagram Type Selector */}
      <Panel
        position='top-center'
        className='p-2 bg-background rounded-lg shadow-md mb-2'
      >
        <UMLDiagramSelector
          currentType={diagramType}
          onChange={handleDiagramTypeChange}
        />
      </Panel>

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
  )
}
