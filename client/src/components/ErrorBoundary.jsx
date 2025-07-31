import React from "react";
import ErrorMessage from "./ErrorMessage";

/**
 * Error Boundary component to catch JavaScript errors in component tree
 * Provides fallback UI instead of crashing the entire application
 */
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	/**
	 * Static method called when an error is thrown
	 * @param {Error} error - The error that was thrown
	 * @returns {Object} New state object
	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error: error.message };
	}

	/**
	 * Called when an error is caught
	 * @param {Error} error - The error that was thrown
	 * @param {Object} errorInfo - Information about the error
	 */
	componentDidCatch(error, errorInfo) {
		// Log error details for debugging
		console.error('Error Boundary caught an error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Fallback UI
			return (
				<ErrorMessage 
					message={this.state.error || "Something went wrong. Please refresh the page."} 
				/>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;