import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/admin/AdminContainerComponent";

function AdminHomePage() {
	const nav = [
		{
			label: "Control Panel",
			link: "/control/index.html"
		},
		{
			label: "My Account"
		}
	];

	return (
		<AdminContainerComponent bread={nav}>
			<ul className="collection">
				<li className="collection-item">
					<Link to="/control/account/password.html">
						<span className="material-icons notranslate">account_circle</span>
						<b>Change Password</b>
					</Link>
				</li>
			</ul>
		</AdminContainerComponent>
	);
}

export default AdminHomePage;
