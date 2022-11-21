import React, { Fragment } from "react";
import PaginationComponent from "./PaginationComponent";
import ListDefaultComponent from "./ListDefaultComponent";

function ListComponent(props) {
  const list = props.list || {};
  const data = list.data || list.array || props.array || [];

  const dispatch = props.dispatch || "";
  const fetching = props.fetching || false;
  const empty = props.empty || "No Data Found";

  const renderSpinner = () => {
    if (fetching) {
      return (
        <div className="container">
          <div className="app-px-3">
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
        </div>
      );
    }
  };

  const callback =
    props.callback ||
    function (props) {
      return <ListDefaultComponent {...props} key={props.id} />;
    };

  const list_items = data.map(callback);

  const renderList = () => {
    if (props.style == "none") {
      return list_items;
    }

    return <ul className="collection">{list_items}</ul>;
  };

  if (data.length === 0 && !fetching) {
    return (
      <Fragment>
        <ul className="collection">
          <li className="collection-item">
            <p id="no-data" style={{ textAlign: "center" }}>
              <span>{empty}</span>
            </p>
          </li>
        </ul>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {renderSpinner()}
      {renderList()}
      <PaginationComponent list={list} dispatch={dispatch + "_PAGE"} />
    </Fragment>
  );
}

export default ListComponent;
