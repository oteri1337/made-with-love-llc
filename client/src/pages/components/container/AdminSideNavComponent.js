import React from "react";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png";
import { AppContext } from "providers/AppProvider";

function TourSideNavComponent() {
  const { callReducer } = React.useContext(AppContext);

  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  });

  React.useEffect(() => {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {});
  }, []);

  return (
    <ul className="sidenav" id="mobile-demo">
      <li>
        <div className="user-view">
          <div className="background">
            <img src={Logo} style={{ paddingLeft: "1rem" }} />
          </div>
        </div>
      </li>

      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active">
            <a className="collapsible-header">
              Pages
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link
                    to="/control/orders/list.html"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">
                      airport_shuttle
                    </span>
                    Orders
                  </Link>
                </li>

                <li>
                  <Link
                    to="/control/products/list.html"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">
                      shopping_cart
                    </span>
                    Products
                  </Link>
                </li>

                <li>
                  <Link to="/control/users/list.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      supervised_user_circle
                    </span>
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>

      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active">
            <a className="collapsible-header">
              Account
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link
                    to="/control/auth/account.html"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">
                      account_circle
                    </span>
                    My Account
                  </Link>
                </li>
                <li>
                  <a onClick={() => adminSignOut(callReducer)}>
                    <span className="material-icons notranslate">
                      power_settings_new
                    </span>
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>

      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active">
            <a className="collapsible-header">
              Theme
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <a
                    className="sidenav-close"
                    onClick={() =>
                      callReducer({ dispatch: "UPDATE_THEME", data: "DARK" })
                    }
                  >
                    <span className="material-icons notranslate">bookmark</span>
                    Dark
                  </a>
                </li>
                <li>
                  <a
                    className="sidenav-close"
                    onClick={() =>
                      callReducer({ dispatch: "UPDATE_THEME", data: "LIGHT" })
                    }
                  >
                    <span className="material-icons notranslate">
                      bookmark_border
                    </span>
                    Light
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default TourSideNavComponent;
