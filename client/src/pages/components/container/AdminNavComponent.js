import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";

function TourNavComponent() {
  const { state, adminSignOut } = React.useContext(AppContext);
  const { admin } = state;

  return (
    <div className="navbar-fixed">
      <nav>
        <ul>
          <li>
            <a
              data-target="mobile-demo"
              className="sidenav-trigger show-on-large"
            >
              <span className="material-icons notranslate">menu</span>
            </a>
          </li>
        </ul>
        <Link to="/control/index.html" className="brand-logo">
          {PWA_NAME}
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/control/orders/list.html">
              <span className="material-icons notranslate">
                airport_shuttle
              </span>
              Orders
            </Link>
          </li>

          <li>
            <Link to="/control/products/list.html">
              <span className="material-icons notranslate">shopping_cart</span>
              Products
            </Link>
          </li>

          <li>
            <Link to="/control/auth/account.html">
              <span className="material-icons notranslate">account_circle</span>
              {admin.first_name} {admin.last_name}
            </Link>
          </li>

          <li>
            <a onClick={adminSignOut} className="hover">
              <span className="material-icons notranslate">
                power_settings_new
              </span>
            </a>
          </li>
        </ul>

        <ul id="nav-mobile" className="right hide-on-large-only">
          <li>
            <a onClick={adminSignOut} className="hover">
              <span className="material-icons notranslate">
                power_settings_new
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TourNavComponent;
