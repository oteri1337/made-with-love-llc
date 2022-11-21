import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "providers/AppProvider";

function AdminRoute(props) {
	const { state } = React.useContext(AppContext);

	if (!state.admin) {
		return <Redirect to="/control/signin.html" />;
	}

	// if (state.admin.email_verified == 0) {
	//   return <Redirect to="/control/verify/email.html" />;
	// }

	return <Route {...props} />;
}

export default AdminRoute;
