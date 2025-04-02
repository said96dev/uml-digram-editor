'use client'

import { useCallback } from 'react'
import { useReactFlow } from 'reactflow'

/**
 * Custom hook to update node data in the ReactFlow state
 * This centralizes the node update logic for all node types
 */
export function useNodeUpdate() {
  const { setNodes } = useReactFlow()

  /**
   * Updates a specific property in a node's data
   * @param nodeId The ID of the node to update
   * @param key The property key to update
   * @param value The new value for the property
   */
  const updateNodeData = useCallback(
    <T extends any>(nodeId: string, key: string, value: T) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                [key]: value,
              },
            }
          }
          return node
        })
      )
    },
    [setNodes]
  )

  /**
   * Updates multiple properties in a node's data at once
   * @param nodeId The ID of the node to update
   * @param updates Object containing key-value pairs to update
   */
  const updateNodeDataBatch = useCallback(
    (nodeId: string, updates: Record<string, any>) => {
      console.log(updates)
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...updates,
              },
            }
          }
          return node
        })
      )
    },
    [setNodes]
  )

  return { updateNodeData, updateNodeDataBatch }
}
