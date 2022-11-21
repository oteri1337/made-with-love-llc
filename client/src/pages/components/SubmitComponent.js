import React from "react";

function SubmitComponent(props) {
  const onClick = props.onClick || function() {};

  if (props.fetching) {
    return (
      <div>
        <br />
        <div id="fetching" className="preloader-wrapper active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="submit"
        className={props.className || "btn"}
        onClick={onClick}
      >
        {props.text || "Submit"}
      </button>
    </div>
  );
}

export default SubmitComponent;
