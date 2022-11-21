import React from "react";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function BanksListPage() {
  const { state } = React.useContext(AppContext);

  const array = state.user.accounts;

  const nav = [
    {
      label: "Accout",
      link: "/user/auth/account.html",
    },
    {
      label: "Bank Accounts",
    },
  ];

  const callback = (props) => {
    return (
      <li className="collection-item" key={props.id}>
        <SecondaryButtonComponent
          type="DELETE"
          title="Delete Rate"
          dispatch="UPDATE_USER"
          endpoint={"/api/users/accounts"}
          body={{ id: props.id }}
          message={`are you sure you want to delete this account ${props.bank_name} ${props.account_number}?`}
        />
        {props.bank_name}
        <br />
        {props.account_name}
        <br />
        {props.account_number}
      </li>
    );
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <ListComponent {...{ array, callback }} />
        <FloatingButtonComponent
          to="/user/banks/create.html"
          title="Add Account"
        />
      </div>
    </UserContainerComponent>
  );
}

export default BanksListPage;
