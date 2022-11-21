import React from "react";
import { getRequestThenDispatch } from "hooks";
import { formatNairaTransaction } from "functions/data";
import CompleteTransactionComponent from "./CompleteTransactionComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function TransactionsReadPage({ location, match }) {
  const { id } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/nairatransactions/${id}`,
    "UPDATE_NAIRATRANSACTION"
  );

  const oldDta = state.ntransactions.object[id] || location.props;

  if (!oldDta) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">
          <h1>Not Found</h1>
        </div>
      </AdminContainerComponent>
    );
  }

  const data = formatNairaTransaction(oldDta);

  let to;

  if (oldDta.bank_name?.length) {
    to = oldDta.bank_name?.toUpperCase();
  } else {
    to = oldDta.address;
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Naira Transactions",
      link: "/control/nairatransactions/list.html",
    },
    {
      label: `${data.amount} to ${to}`,
    },
  ];

  const renderRow = () => {
    return Object.keys(data).map((key) => {
      if (typeof key == "object") return false;
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

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l4 s12">
            <center>
              <CompleteTransactionComponent
                id={oldDta.id}
                status={oldDta.status}
              />
            </center>
          </div>
          <div className="col l8 s12">
            <table className="striped">
              <tbody>{renderRow()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminContainerComponent>
  );
}

export default TransactionsReadPage;
