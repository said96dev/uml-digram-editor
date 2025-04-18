'use client'

import { useCallback } from 'react'
import type { Node, Edge } from 'reactflow'
import { DiagramType } from '@/types/uml-types'

export function useUMLNodes() {
  const getNodesByDiagramType = useCallback((type: DiagramType): Node[] => {
    // Adjust the center coordinates to provide a better initial view
    // Center coordinates - assuming a typical viewport
    const centerX = 500
    const centerY = 300

    // Spacing between elements for better visibility
    const spacing = 150

    switch (type) {
      case DiagramType.UseCase:
        return [
          {
            id: 'actor1',
            type: 'actor',
            position: { x: centerX - spacing * 1.5, y: centerY },
            data: { name: 'User' },
          },
          {
            id: 'usecase1',
            type: 'useCase',
            position: { x: centerX, y: centerY - spacing * 0.8 },
            data: { name: 'Login' },
          },
          {
            id: 'usecase2',
            type: 'useCase',
            position: { x: centerX, y: centerY + spacing * 0.8 },
            data: { name: 'Register' },
          },
          {
            id: 'note1',
            type: 'note',
            position: { x: centerX + spacing * 1.5, y: centerY },
            data: { text: 'Users must log in before accessing the system.' },
          },
          {
            id: 'sticky1',
            type: 'sticky',
            position: { x: centerX - spacing, y: centerY + spacing * 1.5 },
            data: { text: 'Add your notes here...', color: 'bg-yellow-100' },
          },
        ]

      case DiagramType.Activity:
        return [
          {
            id: 'start1',
            type: 'activity',
            position: { x: centerX, y: centerY - spacing * 1.3 },
            data: { name: 'Start', type: 'start' },
          },
          {
            id: 'activity1',
            type: 'activity',
            position: { x: centerX, y: centerY - spacing * 0.3 },
            data: { name: 'Process Data', type: 'action' },
          },
          {
            id: 'decision1',
            type: 'activity',
            position: { x: centerX, y: centerY + spacing * 0.7 },
            data: { name: 'Valid?', type: 'decision' },
          },

          {
            id: 'activity2',
            type: 'activity',
            position: { x: centerX - spacing, y: centerY + spacing * 1.8 },
            data: { name: 'Task A', type: 'action' },
          },
          {
            id: 'end1',
            type: 'activity',
            position: { x: centerX, y: centerY + spacing * 2.8 },
            data: { name: 'End', type: 'end' },
          },
          {
            id: 'sticky3',
            type: 'sticky',
            position: { x: centerX + spacing * 2, y: centerY - spacing * 0.8 },
            data: { text: 'Activity diagram notes...', color: 'bg-green-100' },
          },
        ]

      case DiagramType.State:
        return [
          {
            id: 'initial1',
            type: 'state',
            position: { x: centerX, y: centerY - spacing * 1.3 },
            data: { name: 'Initial', type: 'initial' },
          },
          {
            id: 'state1',
            type: 'state',
            position: { x: centerX, y: centerY - spacing * 0.3 },
            data: { name: 'Ready' },
          },
          {
            id: 'state2',
            type: 'state',
            position: { x: centerX, y: centerY + spacing * 0.7 },
            data: { name: 'Processing' },
          },
          {
            id: 'state3',
            type: 'state',
            position: {
              x: centerX + spacing * 1.5,
              y: centerY - spacing * 0.3,
            },
            data: { name: 'Error' },
          },
          {
            id: 'final1',
            type: 'state',
            position: { x: centerX, y: centerY + spacing * 1.7 },
            data: { name: 'Final', type: 'final' },
          },
          {
            id: 'note3',
            type: 'note',
            position: { x: centerX + spacing * 2, y: centerY - spacing * 0.8 },
            data: { text: 'State diagram for data processing' },
          },
          {
            id: 'sticky4',
            type: 'sticky',
            position: {
              x: centerX - spacing * 1.5,
              y: centerY + spacing * 0.7,
            },
            data: { text: 'State diagram notes...', color: 'bg-purple-100' },
          },
        ]

      case DiagramType.InteractionOverview:
        return [
          {
            id: 'start1',
            type: 'activity',
            position: { x: centerX, y: centerY - spacing * 1.3 },
            data: { name: 'Start', type: 'start' },
          },
          {
            id: 'frame1',
            type: 'activity',
            position: {
              x: centerX - spacing * 0.5,
              y: centerY - spacing * 0.3,
            },
            data: { name: 'Login Sequence', type: 'frame' },
          },
          {
            id: 'frame2',
            type: 'activity',
            position: {
              x: centerX - spacing * 0.5,
              y: centerY + spacing * 0.7,
            },
            data: { name: 'Process Sequence', type: 'frame' },
          },
          {
            id: 'end1',
            type: 'activity',
            position: { x: centerX, y: centerY + spacing * 1.7 },
            data: { name: 'End', type: 'end' },
          },
          {
            id: 'note6',
            type: 'note',
            position: { x: centerX + spacing * 2, y: centerY + spacing * 0.7 },
            data: { text: 'Interaction overview for login process' },
          },
          {
            id: 'sticky7',
            type: 'sticky',
            position: { x: centerX + spacing * 2, y: centerY + spacing * 1.7 },
            data: {
              text: 'Interaction overview notes...',
              color: 'bg-pink-100',
            },
          },
        ]

      default:
        return []
    }
  }, [])

  const getInitialEdges = useCallback((type: DiagramType): Edge[] => {
    switch (type) {
      case DiagramType.UseCase:
        return [
          {
            id: 'e1-2',
            source: 'actor1',
            target: 'usecase1',
            type: 'association',
          },
          {
            id: 'e1-3',
            source: 'actor1',
            target: 'usecase2',
            type: 'association',
          },
        ]

      case DiagramType.Activity:
        return [
          {
            id: 'e1-2',
            source: 'start1',
            target: 'activity1',
            type: 'association',
          },
          {
            id: 'e2-3',
            source: 'activity1',
            target: 'decision1',
            type: 'association',
          },
          {
            id: 'e3-4',
            source: 'decision1',
            target: 'activity2',
            type: 'transition',
            data: { label: 'no' },
          },
          {
            id: 'e3-5',
            source: 'decision1',
            target: 'end1',
            type: 'transition',
            data: { label: 'yes' },
          },
        ]

      case DiagramType.State:
        return [
          {
            id: 'e1-2',
            source: 'initial1',
            target: 'state1',
            type: 'transition',
          },
          {
            id: 'e2-3',
            source: 'state1',
            target: 'state2',
            type: 'transition',
            data: { label: 'start' },
          },
          {
            id: 'e3-4',
            source: 'state2',
            target: 'state3',
            type: 'transition',
            data: { label: 'error' },
          },
          {
            id: 'e3-5',
            source: 'state2',
            target: 'final1',
            type: 'transition',
            data: { label: 'complete' },
          },
        ]

      case DiagramType.InteractionOverview:
        return [
          {
            id: 'e1-2',
            source: 'start1',
            target: 'frame1',
            type: 'transition',
          },
          {
            id: 'e2-3',
            source: 'frame1',
            target: 'frame2',
            type: 'transition',
          },
          {
            id: 'e3-4',
            source: 'frame2',
            target: 'end1',
            type: 'transition',
          },
        ]

      default:
        return []
    }
  }, [])

  return { getNodesByDiagramType, getInitialEdges }
}
