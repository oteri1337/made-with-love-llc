import React from "react";
import { months } from "../Months";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";

function BitcoinTransactionsComponent() {
  const { state } = React.useContext(AppContext);
  const { wallet, user } = state;

  const btc_address = user.btc_wallets[0].address;
  const list = { array: wallet.bitcoin.transactions };

  const callback = (props) => {
    const renderAmount = () => {
      if (wallet.bitcoin.balance_map[props.inputs[0].prev_out.addr]) {
        return (
          <React.Fragment>
            {props.out[0].addr}
            <br />
            <span style={{ color: "#e53935" }}>
              - {props.out[0].value / 1e8} BTC (Fee: {props.fee / 1e8} BTC)
            </span>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          {props.inputs[0].prev_out.addr}
          <br />
          <span style={{ color: "green" }}>
            + {props.out[0].value / 1e8} BTC
          </span>
        </React.Fragment>
      );
    };

    const renderDate = () => {
      if (props.time) {
        const date = new Date(props.time * 1000);

        let day = date.getDate();

        if (day < 10) {
          day = "0" + day;
        }

        return (
          <div
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              textAlign: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <p className="app-trading-month" style={{ fontSize: "1.2rem" }}>
              {months[date.getMonth()]}
            </p>
            <span className="app-trading-day" style={{ textAlign: "center" }}>
              {day}
            </span>
          </div>
        );
      }

      return (
        <div
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            textAlign: "center",
            padding: 0,
            margin: 0,
          }}
        >
          PENDING
        </div>
      );
    };

    return (
      <li
        key={props.hash}
        className="collection-item"
        style={{ paddingRight: 0, paddingLeft: 0 }}
      >
        <div className="app-flex app-flex-center">
          {renderDate()}
          <div style={{ flex: 4.5 }}>{renderAmount()}</div>
        </div>
      </li>
    );
  };

  const empty = `No Bitcoin Transactions Yet`;

  return <ListComponent {...{ list, callback, empty }} />;
}

export default BitcoinTransactionsComponent;
