import React from "react";
import { Link } from "react-router-dom";
import Order from "assets/images/Order.png";
import { formatOrder } from "functions/data";
import { AppContext } from "providers/AppProvider";
import ListComponent from "components/ListComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

const format = (currency, amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

function OrdersListPage() {
  const { state } = React.useContext(AppContext);

  let Container = UserContainerComponent;

  const list = { array: state.user.orders };

  const nav = [
    {
      label: "Orders",
    },
  ];

  const callback = (props) => {
    const data = formatOrder(props);

    return (
      <li
        key={props.id}
        className="collection-item"
        style={{ paddingRight: 0, paddingLeft: 0 }}
      >
        <div className="app-flex">
          <div
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              textAlign: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <p className="app-trading-month" style={{ fontSize: "1.2rem" }}>
              {props.month}
            </p>
            <span className="app-trading-day">{props.day}</span>
          </div>
          <div className="app-flex-3">
            <Link
              to={{
                pathname: `/shop/orders/${props.reference}`,
                props,
              }}
            >
              {props.reference} {format("USD", props.total_in_ngn)}
            </Link>
            <p className="app-my-0">{data.status}</p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <Container bread={nav}>
      <div className="container">
        <div className="row">
          <div className="col l4 s12">
            <ul className="collection">
              <li className="collection-item">
                <img src={Order} className="responsive-img" />
              </li>
            </ul>
          </div>
          <div className="col l8 s12">
            <ListComponent {...{ list, callback }} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default OrdersListPage;
