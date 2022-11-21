import React from "react";
import { months } from "../Months";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";

function UsdtTansactionsComponent() {
  const { state } = React.useContext(AppContext);
  const { user, wallet } = state;

  const array = wallet.usdt.transactions;

  const callback = (props) => {
    const renderChange = () => {
      if (
        user.usdt_wallets[0].address.toUpperCase() == props.to.toUpperCase()
      ) {
        return (
          <div>
            {props.from}
            <br />
            <span className="green-text">
              + {props.value / 1e6} {props.tokenSymbol}
            </span>
          </div>
        );
      }
      return (
        <div>
          {props.to}
          <br />
          <span className="red-text">
            - {props.value / 1e6} {props.tokenSymbol}
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

  const empty = `No Transactions For ${user.usdt_wallets[0].address}`;

  return <ListComponent {...{ array, callback, empty }} />;
}

export default UsdtTansactionsComponent;
