import React from "react";
import { Link } from "react-router-dom";

function FloatingButtonComponent(props) {

  React.useLayoutEffect(() => {
    var elems = document.querySelectorAll('.tap-target');
    M.TapTarget.init(elems, {});

    var elem = document.querySelector('.tap-target');
    var instance = M.TapTarget.getInstance(elem);
    instance.open();

    setTimeout(() => { instance.close() }, 1000);

  }, []);

  return (
    <div className="fixed-action-btn">
      <Link
        to={{ pathname: props.to || "/", data: props.data || {} }}
        title={props.title || ""}
        className="btn-floating btn-large"
        id="btn"
      >
        <i className="large material-icons notranslate">add</i>
      </Link>
      <div className="tap-target" data-target="btn">
        <div className="tap-target-content">
          <h5>{props.message || props.title || ""}</h5>
        </div>
      </div>
    </div>
  );
}

export default FloatingButtonComponent;
