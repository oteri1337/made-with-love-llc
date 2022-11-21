import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";
import { getBtcAddressBalance, getEthAddressBalance } from "functions/http";

function WalletHomeComponent() {
  const { state, callReducer } = React.useContext(AppContext);
  const { user, balance, prices } = state;

  React.useLayoutEffect(() => {
    const asyncOp = async () => {
      let data = await getBtcAddressBalance(user.btc_address);
      callReducer({ dispatch: "UPDATE_BTC_BALANCE", data });

      data = await getEthAddressBalance(user.eth_address);
      //callReducer({ dispatch: "UPDATE_ETH_BALANCE", data });
    };

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});

    asyncOp();
  }, []);

  return (
    <div className="row">
      <div className="col l4 s12">
        <ul className="collection">
          <li
            className="collection-item center"
            style={{ paddingLeft: 0, paddingRight: 0, borderRadius: "10px" }}
          >
            <p
              className="icon icon-btc"
              style={{ fontSize: "3rem", margin: "10px" }}
            />
            <br />
            <span>{balance.btc.toFixed(8)} BTC</span>
            <br />
            <span>{format("USD", balance.btc * prices.bitcoin.usd)}</span>
            <br />
            <br />
            <button data-target="modal1" className="btn modal-trigger">
              RECEIVE
            </button>
            <Link to="/user/wallet/sendbtc.html" className="btn" title="Send">
              {/* <span className="material-icons notranslate">send</span> */}
              SEND
            </Link>
          </li>
        </ul>
      </div>

      <div className="col l4 s12">
        <ul className="collection">
          <li
            className="collection-item center"
            style={{ paddingLeft: 0, paddingRight: 0, borderRadius: "10px" }}
          >
            <p
              className="icon icon-eth"
              style={{ fontSize: "3rem", margin: "10px" }}
            />
            <br />
            <span>{balance.eth.toFixed(8)} ETH</span>
            <br />
            <span>{format("USD", balance.eth * prices.ethereum.usd)}</span>
            <br />
            <br />
            <button data-target="modal2" className="btn modal-trigger">
              RECEIVE
            </button>
            <Link to="/user/wallet/sendeth.html" className="btn">
              SEND
            </Link>
          </li>
        </ul>
      </div>

      <div className="col l4 s12">
        <ul className="collection">
          <li
            className="collection-item center"
            style={{ paddingLeft: 0, paddingRight: 0, borderRadius: "10px" }}
          >
            <p
              className="icon icon-usdt"
              style={{ fontSize: "3rem", margin: "10px" }}
            />
            <br />
            <span>0.00 USDT</span>
            <br />
            <span>{format("USD", balance.eth * prices.ethereum.usd)}</span>
            <br />
            <br />
            <button data-target="modal2" className="btn modal-trigger">
              RECEIVE
            </button>
            <Link to="/user/wallet/sendeth.html" className="btn">
              SEND
            </Link>
          </li>
        </ul>
      </div>

      <div id="modal1" className="modal" style={{ color: "#000" }}>
        <div className="modal-content center">
          <img
            src={`https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=bitcoin:${user.btc_address}`}
            alt={user.btc_address}
          />
          <p>{user.btc_address}</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            style={{ color: "#000" }}
          >
            close
          </a>
        </div>
      </div>

      <div id="modal2" className="modal" style={{ color: "#000" }}>
        <div className="modal-content center">
          <img
            src={`https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=ethereum:${user.btc_address}`}
            alt={user.btc_address}
          />
          <p>{user.eth_address}</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
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

export default WalletHomeComponent;
