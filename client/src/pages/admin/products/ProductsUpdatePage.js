import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function MusicUpdatePage({ match, location, history }) {
  const { slug } = match.params;
  const { request, callBack, state } = sendRequestThenDispatch();

  const data = state.products.object[slug] || location.item;

  if (data === undefined && get.request.fetching) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">Fetching Data ...</div>
      </AdminContainerComponent>
    );
  }

  if (data === undefined && !get.request.fetching) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">Data Not Found</div>
      </AdminContainerComponent>
    );
  }

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
      link: "/control/products/list.html",
    },
    {
      label: `${data.title}`,
      link: `/control/products/${data.slug}`,
    },
    {
      label: "Update",
    },
  ];

  const formArray = [
    {
      id: "title",
    },
    {
      id: "price",
      type: "number",
    },
    {
      id: "min_order",
      type: "number",
    },
    {
      id: "max_order",
      type: "number",
    },
    {
      id: "description",
      type: "textarea",
    },
  ];

  const initialState = {
    ...data,
  };

  const onSuccess = () => {
    history.push(`/control/products/${data.slug}`);
  };

  const onSubmit = (body) => {
    callBack("/api/products", "UPDATE_PRODUCT", body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          initialState={initialState}
          formArray={formArray}
          onSubmit={onSubmit}
          fetching={request.fetching}
          errors={request.errors}
          message={request.message}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default MusicUpdatePage;
