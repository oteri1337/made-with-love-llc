import React from "react";
import FormComponent from "components/FormComponent";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function ProductGroupsUpdatePage({ location, match, history }) {
  const dispatch = "UPDATE_GROUP";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/groups/${slug}`, dispatch);
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.groups.object[slug] || location.item;

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
      label: "Sub Categories",
      link: "/control/productgroups/list.html",
    },
    {
      label: data?.name ?? "",
    },
  ];

  const formArray = [
    {
      id: "name",
    },
  ];

  const initialState = {
    id: data?.id,
    name: data?.name,
  };

  const onSuccess = () => {
    history.push("/control/productgroups/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/groups", dispatch, body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{ formArray, initialState, fetching, errors, message, onSubmit }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default ProductGroupsUpdatePage;
