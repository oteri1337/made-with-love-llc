import React from "react";
import ContainerComponent from "components/container/TourContainerComponent";

function PrivacyPage() {
  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Data Security Policy",
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="container app-py-3">
        <div className="card-panel">
          <div className="container">
            <p>
              We do not store your payment information such as credit/debit card
              information.
            </p>

            <p>
              We only store information required for delivery such as address,
              email and phone number.
            </p>

            <p> Payments are processed securely by a trusted third party.</p>

            <p>
              All communication with this website is done over an encrypted
              protocol (https).
            </p>

            <p>We do not sell your data to third parties.</p>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default PrivacyPage;
