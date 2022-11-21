import React from "react";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransition";

function MessageComponent(props) {
  let errors = props.errors || [];
  let message = props.message || "";

  if (message.length) {
    return (
      <ReactCSSTransitionGroup
        classNames="fade"
        in={true}
        appear={true}
        timeout={600}
      >
        <React.Fragment>
          <div
            className="green lighten-4 card-panel black-text app-my-1"
            style={{ overflowWrap: "break-word" }}
          >
            {message}
          </div>
          <br />
        </React.Fragment>
      </ReactCSSTransitionGroup>
    );
  }

  if (!errors.length) {
    return <React.Fragment />;
  }

  errors = props.errors.map((error) => (
    <React.Fragment key={error}>
      <span>{error}</span>
      <br />
    </React.Fragment>
  ));
  return (
    <ReactCSSTransitionGroup
      classNames="fade"
      in={true}
      appear={true}
      timeout={500}
    >
      <React.Fragment>
        <div className="red black-text lighten-4 card-panel app-my-1">
          {errors}
        </div>
      </React.Fragment>
    </ReactCSSTransitionGroup>
  );
}

export default MessageComponent;
