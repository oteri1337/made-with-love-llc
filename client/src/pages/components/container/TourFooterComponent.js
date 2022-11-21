import React from "react";

function Footer() {
  return (
    <footer className="bg center">
      <div className=" row app-py-3">
        <div className="container" style={{ fontSize: "16px" }}>
          <div className="col l6 s12 offset-l3 center">
            <span className="material-icons notranslate">phone</span>
            <span>+1 (307) 201 9038</span>
            <br />
            <br />

            <span className="material-icons notranslate">mail</span>
            <span>oteri@madewithlovellc.net</span>
            <br />
            <br />

            <span className="material-icons notranslate">location_on</span>
            <span>30 North Gould Street, Sheridan, WY 82801, USA.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
