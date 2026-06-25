import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-center p-6">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-500 mb-8">
              We're sorry, but an unexpected error occurred. Please try refreshing the page or navigating back home.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-green-950 text-white font-medium py-3 px-6 rounded-lg w-full hover:bg-green-900 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
