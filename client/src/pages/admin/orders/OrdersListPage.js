import React from "react";
import { Link } from "react-router-dom";
import { formatOrder } from "functions/data";
import { getRequestThenDispatch } from "hooks";
import ListAndSearchComponent from "components/ListAndSearchComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function OrdersListPage() {
  const endpoint = "/api/orders";
  const dispatch = "UPDATE_ORDERS";
  const { state, request } = getRequestThenDispatch(endpoint, dispatch);
  const { fetching } = request;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Orders",
    },
  ];

  const list = state.orders;

  const callback = (props) => {
    const formatted = formatOrder(props);
    const pathname = `/control/orders/${props.reference}`;

    return (
      <li className="collection-item" key={props.id}>
        <Link to={{ pathname, props }}>
          <b>
            {props.reference} {formatted.total_in_ngn}
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

export default OrdersListPage;
