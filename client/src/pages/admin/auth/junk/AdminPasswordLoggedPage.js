import React from "react";
import { sendRequestThenDispatch } from "../../hooks";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/admin/AdminContainerComponent";
import AdminLoggedPasswordComponent from "./AdminPasswordTokenComponent";

function AdminPasswordLoggedPage() {
	const { state, request, callBack } = sendRequestThenDispatch();
	const { email } = state.admin;

	const nav = [
		{
			label: "Control Panel",
			link: "/control/index.html"
		},
		{
			label: "My Account",
			link: "/control/account/index.html"
		},
		{
			label: "Change Password"
		}
	];

	const formArray = [
		{
			id: "password_token"
		},
		{
			id: "new_password",
			type: "password"
		},
		{
			id: "confirm_new_password",
			type: "password"
		}
	];

	const onSuccess = () => {};

	const onSubmit = body => {
		callBack(
			"/api/admins/auth/password/update",
			"UPDATE_ADMIN",
			body,
			onSuccess,
			"PATCH"
		);
	};

	return (
		<AdminContainerComponent bread={nav}>
			<div className="card-panel">
				<FormComponent
					formArray={formArray}
					initialState={{ email }}
					fetching={request.fetching}
					errors={request.errors}
					message={request.message}
					onSubmit={onSubmit}
				/>
				<AdminLoggedPasswordComponent email={email} />
			</div>
		</AdminContainerComponent>
	);
}

export default AdminPasswordLoggedPage;
