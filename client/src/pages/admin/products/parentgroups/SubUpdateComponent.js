import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";

function SubUpdateComponent({ data }) {
  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

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

    callBack(
      "/api/parentgroups/sync",
      "UPDATE_PARENTGROUP",
      body,
      onSuccess,
      "PATCH"
    );
  };

  return (
    <FormComponent {...{ formArray, onSubmit, errors, fetching, message }} />
  );
}

export default SubUpdateComponent;
