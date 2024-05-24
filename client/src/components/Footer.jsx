import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="">
      <p className="">Copyright Placeholder</p>
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
