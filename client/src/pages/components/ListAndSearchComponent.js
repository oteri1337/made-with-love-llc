import React from "react";
import ListComponent from "./ListComponent";
import SearchComponent from "./SearchComponent";

function ListAndSearchComponent({
  list,
  callback,
  dispatch,
  endpoint,
  fetching,
}) {
  endpoint = endpoint + "/search";
  return (
    <div>
      <SearchComponent {...{ dispatch, endpoint }} />
      <ListComponent {...{ list, callback, dispatch, fetching }} />
    </div>
  );
}

export default ListAndSearchComponent;
