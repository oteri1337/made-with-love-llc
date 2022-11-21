import React from "react";
import Icon1 from "assets/images/Icon1.png";
import Icon2 from "assets/images/Icon2.png";
import Icon3 from "assets/images/Icon3.png";
import Icon4 from "assets/images/Icon4.png";
import Icon5 from "assets/images/Icon5.png";
import Icon6 from "assets/images/Icon6.png";
import Icon7 from "assets/images/Icon7.png";
import Icon8 from "assets/images/Icon8.png";

function PressComponent() {
  return (
    <section className="bg bg-secondary app-py-3">
      <div className="container">
        <center>
          <div className="app-flex">
            <div className="app-flex-l3">
              <img src={Icon1} />
            </div>

            <div className="app-flex-l3">
              <img src={Icon2} />
            </div>

            <div className="app-flex-l3">
              <img src={Icon3} />
            </div>

            <div className="app-flex-l3">
              <img src={Icon4} />
            </div>
          </div>
          <br />
          <div className="app-flex">
            <div className="app-flex-l3">
              <img src={Icon5} />
            </div>

            <div className="app-flex-l3">
              <img src={Icon6} />
            </div>

            <div className="app-flex-l3">
              <img src={Icon7} />
            </div>

            <div className="app-flex-l3">
              <img src={Icon8} />
            </div>
          </div>
        </center>
      </div>
    </section>
  );
}

export default PressComponent;
