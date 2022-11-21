import React from "react";
import { Link } from "react-router-dom";
import { formatTransaction } from "functions/data";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";

function TransactionsComponent() {
  const { state } = React.useContext(AppContext);

  const list = { array: state.user.transactions };

  const callback = (props) => {
    const formatted = formatTransaction(props);

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
            <span>
              <Link to={`/transactions/${props.reference}`}>
                {formatted.type} {formatted.amount_in_crypto} (
                {formatted.amount_in_ngn})
              </Link>
            </span>
            <br />
            {formatted.status}
          </div>
        </div>
      </li>
    );
  };

  const empty = `No Traderfxm Transactions Yet`;

  return <ListComponent {...{ list, callback, empty }} />;
}

export default TransactionsComponent;
