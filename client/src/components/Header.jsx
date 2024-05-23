import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<>
			<header>
				<nav className="">
					<ul className="">
						<li className="">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? `link activeLink` : `link`
								}
							>
								Products
							</NavLink>
						</li>
						<li className="">
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									isActive ? `link activeLink` : `link`
								}
							>
								Dashboard
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<header className="">
				<h1 className="">Filtering, Sorting and Pagination</h1>
			</header>
		</>
	);
};

export default Header;
