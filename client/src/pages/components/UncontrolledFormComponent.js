import React from "react";
import FormTemplateComponent from "./FormTemplateComponent";
import SubmitComponent from "./SubmitComponent";
import MessageComponent from "./MessageComponent";

const getFormData = (event, formObjects = [], callback, is = []) => {
  event.preventDefault();

  const formdata = new FormData();

  formObjects.forEach((formObject) => {
    if (formObject.type == "file") {
      formdata.append(formObject.id, formObject.ref.current.files[0]);
    } else if (formObject.type == "select") {
      formdata.append(formObject.id, formObject.value || "");
    } else {
      formdata.append(formObject.id, formObject.ref.current.value || "");
    }
  });

  if (is.length) {
    is.forEach((i) => {
      formdata.append(i.key, i.value);
    });
  }

  const callBack = callback || function () {};

  callBack(formdata);
};

function UncontrolledFormComponent(props) {
  let formObjects = props.formObjects || [];
  let initialState = props.initialState || {};

  formObjects.forEach((formObject) => {
    if (formObject.type == "select") {
      formObject.value = formObject.options[0].value;
    }
    formObject.ref = React.useRef();
  });

  return (
    <form
      onSubmit={(event) =>
        getFormData(event, formObjects, props.callback, initialState)
      }
      encType="multipart/form-data"
    >
      <FormTemplateComponent formObjects={formObjects} />
      <SubmitComponent
        text={props.text || "Submit"}
        fetching={props.fetching || false}
        className={props.className}
      />
      <MessageComponent
        errors={props.errors || []}
        message={props.message || ""}
      />
    </form>
  );
}

export default UncontrolledFormComponent;
