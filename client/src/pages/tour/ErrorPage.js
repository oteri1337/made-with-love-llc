import React from "react";
import { useHistory } from "react-router-dom";
import ContainerComponent from "components/container/TourContainerComponent";

function ErrorPage() {
  const history = useHistory();

  const onClick = () => {
    try {
      history.goBack();
    } catch (e) {
      history.push("/");
    }
  };

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "404 Error",
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="container">
        <br />
        <a onClick={onClick}>Go Back</a>
        <div className="card-panel ">
          <div className="container">
            <h1>404 Error</h1>
            <p>Resource Not Found</p>
          </div>
        </div>
        <br />
      </div>
    </ContainerComponent>
  );
}

export default ErrorPage;
