import React from "react";
import { Link } from "react-router-dom";

function TourSliderOneComponent() {
  return (
    <div className="center app-mobile-center">
      <div className="container-50" style={{ margin: "auto" }}>
        <br />
        <h1 className="app-slider-title">
          Selling your <span className="app-orange">Coins</span> has never been
          easier
        </h1>
        <br />
        <p className="app-slider-caption ">
          Simply decide how much you'd like to sell, tell us which bank account
          to transfer your payout to, and send us your coins. We'll take care of
          the rest.
        </p>
        <br />
        <Link to="/transactions/sell.html" className="btn btn-alt">
          SELL BITCOINS NOW
        </Link>
      </div>
    </div>
  );
}

export default TourSliderOneComponent;
