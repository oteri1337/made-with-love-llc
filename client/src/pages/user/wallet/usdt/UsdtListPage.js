import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function UsdtListPage() {
  const { state } = React.useContext(AppContext);
  const { user, wallet } = state;
  const { balance_map } = wallet.usdt;

  const nav = [
    {
      label: "Wallet",
      link: "/user/wallet/list.html",
    },
    {
      label: "Tether",
    },
  ];

  const copy = (e) => {
    navigator.clipboard.writeText(e.target.id);
    M.toast({ html: `Copied to clipboard`, displayLength: 10000 });
  };

  const renderWalltets = () => {
    return user.usdt_wallets.map((wallet) => {
      let balance = balance_map[wallet.address] ?? 0;
      balance = parseFloat(balance);

      return (
        <li className="collection-item center" key={wallet.id}>
          <Link to="/user/wallet/usdt/send.html">{wallet.address}</Link>{" "}
          <span
            className="material-icons notranslate"
            id={wallet.address}
            onClick={copy}
          >
            file_copy
          </span>
          <br />
          <a
            href={`https://etherscan.io/address/${wallet.address}#tokentxns`}
            target="_blank"
          >
            View On Etherscan
          </a>
          <p>{balance.toFixed(2)} USDT</p>
          <p>{wallet.label}</p>
        </li>
      );
    });
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <div className="row">
          <div className="col l6 offset-l3 s12">
            <ul className="collection">{renderWalltets()}</ul>
          </div>
        </div>
        <FloatingButtonComponent
          to="/user/wallet/usdt/create.html"
          title="Generate New Address"
        />
      </div>
    </UserContainerComponent>
  );
}

export default UsdtListPage;
