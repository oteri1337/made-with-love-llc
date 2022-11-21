import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";

function TourSideNavComponent() {
  const { callReducer } = React.useContext(AppContext);

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
              src="/assets/pwa/android-chrome-144x144.png"
              style={{ marginTop: "0.7rem", marginLeft: "2rem" }}
            />
          </div>
        </div>
      </li>

      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active">
            <a className="collapsible-header">
              Dashboard
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link to="/user/index.html" className="sidenav-close">
                    <span className="material-icons notranslate">home</span>
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/user/wallet/list.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      copyright
                    </span>
                    Wallet
                  </Link>
                </li>

                <li>
                  <Link to="/user/auth/account.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      account_circle
                    </span>
                    Account
                  </Link>
                </li>

                <li>
                  <Link to="/shop/orders.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      airport_shuttle
                    </span>
                    Orders
                  </Link>
                </li>

                <li>
                  <Link
                    to="/user/referrals/list.html"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">people</span>
                    Referrals
                  </Link>
                </li>

                <li>
                  <Link to="/transactions/list.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      switch_left
                    </span>
                    Transactions
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
              Sell Crypto
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link to="/transactions/sell.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      copyright
                    </span>
                    Sell Bitcoin
                  </Link>
                </li>

                <li>
                  <Link
                    to="/transactions/sell.html?currency=ETH"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">
                      copyright
                    </span>
                    Sell Ethereum
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop/products.html?currency=USDT"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">
                      copyright
                    </span>
                    Sell Tether (USDT)
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
              Buy Crypto
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link to="/transactions/buy.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      copyright
                    </span>
                    Buy Bitcoin
                  </Link>
                </li>

                <li>
                  <Link
                    to="/transactions/buy.html?currency=ETH"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">
                      copyright
                    </span>
                    Buy Ethereum
                  </Link>
                </li>

                <li>
                  <Link
                    to="/transactions/buy.html?currency=ETH"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">
                      copyright
                    </span>
                    Buy Tether (USDT)
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
              Shop
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link
                    to="/shop/categories/list.html"
                    className="sidenav-close"
                  >
                    <span className="material-icons notranslate">category</span>
                    Categories
                  </Link>
                </li>

                <li>
                  <Link to="/shop/products.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      shopping_cart
                    </span>
                    All Products
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
                    Dark Mode
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
                    Light Mode
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
