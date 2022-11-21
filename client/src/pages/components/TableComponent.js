import React from "react";

const TableComponent = ({ data = {} }) => {
  let keysArray = Object.keys(data);

  const rows = keysArray.map((key) => {
    if (typeof data[key] === "object") {
      return false;
    }

    return (
      <tr key={key} className="row">
        <td
          className="col l5 s12 table-title"
          style={{ textTransform: "uppercase" }}
        >
          {key.replace(/_/g, " ")}
        </td>
        <td className="col l7 s12 table-content">{data[key]}</td>
      </tr>
    );
  });

  return (
    <table className="striped">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableComponent;
