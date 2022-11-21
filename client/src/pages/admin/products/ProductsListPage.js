import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

const format = (currency, amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

function ProductsListPage() {
  const dispatch = "UPDATE_PRODUCTS";
  const endpoint = "/api/products";
  const { state } = getRequestThenDispatch(endpoint, dispatch);

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Products",
      link: "/control/products/index.html",
    },
    {
      label: "List",
    },
  ];

  const callback = (item) => {
    const pathname = `/control/products/${item.slug}`;
    return (
      <li key={item.id} className="collection-item app-item avatar ">
        <img src={`/uploads/images/${item.image_one}`} className="circle" />
        <SecondaryButtonComponent
          type="DELETE"
          title="Delete Rate"
          dispatch="UPDATE_PRODUCTS"
          endpoint={endpoint}
          body={{ id: item.id }}
        />
        <Link to={{ pathname, item }} className="app-link-list">
          {item.title}
        </Link>
        <p className="desc-text">{format("NGN", item.price)}</p>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent
        endpoint={endpoint + "/search"}
        dispatch={dispatch}
        label="Search"
        data={state.products.search_keys}
      />
      <ListComponent
        list={state.products}
        dispatch={`${dispatch}`}
        callback={callback}
      />
      <FloatingButtonComponent
        title="Add Product"
        to="/control/products/create.html"
      />
    </AdminContainerComponent>
  );
}

export default ProductsListPage;
