import React, { ReactNode, useState, FunctionComponent, useEffect } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallBack?: ReactNode
  onErrorHandler?: (error: Error, errorInfo?: React.ErrorInfo) => void
}

const ErrorBoundary: FunctionComponent<ErrorBoundaryProps> = ({
  children,
  onErrorHandler,
  fallBack
}) => {
  const [hasError, setHasError] = useState(false)

  const handleError = (error: Error, errorInfo?: React.ErrorInfo) => {
    if (onErrorHandler) onErrorHandler(error, errorInfo)

    setHasError(true)
  }

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      handleError(event.error || new Error('An unknown error occurred'))
    }

    window.addEventListener('error', handleGlobalError)

    return () => {
      window.removeEventListener('error', handleGlobalError)
    }
  }, [])

  if (hasError && fallBack) return fallBack
  else if (hasError && !fallBack)
    return <h1>{'Ocurrio un Error inesperado'}</h1>

  return children
}

export default ErrorBoundary
