import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

const format = (currency, amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

function BtcListPage() {
  const { state } = React.useContext(AppContext);
  const { user, wallet, prices } = state;
  const { balance_map } = wallet.bitcoin;

  const nav = [
    {
      label: "Wallet",
      link: "/user/wallet/list.html",
    },
    {
      label: "Bitcoin",
    },
  ];

  const copy = (e) => {
    navigator.clipboard.writeText(e.target.id);
    M.toast({ html: `Copied to clipboard`, displayLength: 10000 });
  };

  const renderWalltets = () => {
    return user.btc_wallets.map((wallet) => {
      let balance = balance_map[wallet.address] ?? 0;
      balance = parseFloat(balance);

      return (
        <li className="collection-item center" key={wallet.id}>
          <p>
            <Link to={`/user/wallet/btc/send.html?walletid=${wallet.path}`}>
              {wallet.address}
            </Link>{" "}
            <span
              className="material-icons notranslate"
              id={wallet.address}
              onClick={copy}
            >
              file_copy
            </span>
            <br />
            <a
              href={`https://www.blockchain.com/btc/address/${wallet.address}`}
              target="_blank"
            >
              View On blockchain
            </a>
          </p>
          {balance.toFixed(8)} BTC ({" "}
          {format("USD", balance * prices.bitcoin.usd)} )<p>{wallet.label}</p>
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
          to="/user/wallet/btc/create.html"
          title="Generate New Address"
        />
      </div>
    </UserContainerComponent>
  );
}

export default BtcListPage;
