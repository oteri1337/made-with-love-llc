import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";

function CompleteTransactionComponent({ id }) {
  const { callBack, request } = sendRequestThenDispatch();
  const { errors, fetching, message } = request;

  const text = "Complete Transaction";

  const initialState = { id };

  const onSuccess = () => {
    console.log("successful");
  };

  const onSubmit = (body) => {
    const sure = confirm("are you sure you want to complete this transaction?");
    if (sure) {
      callBack(
        "/api/transactions/complete",
        "UPDATE_TRANSACTION",
        body,
        onSuccess,
        "PATCH"
      );
    }
  };

  return (
    <FormComponent
      {...{ text, initialState, onSubmit, errors, fetching, message }}
    />
  );
}

export default CompleteTransactionComponent;
