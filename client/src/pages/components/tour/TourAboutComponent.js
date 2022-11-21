import React from "react";
import { Link } from "react-router-dom";
import Image1 from "assets/images/Image1.jpg";

function TourAboutComponent() {
  return (
    <section className="row app-my-0 bg bg-secondary app-py-3 app-mobile-center">
      <div className="container">
        <div className="app-my-2 col l6 s12 wow fadeInUp">
          <h2 className="app-mobile-center">About Trader Fx</h2>
          <b>
            Trader Fx is a platform for the future of funding that powers easy
            bitcoin exchange and transaction
          </b>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything.
          </p>
          <p>
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true
            generator.
          </p>
          <Link to="/contact.html" className="btn">
            Contact Us
          </Link>
          <a
            href="https://www.youtube.com/watch?v=Gc2en3nHxA4"
            target="_blank"
            className="btn btn-secondary"
          >
            <i className="material-icons notranslate">play_circle_filled</i>
            Watch Video About Bitcoin
          </a>
        </div>
        <div className="app-my-2 col l6 s12 wow fadeInUp" data-wow-delay="0.2s">
          <br />
          <br />
          <img src={Image1} style={{ height: "45vh", width: "100%" }} />
          <div style={{ marginTop: "-10px" }}>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <p>Tarek Sumch - C. E. O, Trade_Fx</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourAboutComponent;
