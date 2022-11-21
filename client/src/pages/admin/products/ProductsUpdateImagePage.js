import React from "react";
import { getRequestThenDispatch, sendFormRequestThenDispatch } from "hooks";
import UncontrolledFormComponent from "components/UncontrolledFormComponent";
import ContainerComponent from "components/container/AdminContainerComponent";

function ProductsUpdateImagePage({ location, history, match }) {
  const dispatch = "UPDATE_PRODUCT";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/products/${slug}`, dispatch);
  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.products.object[slug] || location.data;

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
      label: "Update Image",
    },
  ];

  const formObjects = [
    {
      id: "image",
      type: "file",
    },
  ];

  const initialState = [
    {
      key: "id",
      value: data?.id,
    },
  ];

  const onSuccess = () => {
    history.push(`/control/products/${data.slug}`);
  };

  const callback = async (body) => {
    console.log(body);
    callBack("/api/products/image", dispatch, body, onSuccess);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <UncontrolledFormComponent
          {...{
            formObjects,
            initialState,
            callback,
            fetching,
            errors,
            message,
          }}
        />
      </div>
    </ContainerComponent>
  );
}

export default ProductsUpdateImagePage;
