import React from "react";
import { sendRequestThenDispatch } from "../../hooks";
import FormComponent from "components/FormComponent";
import AdminPasswordTokenComponent from "./AdminPasswordTokenComponent";
import ContainerComponent from "components/tour/TourContainerComponent";

function AdminPasswordPage() {
	const { request, callBack } = sendRequestThenDispatch();

	const nav = [
		{
			label: "Update Password"
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
		<ContainerComponent bread={nav}>
			<div className="row app-py-0 ">
				<div className="col s12 m12 l6 offset-l3">
					<div className="card-panel">
						<FormComponent
							formArray={formArray}
							initialState={{ email }}
							fetching={request.fetching}
							errors={request.errors}
							message={request.message}
							onSubmit={onSubmit}
						/>
						<AdminPasswordTokenComponent />
					</div>
				</div>
			</div>
		</ContainerComponent>
	);
}

export default AdminPasswordPage;
