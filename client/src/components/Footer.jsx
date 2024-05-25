import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="w-full flex justify-center items-center gap-4 py-6 text-xs">
			<p className="">Copyright Puffer &copy;2024</p>
			<Link to="/" className="">
				Terms of use
			</Link>
			<Link to="/" className="">
				Privacy policy
			</Link>
		</footer>
	);
};

export default Footer;
