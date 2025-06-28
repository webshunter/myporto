'use client'

import { useEffect, useState, useCallback } from 'react'
import { subscribeToChanges } from './sanity'

export function useSanityLive(query, initialData = null) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpdate = useCallback((update) => {
    console.log('Live update received:', update)
    
    // Handle different types of updates
    if (update.transition === 'update') {
      // Update existing item
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return prevData.map(item => 
            item._id === update.result._id ? update.result : item
          )
        } else if (prevData && prevData._id === update.result._id) {
          return update.result
        }
        return prevData
      })
    } else if (update.transition === 'create') {
      // Add new item
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return [update.result, ...prevData]
        }
        return prevData
      })
    } else if (update.transition === 'delete') {
      // Remove deleted item
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return prevData.filter(item => item._id !== update.documentId)
        }
        return null
      })
    }
  }, [])

  useEffect(() => {
    if (!query) return

    // Subscribe to real-time updates
    const subscription = subscribeToChanges(query, handleUpdate)

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [query, handleUpdate])

  return { data, setData, isLoading, setIsLoading, error, setError }
}

// Hook khusus untuk blog posts
export function useBlogLive() {
  const query = `*[_type == "blog"] | order(publishedAt desc)`
  return useSanityLive(query)
}

// Hook khusus untuk projects
export function useProjectsLive() {
  const query = `*[_type == "project"] | order(_createdAt desc)`
  return useSanityLive(query)
}

// Hook khusus untuk apps
export function useAppsLive() {
  const query = `*[_type == "app" && isActive == true] | order(publishedAt desc)`
  return useSanityLive(query)
} 