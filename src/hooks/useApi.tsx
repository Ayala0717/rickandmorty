import { useState, useEffect } from 'react'
import { AnyObject } from '@/types/common'

interface IndexModel<T> {
  indexResource: (params?: AnyObject) => Promise<T>
  params?: AnyObject
}

function useIndex<T>({ indexResource, params }: IndexModel<T>) {
  const [response, setResponse] = useState<T>()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await indexResource({ ...params })
        setResponse(data)
        setIsLoading(false)
        setHasError(false)
      } catch (error) {
        setHasError(true)
        throw new Error(String(error))
      }
    }

    fetchApi()
  }, [])

  return { response, isLoading, hasError }
}

export { useIndex }
