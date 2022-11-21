import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "providers/AppProvider";

function BtcBalanceComponent() {
  const [fetching, setFetching] = React.useState(true);
  const { state, callReducer } = React.useContext(AppContext);
  const { wallet, user, prices } = state;

  let addr;
  let url;

  addr = user.btc_wallets.reduce((pwallet, wallet) => {
    return `${pwallet}${wallet.address}|`;
  }, "");

  url = `https://cors-anywhere.herokuapp.com/https://blockchain.info/multiaddr?active=${addr}`;

  React.useEffect(() => {
    let mounted = true;
    const asyncOperation = async () => {
      try {
        let response = await fetch(url);
        response = await response.json();

        if (mounted) {
          setFetching(false);
        }

        if (response.wallet) {
          let balance = 0;
          let balance_map = {};
          let transactions = response.txs;

          response.addresses.forEach((wallet) => {
            balance_map[wallet.address] = wallet.final_balance / 1e8;
          });

          balance = response.wallet.final_balance / 1e8;

          callReducer({
            dispatch: "UPDATE_BTC_WALLET",
            data: { balance, balance_map, transactions },
          });
        }
      } catch (e) {
        console.log("btc balance component", e);
      }
    };

    asyncOperation();

    return () => {
      mounted = false;
    };
  }, []);

  const style = { paddingLeft: 0, paddingRight: 0, borderRadius: "10px" };
  const iconStyle = { fontSize: "3rem", margin: "10px" };
  const chart_url = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=bitcoin:`;
  const modal_class = "modal-close waves-effect waves-green btn-flat";

  const copy = () => {
    navigator.clipboard.writeText(user.btc_wallets[0].address);
    M.toast({ html: `Copied to clipboard`, displayLength: 1000 });
  };

  return (
    <div>
      <ul className="collection">
        <li className="collection-item center" style={style}>
          <p className="icon icon-btc" style={iconStyle} />
          {fetching ? (
            <p>
              <Skeleton count={1} width={100} />
            </p>
          ) : (
            <p> {wallet.bitcoin.balance.toFixed(8)} BTC</p>
          )}
          {/* {fetching ? (
            <p>
              <Skeleton count={1} width={150} />
            </p>
          ) : (
            <p> {format("USD", prices.bitcoin.usd * wallet.bitcoin.balance)}</p>
          )} */}
          <Link
            to="/user/wallet/btc/send.html"
            className="btn btn-secondary btn-flat"
            title="Send"
          >
            SEND
          </Link>
          <br />
          <button
            data-target="modal1"
            className="btn btn-secondary btn-flat modal-trigger"
          >
            RECEIVE
          </button>
        </li>
      </ul>
      <div id="modal1" className="modal" style={{ color: "#000" }}>
        <div className="modal-content center">
          <img
            src={`${chart_url}${user.btc_wallets[0].address}`}
            alt={user.btc_wallets[0].address}
          />
          <p>
            {user.btc_wallets[0].address}{" "}
            <span className="material-icons notranslate" onClick={copy}>
              file_copy
            </span>
          </p>
          <Link to="/user/wallet/btc/create.html" className="btn-color">
            GENERATE NEW ADDRESS
          </Link>
        </div>
        <div className="modal-footer">
          <a className={modal_class} style={{ color: "#000" }}>
            close
          </a>
        </div>
      </div>
    </div>
  );
}

export default BtcBalanceComponent;
