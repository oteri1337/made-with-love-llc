import React from "react";
import ContainerComponent from "components/container/TourContainerComponent";

function PrivacyPage() {
  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Consumer Data Privacy Policy",
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="container app-py-3">
        <div className="card-panel">
          <div className="container">
            <b>Data Policy</b>
            <p>
              Data inludes information provided when placing amn order, We do
              not sell user data to third parties and we do not use user data
              for our own profit.
            </p>
            <br />

            <b>Cookie Policy</b>
            <p>
              A cookie is a small piece of data stored on a user's browser, we
              only use cookies to maintain a user's session.
            </p>

            <br />
            <b>Advertisement Policy</b>
            <p>
              We have no paid promotional content or advertisement on our
              website or third party ad networks. We do not target users with
              ads.
            </p>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default PrivacyPage;
