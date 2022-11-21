import React from "react";
import { Link } from "react-router-dom";

function TourSliderThreeComponent() {
  return (
    <div className="app-mobile-center app-vh">
      <div className="container">
        <div className="container-50">
          <br />
          <h1 className="app-slider-title ">
            Skip Waiting, Buy Your <span className="app-orange">Coins </span>
            Now
          </h1>
          <br />
          <p className="app-slider-caption ">
            Buy cryptocurrencies at any time without endless verifications, pay
            with your Debit Card or Bank Transfer.
          </p>
          <br />
          <Link to="/transactions/buy.html" className="btn btn-alt">
            BUY BITCOINS NOW
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TourSliderThreeComponent;
