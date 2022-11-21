import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function RatesUpdatePage({ history, match }) {
  const { id } = match.params;

  const { state, callBack, request } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const initialState = state.rates.object[id];

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Rates",
      link: "/control/rates/list.html",
    },
    {
      label: "Update",
    },
  ];

  const formArray = [
    {
      id: "cryptoId",
      label: "Crypto Currency",
      type: "select",
      options: [
        {
          value: 1,
          label: "Bitcoin",
        },
        {
          value: 2,
          label: "Ethereum",
        },
      ],
    },

    {
      id: "lower_limit",
      type: "number",
      prefix: "$",
    },
    {
      id: "upper_limit",
      type: "number",
      prefix: "$",
      required: false,
    },
    {
      id: "rate",
      type: "number",
      prefix: "NGN",
    },
    {
      id: "type",
      type: "select",
      options: [
        {
          value: 1,
          label: "Sell Rate",
        },
        {
          value: 2,
          label: "Buy Rate",
        },
      ],
    },
  ];

  const onSuccess = () => {
    history.push("/control/rates/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/rates", "UPDATE_RATE", body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{ formArray, onSubmit, initialState, fetching, errors, message }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default RatesUpdatePage;
