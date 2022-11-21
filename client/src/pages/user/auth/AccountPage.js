import React from "react";
import { Link } from "react-router-dom";
import UserContainerComponent from "components/container/UserContainerComponent";

function AccountPage() {
  return (
    <UserContainerComponent bread={[{ label: "Account" }]}>
      <div className="row">
        <div className="col l6 offset-l3 s12">
          <ul className="collection">
            <li className="collection-item">
              <span className="material-icons notranslate">account_circle</span>
              <Link to="/user/auth/profile.html">View Profile</Link>
            </li>
            <li className="collection-item">
              <span className="material-icons notranslate">
                account_balance
              </span>
              <Link to="/user/banks/list.html">Bank Accounts</Link>
            </li>
            <li className="collection-item">
              <span className="material-icons notranslate">
                insert_emoticon
              </span>
              <Link to="/user/auth/update-profile.html">Update Profile</Link>
            </li>
            <li className="collection-item">
              <span className="material-icons notranslate">linear_scale</span>
              <Link to="/user/auth/password.html">Update Password</Link>
            </li>
          </ul>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default AccountPage;
