import { Link } from "react-router-dom";
import discordLogo from "../assets/img/discord-logo.jpg";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-transparent">
			<div className="container-fluid">
				<Link to="/">
					<img className="logo m-2" src={discordLogo} alt="discord-logo" />
				</Link>
			</div>
		</nav>
	);
};