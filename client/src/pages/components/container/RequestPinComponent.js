import React from "react";
import { useRequest } from "hooks";
import Form from "components/FormComponent";

function RequestPinComponent({ onSent, url = "/api/users/auth/resendpin" }) {
  const { refreshing, response, start, end, sendRequest } = useRequest();

  const formArray = [
    {
      id: "email",
    },
  ];
  const text = "Reset";

  const onSubmit = async (body) => {
    start();
    const response = await sendRequest(url, body);
    end(response);
    if (!response.errors.length) {
      onSent(body.email);
    }
  };

  return <Form {...{ formArray, text, response, refreshing, onSubmit }} />;
}

export default RequestPinComponent;
