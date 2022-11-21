import React from "react";
import { getRequestThenDispatch } from "hooks";
import { formatTransaction } from "functions/data";
import CompleteTransactionComponent from "./CompleteTransactionComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function TransactionsReadPage({ location, match }) {
  const { reference } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/transactions/${reference}`,
    "UPDATE_TRANSACTION"
  );

  const oldDta = state.transactions.object[reference] || location.props;

  if (!oldDta) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">
          <h1>Not Found</h1>
        </div>
      </AdminContainerComponent>
    );
  }

  const data = formatTransaction(oldDta);

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Transactions",
      link: "/control/transactions/list.html",
    },
    {
      label: `${data.type} ${data.amount_in_crypto} For ${data.amount_in_ngn}`,
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

  const renderMessage = () => {
    if (oldDta.type == 2) {
      return (
        <div>
          <p>
            Please send {data.amount_in_ngn} to {oldDta.bank_name}{" "}
            {oldDta.account_number} {oldDta.account_name}
          </p>{" "}
          Then click on COMPLETE TRANSACTION
        </div>
      );
    }
    if (oldDta.type == 1) {
      return (
        <div>
          <p>
            Please send {data.amount_in_crypto} to {oldDta.address}
          </p>{" "}
          Then click on COMPLETE TRANSACTION
        </div>
      );
    }
  };

  const renderCompleteButton = () => {
    if (oldDta.status == 2) {
      return (
        <div>
          {renderMessage()}
          <CompleteTransactionComponent id={oldDta.id} />
        </div>
      );
    }

    if (oldDta.type == 2) {
      return (
        <p>
          Please standy to recieve {data.amount_in_crypto} via {oldDta.address}
        </p>
      );
    }
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l5 s12">{renderCompleteButton()}</div>
          <div className="col l7 s12">
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
