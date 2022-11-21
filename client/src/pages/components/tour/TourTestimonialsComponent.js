import React from "react";
import Vector4 from "assets/images/Image9.jpg";

function SubscribeComponent() {
  return (
    <section className="bg bg-secondary app-py-3 app-px-2 ">
      <div className="container wow fadeInUp slow">
        <div className="row">
          <h2 className="center">
            What our clients <b className="btn-color">say about us.</b>
          </h2>
          <p className="center container">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum.
          </p>
          <div className="app-my-2 col l4 s12 wow fadeInUp">
            <div className="card-panel hoverable">
              <div className="app-flex">
                <div className="app-flex-1">
                  <img
                    src={Vector4}
                    className="circle"
                    style={{ width: "56px", height: "56px" }}
                  />
                </div>
                <div className="app-flex-3">
                  <b>John Doe</b>
                  <br />
                  <small>
                    Co-founder of Microsoft, American business management
                  </small>
                </div>
              </div>
              <p className="s-font-alt">
                “ If you are going to use a passage of Lorem Ipsum, you need to
                be sure there isn't anything embarrassing hidden in the middle
                of text. ”
              </p>
            </div>
          </div>
          <div
            className="app-my-2 col l4 s12 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div className="card-panel  hoverable">
              <div className="app-flex">
                <div className="app-flex-1">
                  <img
                    src={Vector4}
                    className="circle"
                    style={{ width: "56px", height: "56px" }}
                  />
                </div>
                <div className="app-flex-3">
                  <b>John Doe</b>
                  <br />
                  <small>
                    Co-founder of Microsoft, American business management
                  </small>
                </div>
              </div>
              <p className="s-font-alt">
                “ If you are going to use a passage of Lorem Ipsum, you need to
                be sure there isn't anything embarrassing hidden in the middle
                of text. ”
              </p>
            </div>
          </div>
          <div
            className="app-my-2 col l4 s12 wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <div className="card-panel  hoverable">
              <div className="app-flex">
                <div className="app-flex-1">
                  <img
                    src={Vector4}
                    className="circle"
                    style={{ width: "56px", height: "56px" }}
                  />
                </div>
                <div className="app-flex-3">
                  <b>John Doe</b>
                  <br />
                  <small>
                    Co-founder of Microsoft, American business management
                  </small>
                </div>
              </div>
              <p className="s-font-alt">
                “ If you are going to use a passage of Lorem Ipsum, you need to
                be sure there isn't anything embarrassing hidden in the middle
                of text. ”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscribeComponent;
