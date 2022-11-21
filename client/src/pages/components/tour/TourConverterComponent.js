import React from "react";
import { sendRequest } from "functions/http";
import Image2 from "assets/images/Image2.png";

function BitcoinConverterComponent() {
  const [state, setState] = React.useState({
    body: {
      name: "",
      email: "",
      subject: "",
      body: "",
    },
    response: {
      errors: [],
      data: {},
    },
    fetching: false,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, fetching: true, response: { errors: [], data: {} } });
    let response = await sendRequest("/api/contact", "POST", state.body);
    setState({ ...state, fetching: false, response });
  };

  const onChange = (event) => {
    setState({
      ...state,
      body: {
        ...state.body,
        [event.target.id]: event.target.value,
      },
    });
  };

  return (
    <section className="bg bg-secondary image-left">
      <div className="container wow fadeInUp slow">
        <div className="center">
          <h2 className="app-my-0">
            Quick Bitcoin <b className="btn-color">Converter</b>
          </h2>
          <p className="container">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum.
          </p>
          <br />
          <br />
        </div>

        <div className="row">
          <div className="col l4 s12">
            <img src={Image2} className="responsive-img" />
          </div>
          <div className="col l8 s12">
            <form onSubmit={onSubmit}>
              <div className="row app-py-0">
                <div className="col l6 s12">
                  <div className="input-field">
                    <label>BTC</label>
                    <input
                      type="text"
                      id="name"
                      value={state.body.name}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="col l6 s12">
                  <div className="input-field">
                    <label>USD</label>
                    <input
                      type="email"
                      id="email"
                      value={state.body.email}
                      onChange={onChange}
                      required
                      className="validate"
                    />
                  </div>
                </div>
              </div>
            </form>
            <b>How it works?</b>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here'.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BitcoinConverterComponent;
