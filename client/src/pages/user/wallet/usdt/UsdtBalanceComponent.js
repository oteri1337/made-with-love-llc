import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "providers/AppProvider";

function UsdtBalanceComponent() {
  const [fetching, setFetching] = React.useState(true);
  const { state, callReducer } = React.useContext(AppContext);
  const { wallet, user } = state;

  const usdt_address = user.usdt_wallets[0].address;

  const addr = user.usdt_wallets.reduce((pwallet, wallet) => {
    return `${pwallet}${wallet.address},`;
  }, "");

  React.useEffect(() => {
    let mounted = true;

    const asyncOperation = async () => {
      let response = await fetch(`/api/users/usdt/${addr}`);
      response = await response.json();

      console.log("usdt ", response);

      const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${usdt_address}&startblock=0&endblock=999999999&sort=desc&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
      let transResponse = await fetch(url);
      transResponse = await transResponse.json();

      if (mounted) {
        setFetching(false);
      }

      if (response.errors.length === 0) {
        const transactions = transResponse.result;

        const { total, balance_map } = response.data;

        console.log(total, balance_map);

        callReducer({
          dispatch: "UPDATE_USDT_WALLET",
          data: { balance_approximate: total, transactions, balance_map },
        });
      }
    };

    asyncOperation();

    return () => {
      mounted = false;
    };
  }, []);

  const style = { paddingLeft: 0, paddingRight: 0, borderRadius: "10px" };
  const iconStyle = { fontSize: "3rem", margin: "10px" };

  const copy = () => {
    navigator.clipboard.writeText(user.usdt_wallets[0].address);
    M.toast({ html: `Copied to clipboard`, displayLength: 1000 });
  };

  return (
    <div>
      <ul className="collection">
        <li className="collection-item center" style={style}>
          <p className="icon icon-usdt" style={iconStyle} />
          {fetching ? (
            <p>
              <Skeleton count={1} width={100} />
            </p>
          ) : (
            <p> {wallet.usdt.balance_approximate.toFixed(2)} USDT</p>
          )}
          {/* 
          {fetching ? (
            <p>
              <Skeleton count={1} width={150} />
            </p>
          ) : (
            <p> {format("USD", wallet.usdt.balance_approximate)}</p>
          )} */}
          <Link
            to="/user/wallet/usdt/send.html"
            className="btn btn-secondary btn-flat"
            title="Send"
          >
            SEND
          </Link>
          <br />
          <button
            data-target="modal3"
            className="btn btn-secondary btn-flat modal-trigger"
          >
            RECEIVE
          </button>
        </li>
      </ul>
      <div id="modal3" className="modal" style={{ color: "#000" }}>
        <div className="modal-content center">
          <img
            src={`https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${user.usdt_wallets[0].address}`}
            alt={user.usdt_wallets[0].address}
          />
          <p>
            {user.usdt_wallets[0].address}{" "}
            <span className="material-icons notranslate" onClick={copy}>
              file_copy
            </span>
          </p>
          <Link to="/user/wallet/usdt/create.html" className="btn-color">
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

export default UsdtBalanceComponent;
