import React from "react";
import { Link } from "react-router-dom";

function TourGetStartedComponent() {
  return (
    <section className="bg bg-secondary app-py-3 center">
      <span
        className="wow fadeInUp slow alt-color"
        style={{ fontSize: "19px" }}
      >
        Cash Out Your Coins{" "}
      </span>
      <div className="container">
        <div className="row">
          <div className="app-my-2 app-px-3 col l4 s12 wow fadeInUp slow">
            <i
              className="flaticon-money-1 alt-color"
              style={{ fontSize: "60px" }}
            ></i>
            <h3 className="alt-color">Give Us The Details</h3>
            Simply decide how much you'd like to sell and tell us which bank
            account to transfer your payout to
            <br />
            <br />
          </div>
          <div
            className="app-my-2 app-px-3 col l4 s12 wow fadeInUp slow"
            data-wow-delay="0.2s"
          >
            <i
              className="flaticon-secure-shield alt-color"
              style={{ fontSize: "60px" }}
            ></i>
            <h3 className="alt-color">Send The Coins</h3>
            Send the exact amount of coins entered to the wallet address
            provided in a single transaction
            <br />
            <br />
          </div>
          <div
            className="app-my-2 app-px-3 col l4 s12 wow fadeInUp slow"
            data-wow-delay="0.4s"
          >
            <i
              className="flaticon-wallet alt-color"
              style={{ fontSize: "60px" }}
            ></i>
            <h3 className="alt-color">Recieve Your Cash</h3>
            Once we receive your coins, we will transfer the payout amount to
            the bank account you provided.
            <br />
            <br />
          </div>
        </div>

        <div className="wow fadeInUp slow">
          <br />
          <Link
            to="/transactions/sell.html"
            className="btn"
            style={{ backgroundColor: "#2e5067" }}
          >
            Sell Your Coins Now
          </Link>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
}

export default TourGetStartedComponent;
