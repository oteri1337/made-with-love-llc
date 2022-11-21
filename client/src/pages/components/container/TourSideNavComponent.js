import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";
import UserSideNavComponent from "./UserSideNavComponent";

function TourSideNavComponent() {
  const { state, callReducer } = React.useContext(AppContext);

  if (state.user) {
    return <UserSideNavComponent />;
  }

  React.useEffect(() => {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {});
  }, []);

  return (
    <ul className="sidenav" id="mobile-demo">
      <li>
        <div className="user-view">
          <div className="background">
            <img
              src="/assets/images/logo.png"
              style={{ width: "250px", marginTop: "5px" }}
            />
          </div>
        </div>
      </li>

      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active">
            <a className="collapsible-header">
              Shop
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link to="/" className="sidenav-close">
                    <span className="material-icons notranslate">home</span>
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/privacy.html" className="sidenav-close">
                    <span className="material-icons notranslate">lock</span>
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link to="/security.html" className="sidenav-close">
                    <span className="material-icons notranslate">security</span>
                    Security Policy
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
                    Dark Theme
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
                    Light Theme
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
