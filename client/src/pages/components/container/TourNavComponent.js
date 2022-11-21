import React from "react";
import { Link } from "react-router-dom";
import { getNavClassName } from "hooks";
import { AppContext } from "providers/AppProvider";
import ThemeChangerNavComponent from "./ThemeChangerNavComponent";

function TourNavComponent() {
  const { state, signOut } = React.useContext(AppContext);
  const { user } = state;

  React.useLayoutEffect(() => {
    const dropdown = document.querySelectorAll(".dropdown-trigger");
    const options = {
      constrainWidth: false,
      coverTrigger: false,
      hover: true,
      closeOnClick: false,
    };
    if (window.M) {
      M.Dropdown.init(dropdown, options);
    }
  }, []);

  const className = getNavClassName();

  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  });

  const renderUser = () => {
    if (user) {
      return (
        <li>
          <Link to="/user/auth/account.html" className="hover">
            {user.account_name}
          </Link>
        </li>
      );
    }

    return (
      <li>
        <Link to="/signin.html" className="hover">
          My Account
        </Link>
      </li>
    );
  };

  const renderSignIn = () => {
    if (state.user) {
      return (
        <li>
          <a className="hover" onClick={signOut}>
            <span className="material-icons notranslate">
              power_settings_new
            </span>
          </a>
        </li>
      );
    }
    return (
      <li>
        <Link to="/signin.html" className="hover">
          <span className="material-icons notranslate">account_circle</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="navbar-fixed">
      <nav className={className}>
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
        <Link to="/" className="brand-logo">
          {PWA_NAME}
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/privacy.html">PRIVACY POLICY</Link>
          </li>
          <li>
            <Link to="/security.html">SECURITY POLICY</Link>
          </li>
          <ThemeChangerNavComponent />
          <li>
            <Link to="/shop/cart.html" title="Cart">
              <span className="material-icons notranslate">shopping_cart</span>(
              {Object.keys(state.cart).length})
            </Link>
          </li>
        </ul>

        <ul id="nav-mobile" className="right hide-on-large-only">
          <li>
            <Link to="/shop/cart.html" title="Cart">
              <span
                className="material-icons notranslate"
                style={{ padding: 0 }}
              >
                shopping_cart
              </span>
              ({Object.keys(state.cart).length})
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TourNavComponent;
