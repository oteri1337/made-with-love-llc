import React from "react";
import { Link } from "react-router-dom";
import { formatNairaTransaction } from "functions/data";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";

function TransactionsComponent() {
  const { state } = React.useContext(AppContext);

  const list = { array: state.user.nairatransactions };

  const callback = (props) => {
    const { type } = props;
    const formatted = formatNairaTransaction(props);

    const pathname = `/nairatransactions/${props.reference}`;

    const renderAmount = () => {
      if (type == 1) {
        return (
          <Link to={{ pathname }} className="green-text">
            + {formatted.amount}
          </Link>
        );
      }

      return (
        <Link to={{ pathname }} className="red-text">
          - {formatted.amount}
        </Link>
      );
    };

    const renderTo = () => {
      if (formatted.address) {
        return (
          <span>
            {formatted.address}
            <br />
            {formatted.status}
          </span>
        );
      }
      return (
        <span>
          {formatted.bank_name} {formatted.account_number}
          <br /> {formatted.account_name} ({formatted.status})
        </span>
      );
    };

    return (
      <li
        key={props.id}
        className="collection-item"
        style={{ paddingRight: 0, paddingLeft: 0 }}
      >
        <div className="app-flex app-flex-center">
          <div
            style={{
              fontFamily: "monospace",
              flex: 1,
              textAlign: "center",
            }}
          >
            <p className="app-trading-month" style={{ fontSize: "1.2rem" }}>
              {props.month}
            </p>
            <span className="app-trading-day" style={{ textAlign: "center" }}>
              {props.day}
            </span>
          </div>
          <div className="app-flex-3">
            <span></span>
            {renderAmount()}
            <br />
            {renderTo()}
          </div>
        </div>
      </li>
    );
  };

  const empty = `No Transactions Yet`;

  return <ListComponent {...{ list, callback, empty }} />;
}

export default TransactionsComponent;
