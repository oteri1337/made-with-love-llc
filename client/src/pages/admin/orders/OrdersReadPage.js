import React from "react";
import { getRequestThenDispatch } from "hooks";
import { formatOrder } from "functions/data";
import CompleteOrderComponent from "./CompleteOrderComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function OrdersReadPage({ location, match }) {
  const { reference } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/orders/${reference}`,
    "UPDATE_ORDER"
  );

  const oldDta = state.orders.object[reference] || location.props;

  if (!oldDta) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">
          <h1>Not Found</h1>
        </div>
      </AdminContainerComponent>
    );
  }

  const data = formatOrder(oldDta);

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Orders",
      link: "/control/orders/list.html",
    },
    {
      label: `${data.reference} ${data.total_in_ngn}`,
    },
  ];

  const renderRow = () => {
    return Object.keys(data).map((key) => {
      if (typeof data[key] == "object") return false;
      return (
        <tr key={key}>
          <td style={{ textTransform: "uppercase" }}>
            {key.replace(/_/g, " ")}
          </td>
          <td>{data[key]}</td>
        </tr>
      );
    });
  };

  const renderCompleteButton = () => {
    if (oldDta.status == 2) {
      return <CompleteOrderComponent id={oldDta.id} />;
    }
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l3 s12">
            <center>{renderCompleteButton()}</center>
          </div>
          <div className="col l9 s12">
            <table className="striped">
              <tbody>{renderRow()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminContainerComponent>
  );
}

export default OrdersReadPage;
