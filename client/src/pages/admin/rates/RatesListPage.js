import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import ListAndSearchComponent from "components/ListAndSearchComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function RatesListPage() {
  const endpoint = "/api/rates";
  const dispatch = "UPDATE_RATES";
  const { state } = getRequestThenDispatch(endpoint, dispatch);

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Rates",
    },
  ];

  const list = state.rates;

  const callback = (props) => {
    return (
      <li className="collection-item" key={props.id}>
        <SecondaryButtonComponent
          type="DELETE"
          title="Delete Rate"
          dispatch="UPDATE_RATES"
          endpoint={endpoint}
          body={{ id: props.id }}
          message={`are you sure you want to delete ${props.lower_limit} to ${props.upper_limit}`}
        />
        <Link to={`/control/rates/${props.id}`}>
          {props.type === 1 && "Sell Rate "} {props.type === 2 && "Buy Rate"} $
          {props.lower_limit} to ${props.upper_limit} = <s>N</s>
          {props.rate}/$
        </Link>
      </li>
    );
  };

  const title = "Add Rate";

  const to = "/control/rates/create.html";

  return (
    <AdminContainerComponent bread={nav}>
      <ListAndSearchComponent {...{ list, callback, dispatch, endpoint }} />
      <FloatingButtonComponent {...{ title, to }} />
    </AdminContainerComponent>
  );
}

export default RatesListPage;
