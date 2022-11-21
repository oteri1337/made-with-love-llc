import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import { formatNairaTransaction } from "functions/data";
import ListAndSearchComponent from "components/ListAndSearchComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function TransactionsListPage() {
  const endpoint = "/api/nairatransactions";
  const dispatch = "UPDATE_NAIRATRANSACTIONS";
  const { state, request } = getRequestThenDispatch(endpoint, dispatch);
  const { fetching } = request;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Naira Transactions",
    },
  ];

  const list = state.ntransactions;

  const callback = (props) => {
    const formatted = formatNairaTransaction(props);
    const pathname = `/control/nairatransactions/${props.id}`;

    const renderTo = () => {
      if (props.bank_name?.length) {
        return props.bank_name?.toUpperCase();
      }
      return props.address;
    };

    return (
      <li key={props.id} className="collection-item">
        <Link to={{ pathname, props }}>
          <b>
            {formatted.amount} to {renderTo()}
          </b>
        </Link>
        <br />
        {formatted.status}
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <ListAndSearchComponent
        {...{ list, dispatch, endpoint, fetching, callback }}
      />
    </AdminContainerComponent>
  );
}

export default TransactionsListPage;
