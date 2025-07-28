/**
 * Error message component for displaying user-friendly error messages
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @returns {JSX.Element} Error message component
 */
function ErrorMessage({ message }) {
	console.error("Error", message);
	return (
		<div className="w-full flex text-center p-6 justify-center text-red-600 bg-red-50 border border-red-200 rounded-md">
			<div>
				<div className="font-semibold">Error:</div>
				<div>{message}</div>
			</div>
		</div>
	);
}

export default ErrorMessage;
