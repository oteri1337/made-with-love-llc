import React from "react";
import { Link } from "react-router-dom";
import { sendFormRequestThenDispatch } from "../../hooks";
import ContainerComponent from "components/container/TourContainerComponent";
import UncontrolledFormComponent from "components/UncontrolledFormComponent";

function AdminSigninPage() {
  const { request, callBack } = sendFormRequestThenDispatch();

  const nav = [
    {
      label: "Control Panel",
    },
  ];

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
  ];

  const callback = (body) => {
    callBack("/api/admins/auth/signin", "UPDATE_ADMIN", body);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="row app-my-1">
        <div className="col s12 m12 l4 offset-l4">
          <div className="card-panel">
            <center>
              <UncontrolledFormComponent
                formObjects={formArray}
                callback={callback}
                errors={request.errors}
                fetching={request.fetching}
                text="Sign In"
              />
              <br />
              <br />
              <Link to="/control/password.html">Reset Password</Link>
            </center>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default AdminSigninPage;
