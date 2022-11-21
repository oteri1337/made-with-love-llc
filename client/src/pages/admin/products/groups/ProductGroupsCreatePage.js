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
    label: "Sub Categories",
    link: "/control/productgroups/list.html",
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
    props.history.push("/control/productgroups/list.html");
  };

  const onSubmit = async (body) => {
    callBack("/api/groups", "UPDATE_GROUP", body, onSuccess);
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
