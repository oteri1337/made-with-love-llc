import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function BreadComponent(props) {
  const data = props.data || [];

  const renderTitle = () => {
    if (data.length) {
      return <Helmet title={`${data[data.length - 1].label} - ${PWA_NAME}`} />;
    }
  };

  const links = data.map((item) => {
    if (item.link) {
      return (
        <span key={item.label}>
          <Link to={item.link}>
            <b>{item.label}</b>
          </Link>
          <i className="material-icons notranslate">chevron_right</i>
        </span>
      );
    }

    return (
      <span className="capitalize contrast" key={item.label}>
        <b>{item.label}</b>
      </span>
    );
  });

  return (
    <section className="app-py-1 app-px-2">
      <div className={props.className || ""}>
        {renderTitle()}
        {links}
      </div>
    </section>
  );
}

export default BreadComponent;
