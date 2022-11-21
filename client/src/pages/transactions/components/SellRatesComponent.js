import React from "react";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";

function RatesListComponent() {
  const { state } = getRequestThenDispatch("/api/rates", "UPDATE_RATES");

  const list = state.rates;

  const callback = (props) => {
    if (props.type != 1) return false;

    let className = "material-icons notranslate";

    let upper_limit = "";

    if (props.upper_limit) {
      upper_limit = `$${props.upper_limit}`;
    }

    return (
      <tr key={props.id}>
        <td className={className} style={{ top: "15px" }}>
          copyright
        </td>
        <td>${props.lower_limit}</td>
        <td>{upper_limit}</td>
        <td>
          <s>N</s>
          {props.rate}/$
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table className="striped">
        <tbody>
          <ListComponent style="none" {...{ list, callback }} />
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
}

export default RatesListComponent;
