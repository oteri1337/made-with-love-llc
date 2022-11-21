import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function AdminHomePage() {
  const nav = [
    {
      label: "Control Panel",
    },
  ];

  return (
    <AdminContainerComponent bread={nav}>
      <ul className="collection">
        <li className="collection-item">
          <Link to="/control/products/index.html" className="app-list-link">
            <span className="material-icons notranslate">shopping_cart</span>
            <b>Products</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/orders/list.html" className="app-list-link">
            <span className="material-icons notranslate">airport_shuttle</span>
            <b>Orders</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/users/list.html" className="app-list-link">
            <span className="material-icons notranslate">
              supervised_user_circle
            </span>
            <b>Users</b>
          </Link>
        </li>
      </ul>
    </AdminContainerComponent>
  );
}

export default AdminHomePage;
