import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";
import UserContainerComponent from "components/container/UserContainerComponent";

function WalletListPage() {
  const { state } = React.useContext(AppContext);
  const { user } = state;

  const nav = [
    {
      label: "Wallet",
    },
  ];

  return (
    <UserContainerComponent bread={nav}>
      <div className="row">
        <div className="col l6 offset-l3 s12">
          <ul className="collection">
            <li className="collection-item">
              <s style={{ marginRight: "1rem", fontSize: "1.5rem" }}>N</s>
              <Link to="/user/wallet/naira/list.html">Naira</Link>
              <span className="secondary-content">
                {user.btc_wallets.length}
              </span>
            </li>
            <li className="collection-item">
              <span
                className="icon icon-btc"
                style={{ marginRight: "1rem", fontSize: "1.5rem" }}
              ></span>
              <Link to="/user/wallet/btc/list.html">Bitcoin</Link>
              <span className="secondary-content">1</span>
            </li>
            <li className="collection-item">
              <span
                className="icon icon-eth"
                style={{ marginRight: "1rem", fontSize: "1.5rem" }}
              ></span>
              <Link to="/user/wallet/eth/list.html">Ethereum</Link>
              <span className="secondary-content">
                {user.eth_wallets.length}
              </span>
            </li>
            <li className="collection-item">
              <span
                className="icon icon-usdt"
                style={{ marginRight: "1rem", fontSize: "1.5rem" }}
              ></span>
              <Link to="/user/wallet/usdt/list.html">Tether (USDT)</Link>
              <span className="secondary-content">
                {user.usdt_wallets.length}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default WalletListPage;
