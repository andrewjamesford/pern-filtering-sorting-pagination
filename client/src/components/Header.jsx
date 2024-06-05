import { Link, NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="flex flex-col items-center">
			<Link to="/" className="block">
				<img
					src="./img/puffer-logo@0.5x.png"
					alt="Puffer Logo"
					className="aspect-ratio max-w-40 mt-4"
				/>
			</Link>

			<nav id="main-nav" className="py-4 w-50">
				<ul className="md:flex md:space-x-4 text-center uppercase">
					<li>
						<NavLink to="/" className="block">
							Puffers
						</NavLink>
					</li>
					<li>
						<NavLink to="/pants" className="block ">
							Pants
						</NavLink>
					</li>
					<li>
						<NavLink to="/tshirts" className="block">
							T-Shirts
						</NavLink>
					</li>
				</ul>
			</nav>

			<nav
				id="secondary-nav"
				className="fixed top-0 right-0 pt-4 pr-4 md:flex md:space-x-4"
			>
				<Link to="/" className="block w-6 h-6 mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						className="fill-current text-gray-500"
					>
						<title>Profile Icon</title>
						{/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
						<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
					</svg>
				</Link>
				<Link to="/" className="block w-6 h-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						className="fill-current text-gray-500"
					>
						<title>Shopping Bag Icon</title>
						{/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
						<path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
					</svg>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
