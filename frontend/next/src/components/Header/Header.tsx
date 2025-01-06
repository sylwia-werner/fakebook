import { FaFacebook } from "react-icons/fa";
import $ from "./Header.module.scss";

export const Header = () => {
	return (
		<header className={$.header}>
			<FaFacebook />
		</header>
	);
};
