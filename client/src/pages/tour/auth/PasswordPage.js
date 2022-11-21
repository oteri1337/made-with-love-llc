import React from "react";
import { useRequest } from "hooks";
import Form from "components/FormComponent";
import RequestPinComponent from "components/container/RequestPinComponent";
import TourContainerComponent from "components/container/TourContainerComponent";

function PasswordPage() {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { refreshing, response, start, end, sendRequest } = useRequest();

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Reset Password",
    },
  ];

  const formArray = [
    {
      id: "pin",
    },
    {
      id: "new_password",
      type: "password",
    },
    {
      id: "new_password_confirmation",
      type: "password",
    },
  ];

  const onSent = (email) => {
    setSent(true);
    setEmail(email);
  };

  const onSubmit = async (body) => {
    body = { ...body, email };
    start();
    const resp = await sendRequest("/api/users/auth/password", body);
    end(resp);
  };

  const renderForm = () => {
    if (sent) {
      return <Form {...{ formArray, onSubmit, refreshing, response }} />;
    }
    return <RequestPinComponent onSent={onSent} />;
  };

  return (
    <TourContainerComponent bread={nav}>
      <div className="row app-mt-1 ">
        <div className="col s12 m12 l6 offset-l3">
          <div className="card-panel">
            <center>{renderForm()}</center>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default PasswordPage;
