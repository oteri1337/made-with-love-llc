import React from "react";
import { AppContext } from "providers/AppProvider";

function ThemeChangerNavComponent() {
  const { callReducer } = React.useContext(AppContext);

  return (
    <React.Fragment>
      <li>
        <a className="dropdown-trigger" data-target="themer">
          Theme
        </a>
      </li>
      <ul id="themer" className="dropdown-content">
        <li>
          <a
            id="en"
            onClick={() =>
              callReducer({ dispatch: "UPDATE_THEME", data: "LIGHT" })
            }
          >
            LIGHT
          </a>
        </li>
        <li>
          <a
            id="en"
            onClick={() =>
              callReducer({ dispatch: "UPDATE_THEME", data: "DARK" })
            }
          >
            DARK
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default ThemeChangerNavComponent;
