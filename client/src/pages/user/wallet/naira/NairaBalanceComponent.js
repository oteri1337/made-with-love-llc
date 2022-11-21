import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import { AppContext } from "providers/AppProvider";

const style = { paddingLeft: 0, paddingRight: 0, borderRadius: "10px" };
const iconStyle = { fontSize: "3.5rem", margin: "30px" };

function NairaBalanceComponent() {
  const { state, callReducer } = React.useContext(AppContext);

  return (
    <ul className="collection">
      <li className="collection-item center" style={style}>
        <p style={iconStyle}>
          <s>N</s>
        </p>
        <p>{format("NGN", state.user.naira_balance)}</p>
        <Link
          to="/user/wallet/naira/send.html"
          className="btn btn-secondary btn-flat"
        >
          SEND
        </Link>
        <br />
        <Link
          to="/user/wallet/naira/deposit.html"
          className="btn btn-secondary btn-flat"
        >
          DEPOSIT
        </Link>
      </li>
    </ul>
  );
}

export default NairaBalanceComponent;
