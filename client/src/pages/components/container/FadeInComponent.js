import React from "react";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

function FadeInComponent(props) {
  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
    >
      {props.children}
    </ReactCSSTransitionGroup>
  );
}

export default FadeInComponent;
