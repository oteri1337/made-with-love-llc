import React from "react";
import NairaBalanceComponent from "./NairaBalanceComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function BtcListPage() {
  const nav = [
    {
      label: "Wallet",
      link: "/user/wallet/list.html",
    },
    {
      label: "Naira",
    },
  ];

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <div className="row">
          <div className="col l6 offset-l3 s12">
            <NairaBalanceComponent />
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default BtcListPage;
