import React from 'react';
import '../../styles/errorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // The next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors and log them
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
   
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error details:', errorInfo);
    
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-icon">😵</div>
          <h2 className="error-title">
            Oops! Something went wrong
          </h2>
          <p className="error-message">
            We encountered an unexpected error. Don't worry, your data is safe!
          </p>
          
          {/* Show error details in development */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="error-details">
              <summary className="error-details-summary">
                Error Details (Development Only)
              </summary>
              <pre className="error-details-content">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}

          <div className="error-actions">
            <button 
              onClick={this.handleReset}
              className="error-btn error-btn-primary"
            >
              Try Again
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="error-btn error-btn-success"
            >
              Go Home
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="error-btn error-btn-secondary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;