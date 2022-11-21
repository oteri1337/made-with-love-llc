import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";

function CompleteTransactionComponent({ id, status }) {
  const { callBack, request } = sendRequestThenDispatch();
  const { errors, fetching, message } = request;

  const text = "Update";

  const initialState = { id, status };

  const onSubmit = (body) => {
    callBack(
      "/api/nairatransactions",
      "UPDATE_NAIRATRANSACTION",
      body,
      null,
      "PATCH"
    );
  };

  const formArray = [
    {
      id: "status",
      type: "select",
      className: "  ",
      options: [
        {
          value: 1,
          label: "Pending",
        },
        {
          value: 2,
          label: "Completed",
        },
      ],
    },
  ];

  return (
    <FormComponent
      {...{
        text,
        initialState,
        onSubmit,
        errors,
        fetching,
        message,
        formArray,
      }}
    />
  );
}

export default CompleteTransactionComponent;
