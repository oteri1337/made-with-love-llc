import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "providers/AppProvider";

function EthBalanceComponent() {
  const [fetching, setFetching] = React.useState(true);
  const { state, callReducer } = React.useContext(AppContext);
  const { wallet, user, prices } = state;

  const addr = user.eth_wallets.reduce((pwallet, wallet) => {
    return `${pwallet}${wallet.address},`;
  }, "");

  let url = `https://api.etherscan.io/api?module=account&action=balancemulti&address=${addr}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;

  React.useEffect(() => {
    let mounted = true;

    const asyncOperation = async () => {
      let response = await fetch(url);
      response = await response.json();

      let balance_map = {};
      let balance = wallet.ethereum.balance;
      let transactions = wallet.ethereum.transactions;

      if (response.status == 1) {
        balance = response.result.reduce((sum, wallet) => {
          let wbalance = parseInt(wallet.balance);
          wbalance = wbalance / 1e18;
          balance_map[wallet.account] = wbalance;
          return sum + wbalance;
        }, 0);
      }

      url = `http://api.etherscan.io/api?module=account&action=txlist&address=${user.eth_wallets[0]?.address}&startblock=0&endblock=99999999&sort=desc&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
      response = await fetch(url);
      response = await response.json();

      if (mounted) {
        setFetching(false);
      }

      if (response.status == 1 || response.status == 0) {
        transactions = response.result;
      }

      callReducer({
        dispatch: "UPDATE_ETH_WALLET",
        data: { balance, transactions, balance_map },
      });
    };

    asyncOperation();

    return () => {
      mounted = false;
    };
  }, []);

  const style = { paddingLeft: 0, paddingRight: 0, borderRadius: "10px" };
  const iconStyle = { fontSize: "3rem", margin: "10px" };

  const copy = () => {
    navigator.clipboard.writeText(user.eth_wallets[0].address);
    M.toast({ html: `Copied to clipboard`, displayLength: 1000 });
  };

  return (
    <div>
      <ul className="collection">
        <li className="collection-item center" style={style}>
          <p className="icon icon-eth" style={iconStyle} />
          {fetching ? (
            <p>
              <Skeleton count={1} width={100} />
            </p>
          ) : (
            <p> {wallet.ethereum.balance} ETH</p>
          )}

          {/* {fetching ? (
            <p>
              <Skeleton count={1} width={150} />
            </p>
          ) : (
            <p>
              {" "}
              {format("USD", prices.ethereum.usd * wallet.ethereum.balance)}
            </p>
          )} */}
          <Link
            to="/user/wallet/eth/send.html"
            className="btn btn-secondary btn-flat"
            title="Send"
          >
            SEND
          </Link>
          <br />
          <button
            data-target="modal2"
            className="btn btn-secondary btn-flat modal-trigger"
          >
            RECEIVE
          </button>
        </li>
      </ul>
      <div id="modal2" className="modal" style={{ color: "#000" }}>
        <div className="modal-content center">
          <img
            src={`https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${user.eth_wallets[0].address}`}
            alt={user.eth_wallets[0].address}
          />
          <p>
            {user.eth_wallets[0].address}{" "}
            <span className="material-icons notranslate" onClick={copy}>
              file_copy
            </span>
          </p>
          <Link to="/user/wallet/eth/create.html" className="btn-color">
            GENERATE NEW ADDRESS
          </Link>
        </div>
        <div className="modal-footer">
          <a
            className="modal-close waves-effect waves-green btn-flat"
            style={{ color: "#000" }}
          >
            close
          </a>
        </div>
      </div>
    </div>
  );
}

export default EthBalanceComponent;
