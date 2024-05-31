import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="w-full flex justify-center items-center border-t-2 border-black mt-4">
			<img
				src="/favicon.svg"
				alt="Puffer"
				className="w-10 h-10 mx-4 transform scale-y-[1] scale-x-[-1]"
			/>

			<div className="flex justify-center items-center w-full  gap-4 py-6 text-xs">
				<p className="">Copyright Puffer &copy;2024</p>
				<Link to="/" className="">
					Terms of use
				</Link>
				<Link to="/" className="">
					Privacy policy
				</Link>
			</div>
			<img src="/favicon.svg" alt="Puffer" className="w-10 h-10 mx-4" />
		</footer>
	);
};

export default Footer;
