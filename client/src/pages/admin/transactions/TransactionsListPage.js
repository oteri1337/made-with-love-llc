import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import { formatTransaction } from "functions/data";
import ListAndSearchComponent from "components/ListAndSearchComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function TransactionsListPage() {
  const endpoint = "/api/transactions";
  const dispatch = "UPDATE_TRANSACTIONS";
  const { state, request } = getRequestThenDispatch(endpoint, dispatch);
  const { fetching } = request;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Exchange Transactions",
    },
  ];

  const list = state.transactions;

  const callback = (props) => {
    const formatted = formatTransaction(props);
    const pathname = `/control/transactions/${props.reference}`;

    return (
      <li key={props.id} className="collection-item">
        <Link to={{ pathname, props }}>
          <b>
            {formatted.type} {formatted.amount_in_crypto} For{" "}
            {formatted.amount_in_ngn}
          </b>
        </Link>
        <br />
        {formatted.status}
      </li>
    );

    if (formatted.type == "SELL") {
      return (
        <li className="collection-item" key={props.id}>
          <p>
            <b>
              <Link
                to={{
                  pathname: `/control/transactions/${props.address}`,
                  props,
                }}
              >
                Boss, someone needs {formatted.amount_in_ngn} sent their bank
                account
              </Link>
            </b>
          </p>
          <span>
            {props.bank_name} {props.account_number}
          </span>
          <br />
          <span>{props.account_name}</span>
          <br />
          <br />
          check if they have sent {formatted.amount_in_crypto} to your wallet{" "}
          {props.address}
          <p>{formatted.status}</p>
        </li>
      );
    }

    return (
      <li className="collection-item" key={props.id}>
        <Link to={{ pathname, props }}>
          <b>
            Send {formatted.amount_in_crypto} to {props.address}
          </b>
        </Link>
        <p>{formatted.status}</p>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <ListAndSearchComponent
        {...{ list, callback, dispatch, endpoint, fetching }}
      />
    </AdminContainerComponent>
  );
}

export default TransactionsListPage;
