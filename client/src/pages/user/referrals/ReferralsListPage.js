import React from "react";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function ReferralsListPage() {
  const { state } = React.useContext(AppContext);

  const array = state.user.referrals;

  const callback = (props) => {
    const src = `/uploads/images/${props.photo_profile}`;
    return (
      <li className="collection-item avatar" key={props.id}>
        <img src={src} alt="" className="circle" />
        <b>{props.account_name}</b>
        <p>{props.createdAt}</p>
      </li>
    );
  };

  return (
    <UserContainerComponent bread={[{ label: "Referrals" }]}>
      <div className="container">
        <div className="row">
          <div className="col l4 s12">
            <ul className="collection">
              <li className="collection-item center">
                <h1 style={{ marginBottom: 0, paddingBottom: 0 }}>
                  {state.user.referrals.length}
                </h1>
                Referrals
                <br />
                <br />
                <span>
                  https://www.traderfxm.com/signup.html?refid={state.user.id}
                </span>
                <br />
                Your Refferal Link
              </li>
            </ul>
          </div>

          <div className="col l8 s12">
            <ListComponent {...{ array, callback }} />
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default ReferralsListPage;
