import React from "react";
import { sendRequest } from "functions/http";
import MessageComponent from "components/MessageComponent";
import SubmitComponent from "components/SubmitComponent";

function ContactComponent(props) {
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
      <div
        className=" wow fadeInUp slow"
        style={{ maxWidth: "70%", margin: "auto" }}
      >
        <div className="row">
          <div className="col l6 s12">
            <h2 className="app-slider-title">Contact</h2>
            <p>1355 Market Street, Suite 900 San Francisco, CA 94103</p>
            <p>Phone +1 (514) 352-1010</p>
            <p>Monday-Wednesday 10 am - 6 pm</p>
            <p>Thursday-Friday 10 am - 9 pm</p>
            <p>Saturday 9:30 am - 5 pm</p>
            <p>Sunday 12 pm - 5 pm</p>
          </div>
          <div className="col l6 s12"></div>
        </div>

        <h2 className="app-slider-title">By Email</h2>

        <form onSubmit={onSubmit}>
          <div className="row app-py-0">
            <div className="col l6 s12">
              <div className="input-field">
                <label>Name</label>
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
                <label>Email</label>
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
          <div className="row app-py-0">
            <div className="col l12 s12">
              <div className="input-field">
                <label>Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={state.body.subject}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="col l12 s12">
              <div className="input-field">
                <label>Body</label>
                <textarea
                  type="text"
                  id="body"
                  className="materialize-textarea"
                  value={state.body.body}
                  onChange={onChange}
                />
              </div>
            </div>

            <center>
              <SubmitComponent fetching={state.fetching} text="GET IN TOUCH" />
              <br />
              <br />
              <MessageComponent
                errors={state.response.errors}
                success={state.response.data}
              />
            </center>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactComponent;
