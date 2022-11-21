import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

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
    link: "/control/parentgroups/list.html",
  },
  {
    label: "Create",
  },
];

function ProductGroupsCreatePage(props) {
  const { request, callBack } = sendRequestThenDispatch();

  const formArray = [
    {
      id: "name",
    },
  ];

  const onSuccess = () => {
    props.history.push("/control/parentgroups/list.html");
  };

  const onSubmit = async (body) => {
    callBack("/api/parentgroups", "UPDATE_PARENTGROUP", body, onSuccess);
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent {...{ request, formArray, onSubmit }} />
      </div>
    </AdminContainerComponent>
  );
}

export default ProductGroupsCreatePage;
