const ErrorMessage = ({ message }) => {
	console.error("Error", message);
	return (
		<div className="w-full flex text-center p-6 justify-center text-red-600">
			Error: {message}
		</div>
	);
};

export default ErrorMessage;
