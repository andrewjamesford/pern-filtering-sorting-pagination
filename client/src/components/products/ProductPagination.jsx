const Pagination = ({ totalPages, currentPage, onPageChange }) => {
	const pages = new Array(totalPages).fill(null).map((_, index) => index + 1);
	return (
		<div className="flex justify-center my-4">
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					type="button" // Add the type prop
					className={`mx-1 px-3 py-2 bg-white rounded-lg focus:outline-none ${
						Number(page) === Number(currentPage) ? "border-2 border-black" : ""
					}`}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default Pagination;
