import React from "react";
import UserContainerComponent from "components/container/UserContainerComponent";
import CombinedTransactionsComponent from "./CombinedTransactionsComponent";

function TransactionsListPage() {
  const nav = [
    {
      label: "Transactions",
    },
  ];

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <CombinedTransactionsComponent />
      </div>
    </UserContainerComponent>
  );
}

export default TransactionsListPage;
