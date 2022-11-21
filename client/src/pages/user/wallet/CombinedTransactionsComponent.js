import React from "react";
import { AppContext } from "providers/AppProvider";
import SymbolComponent from "components/charts/SymbolComponent";
import UsdtTransactionsComponent from "./usdt/UsdtTransactionsComponent";
import BitcoinTransactionsComponent from "./btc/BtcTransactionsComponent";
import EthereumTransactionsComponent from "./eth/EthTransactionsComponent";
import NairaTransactionsComponent from "./naira/NairaTransactionsComponent";
import ExchangeTransactionsComponent from "./ExchangeTransactionsComponent";

function TransactionsListComponent() {
  const { state } = React.useContext(AppContext);
  const { theme } = state;

  React.useLayoutEffect(() => {
    // tab switcher animation
    var el = document.querySelector(".tabs");
    M.Tabs.init(el, {});
  });
  return (
    <div className="row">
      <div className="col l4 s12">
        <SymbolComponent theme={theme} />
        <SymbolComponent symbol="ETHUSD" theme={theme} />
      </div>
      <div
        className="col l8 s12 bg bg-secondary app-mb-1"
        style={{ minHeight: "50vh" }}
      >
        <div className="col s12 app-mt-1">
          <ul className="tabs">
            {/* <li className="tab col l3 s12">
              <a className="active" href="#traderfxm">
                <b>T</b>
                <span
                  className="hide-on-small-only"
                  style={{ paddingLeft: "0.5rem" }}
                >
                  Traderfxm
                </span>
              </a>
            </li> */}
            <li className="tab col l3 s12">
              <a className="active" href="#naira">
                <b>
                  <s>N</s>
                </b>
                <span
                  className="hide-on-small-only"
                  style={{ paddingLeft: "0.5rem" }}
                >
                  Naira
                </span>
              </a>
            </li>
            <li className="tab col l3 s12">
              <a href="#bitcoin">
                <span className="icon icon-btc"></span>
                <span
                  className="hide-on-small-only"
                  style={{ paddingLeft: "0.5rem" }}
                >
                  Bitcoin
                </span>
              </a>
            </li>
            <li className="tab col l3 s12">
              <a href="#ethereum">
                <span className="icon icon-eth"></span>
                <span
                  className="hide-on-small-only"
                  style={{ paddingLeft: "0.5rem" }}
                >
                  Ethereum
                </span>
              </a>
            </li>
            <li className="tab col l3 s12">
              <a href="#tether">
                <span className="icon icon-usdt"></span>
                <span
                  className="hide-on-small-only"
                  style={{ paddingLeft: "0.5rem" }}
                >
                  Tether
                </span>
              </a>
            </li>
          </ul>
        </div>
        {/* <div id="traderfxm" className="col s12">
          <br />
          <ExchangeTransactionsComponent />
        </div> */}
        <div id="naira" className="col s12">
          <br />
          <NairaTransactionsComponent />
        </div>
        <div id="bitcoin" className="col s12">
          <br />
          <BitcoinTransactionsComponent />
        </div>
        <div id="ethereum" className="col s12">
          <br />
          <EthereumTransactionsComponent />
        </div>
        <div id="tether" className="col s12">
          <br />
          <UsdtTransactionsComponent />
        </div>
      </div>
    </div>
  );
}

export default TransactionsListComponent;
