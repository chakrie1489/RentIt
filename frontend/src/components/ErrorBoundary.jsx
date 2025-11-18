import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-8 text-center'>
          <h2 className='text-2xl font-semibold mb-2'>Something went wrong</h2>
          <pre className='text-sm text-red-600'>{String(this.state.error && this.state.error.message)}</pre>
          <p className='mt-4'>Open the browser console for more details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
