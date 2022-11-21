import React, { Fragment } from "react";

function FormTemplateComponent(props) {
  const formObjects = props.formObjects || [];
  return formObjects.map((f) => {
    if (f.type == undefined || f.type == "password" || f.type == "email") {
      return (
        <div key={f.id} className="input-field">
          <label htmlFor={f.id}>{f.label || f.id.replace(/_/g, " ")}</label>
          <input
            type={f.type || "text"}
            ref={f.ref}
            id={f.id}
            name={f.id}
            required
            className="validate"
          />
        </div>
      );
    }

    // if (f.type == "text") {
    //   return <p>{f.text}</p>;
    // }

    if (f.type == "checkbox") {
      return (
        <p>
          <label>
            <input type="checkbox" id={f.id} name={f.id} ref={f.ref} />
            <span>{f.label || f.id.replace(/_/g, " ")}</span>
          </label>
        </p>
      );
    }

    if (f.type == "number") {
      return (
        <div key={f.id}>
          <label>{f.label || f.id.replace(/_/g, " ")}</label>
          <input
            key={f.id}
            type="number"
            placeholder={f.id}
            ref={f.ref}
            id={f.id}
            name={f.id}
            defaultValue={f.defaultValue || ""}
            min={f.min || ""}
            max={f.max || ""}
            required
          />
        </div>
      );
    }

    if (f.type == "file") {
      return (
        <div key={f.id}>
          <div className="file-field input-field">
            <div className="btn btn-secondary">
              <span>{f.id}</span>
              <input type="file" ref={f.ref} id={f.id} name={f.id} required />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
      );
    }

    if (f.type == "textarea") {
      return (
        <div key={f.id}>
          <label>{f.label || f.id.replace(/_/g, " ")}</label>
          <textarea
            type={f.type}
            ref={f.ref}
            id={f.id}
            name={f.id}
            className="materialize-textarea"
            required
          />
        </div>
      );
    }

    if (f.type == "select") {
      const options = f.options || [];
      return (
        <select
          key={f.id}
          id={f.id}
          name={f.id}
          className="browser-default"
          onChange={(e) => (f.value = e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.value || o.label}
            </option>
          ))}
          ;
        </select>
      );
    }
  });
}

export default FormTemplateComponent;
