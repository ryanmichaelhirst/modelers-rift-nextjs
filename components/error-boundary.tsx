import dynamic from 'next/dynamic'
import { Component, ErrorInfo, PropsWithChildren, Suspense } from 'react'

const BugReport = dynamic(() => import('../featuresets/bug-report').then((m) => m.BugReport))

class ErrorBoundary extends Component<PropsWithChildren, { hasError: boolean }> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback={'Loading'}>
          <BugReport />
        </Suspense>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
