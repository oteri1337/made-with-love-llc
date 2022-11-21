import React from "react";
import { getRequestThenDispatch } from "providers/AppProvider";

const SearchComponent = ({ endpoint = "", dispatch = "" }) => {
  const [search, setSearch] = React.useState("Search");
  const { refreshing, send } = getRequestThenDispatch();

  const onSubmit = async () => {
    send(`${endpoint}/${search}`, dispatch);
  };

  // React.useLayoutEffect(() => {
  //   let elems = document.querySelectorAll(".autocomplete");

  //   let options = { data };

  //   options.onAutocomplete = function(search) {
  //     onSubmit({ search });
  //   };

  //   if (window.M) {
  //     M.Autocomplete.init(elems, options);
  //   }
  // });

  return (
    <div style={{ marginLeft: "1rem", marginRight: "2rem" }}>
      {refreshing && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="input-field">
          <input
            value={search}
            type="search"
            id="autocomplete-input"
            className="autocomplete"
            style={{ paddingLeft: "1rem" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span
            className="material-icons notranslate"
            style={{ verticalAlign: "middle" }}
            onClick={onSubmit}
          >
            search
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
