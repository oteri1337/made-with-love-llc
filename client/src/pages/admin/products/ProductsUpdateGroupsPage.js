import React from "react";
import FormComponent from "components/FormComponent";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function ProductsUpdateCategoryPage({ location, match, history }) {
  const { slug } = match.params;
  getRequestThenDispatch("/api/groups", "UPDATE_GROUPS");
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, fetching, message } = request;

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
      label: "Update Categories",
    },
  ];

  const allSelected = data.groups;
  const allGroups = state.groups.array;
  const allSelectedIdArray = allSelected?.map((obj) => obj.id);

  let formArray = allGroups?.map(({ id, name }) => {
    if (allSelectedIdArray?.indexOf(id) >= 0) {
      return { id, label: name, type: "checkbox", checked: true };
    }

    return { id, label: name, type: "checkbox" };
  });

  const initialState = {};

  allSelectedIdArray?.forEach((id) => {
    initialState[id] = true;
  });

  const onSuccess = () => {
    history.push(`/control/products/${data.slug}`);
  };

  const onSubmit = (submitted) => {
    const groups = Object.keys(submitted).filter((key) => {
      if (submitted[key] == true) return true;
    });

    const body = {
      id: data.id,
      groups,
    };

    callBack("/api/products/sync", "UPDATE_PRODUCT", body, onSuccess, "PATCH");
  };

  const text = "Update";

  return (
    <AdminContainerComponent bread={nav || []}>
      <div className="card-panel">
        <FormComponent
          {...{
            text,
            errors,
            message,
            fetching,
            onSubmit,
            formArray,
            initialState,
          }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default ProductsUpdateCategoryPage;
