import React from "react";
import { months } from "../Months";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";

function EthereumTransactionsComponent() {
  const { state } = React.useContext(AppContext);
  const { user, wallet } = state;

  const eth_address = user.eth_wallets[0].address;
  const list = { array: wallet.ethereum.transactions };

  const callback = (props) => {
    if (props.value == 0) {
      return <React.Fragment />;
    }

    const renderChange = () => {
      if (eth_address == props.to) {
        return (
          <div>
            {props.from}
            <br />
            <span className="green-text">
              + {props.value / 1000000000000000000} ETH
            </span>
          </div>
        );
      }
      return (
        <div>
          {props.to}
          <br />
          <span className="red-text">
            - {props.value / 1000000000000000000} ETH
          </span>
        </div>
      );
    };

    const renderDate = () => {
      const date = new Date(props.timeStamp * 1000);

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
    };

    return (
      <li
        key={props.hash}
        className="collection-item"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <div className="app-flex app-flex-center">
          {renderDate()}
          <div style={{ flex: 3 }}>{renderChange()}</div>
        </div>
      </li>
    );
  };

  const empty = `No Transactions For ${eth_address}`;

  return <ListComponent {...{ list, callback, empty }} />;
}

export default EthereumTransactionsComponent;
