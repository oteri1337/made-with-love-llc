import React from "react";
import { Link } from "react-router-dom";

function TourWalletComponent() {
  return (
    <section className="bg app-py-3 center">
      <div className="container-50" style={{ margin: "auto" }}>
        <h2 className="wow fadeInUp slow">
          Buy And Store Your Coins In One Place
        </h2>
        <p className="wow fadeInUp slow">
          Buy, Sell, Send, and Recieve Bitcoin, Ethereum and Tether (USDT) with
          your Traderfx Wallet.
        </p>
        <br />
        <br />

        <div className="row">
          <div className="col l4 s4 wow fadeInUp slow">
            <h3 className="icon icon-btc coin"></h3>
            <br />
            Bitcoin
          </div>
          <div className="col l4 s4 wow fadeInUp slow" data-wow-delay="0.2s">
            <h3 className="icon icon-eth coin"></h3>
            <br />
            Ethereum
          </div>
          <div className="col l4 s4 wow fadeInUp slow" data-wow-delay="0.4s">
            <h3 className="icon icon-usdt coin"></h3>
            <br />
            Tether
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="wow fadeInUp slow">
        <Link to="/signup.html" className="btn">
          Create My Wallet
        </Link>
      </div>
    </section>
  );
}

export default TourWalletComponent;
