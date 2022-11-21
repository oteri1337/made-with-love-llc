import React from "react";
import { sendRequestThenDispatch } from "hooks";

function SecondaryButtonComponent(props) {
  const { endpoint, type = "POST", dispatch, body, title = "", icon } = props;
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching } = request;

  if (fetching) {
    return (
      <div className="secondary-content">
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onClick = (e) => {
    e.preventDefault();
    const sure = confirm(props.message ?? "are you sure?");
    if (sure) {
      callBack(endpoint, dispatch, body, undefined, type);
    }
  };

  return (
    <a className="secondary-content" onClick={onClick} title={title ?? ""}>
      <i className="material-icons"> {icon || "delete"}</i>
    </a>
  );
}

export default SecondaryButtonComponent;
