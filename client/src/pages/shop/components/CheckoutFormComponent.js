import React from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "providers/AppProvider";
import FormComponent from "components/FormComponent";

function CheckoutFormComponent() {
  const history = useHistory();
  const { state, requestHook, callReducer } = React.useContext(AppContext);
  const { refreshing, response, send } = requestHook();

  const text = "CHECKOUT";

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "full_name",
    },
    {
      id: "phone_number",
    },
    {
      id: "delivery_address",
    },
  ];

  let initialState = {
    email: state.user?.email ?? "",
    full_name: state.user?.account_name ?? "",
    phone_number: state.user?.phone_number ?? "",
    delivery_address: state.user?.address ?? "",
  };

  if (state.user) {
    initialState.user_id = state.user.id;
  }

  const onSuccess = ({ data }) => {
    callReducer({ dispatch: "EMPTY_CART" });
    history.push(`/shop/orders/${data.reference}`);
  };

  const onSubmit = async (body) => {
    const newBody = { ...body, products: state.cart };
    send("/api/orders", "UPDATE_ORDER", newBody, "POST", onSuccess);
  };

  return (
    <center>
      <FormComponent
        {...{ formArray, initialState, text, refreshing, response, onSubmit }}
      />
    </center>
  );
}

export default CheckoutFormComponent;
