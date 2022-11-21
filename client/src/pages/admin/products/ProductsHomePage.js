import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function MusicHomePage() {
  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Products",
    },
  ];

  return (
    <AdminContainerComponent bread={nav}>
      <ul className="collection">
        <li className="collection-item">
          <Link to="/control/products/list.html" className="black-text">
            <span className="material-icons notranslate">shopping_cart</span>
            <b>List</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/parentgroups/list.html" className="black-text">
            <span className="material-icons notranslate">shopping_cart</span>
            <b>Categories</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/productgroups/list.html" className="black-text">
            <span className="material-icons notranslate">shopping_cart</span>
            <b>Sub Categories</b>
          </Link>
        </li>
      </ul>
    </AdminContainerComponent>
  );
}

export default MusicHomePage;
