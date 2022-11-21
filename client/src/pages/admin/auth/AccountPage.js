import React from "react";
import { Link } from "react-router-dom";
import UserContainerComponent from "components/container/AdminContainerComponent";

function AccountPage() {
  return (
    <UserContainerComponent bread={[{ label: "Account" }]}>
      <div className="row ">
        <div className="col l6 offset-l3 s12">
          <ul className="collection">
            <li className="collection-item">
              <span className="material-icons notranslate">account_circle</span>
              <Link to="/control/auth/profile.html">View Profile</Link>
            </li>
            <li className="collection-item">
              <span className="material-icons notranslate">linear_scale</span>
              <Link to="/control/auth/password.html">Update Password</Link>
            </li>
          </ul>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default AccountPage;
