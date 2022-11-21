import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function ProductGroupsListPage() {
  const dispatch = "UPDATE_PARENTGROUPS";
  const endpoint = "/api/parentgroups";
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
      label: "Categories",
    },
  ];

  const callback = (item) => {
    const pathname = `/control/parentgroups/${item.slug}`;
    return (
      <li key={item.id} className="collection-item app-item avatar ">
        <SecondaryButtonComponent
          type="DELETE"
          title="Delete Rate"
          dispatch="UPDATE_PARENTGROUPS"
          endpoint={endpoint}
          body={{ id: item.id }}
        />
        <Link to={{ pathname, item }} className="app-link-list">
          {item.name}
        </Link>
        <p className="desc-text">{item.slug}</p>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent
        endpoint={endpoint + "/search"}
        dispatch={dispatch}
        label="Search"
        data={state.parentgroups.search_keys}
      />
      <ListComponent list={state.parentgroups} {...{ dispatch, callback }} />
      <FloatingButtonComponent
        title="Add Category"
        to="/control/parentgroups/create.html"
      />
    </AdminContainerComponent>
  );
}

export default ProductGroupsListPage;
