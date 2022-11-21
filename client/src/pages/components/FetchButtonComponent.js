import React from "react";
import FormComponent from "./FormComponent";
import { sendRequestThenDispatch } from "hooks";

function FetchButtonComponent({ text, url, type, dispatch, body, className }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

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

  const onSubmit = () => {
    callBack(url, dispatch, body, undefined, type, errors, message);
  };

  return (
    <FormComponent
      {...{ text, fetching, onSubmit, className, errors, message }}
    />
  );
}

export default FetchButtonComponent;
