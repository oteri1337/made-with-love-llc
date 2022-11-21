import React from "react";
import { sendFormRequestThenDispatch } from "hooks";
import UncontrolledFormComponent from "components/UncontrolledFormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function SongCreatePage(props) {
  const { request, callBack } = sendFormRequestThenDispatch();

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
      label: "Create",
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

  const onSuccess = () => {
    props.history.push(`/control/products/list.html`);
  };

  const onSubmit = async (body) => {
    callBack("/api/products", "UPDATE_PRODUCT", body, onSuccess);
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <UncontrolledFormComponent
          formObjects={formArray}
          callback={onSubmit}
          fetching={request.fetching}
          errors={request.errors}
          message={request.message}
          text="Upload"
        />
      </div>
    </AdminContainerComponent>
  );
}

export default SongCreatePage;
