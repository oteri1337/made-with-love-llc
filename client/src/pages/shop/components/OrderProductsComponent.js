import React from "react";
import { format } from "functions/dom";

function OrderProductsComponent({ products = [] }) {
  const data = products?.map((product) => {
    return (
      <tr key={product.id}>
        <td>
          {product.title} X {product.order_product.quantity}
        </td>
        <td>{format("USD", product.price)}</td>
      </tr>
    );
  });

  return (
    <table className="striped app-my-3">
      <tbody>
        <tr>
          <th>
            <b>PRODUCT</b>
          </th>
          <th>
            <b>PRICE</b>
          </th>
        </tr>
        {data}
      </tbody>
    </table>
  );
}

export default OrderProductsComponent;
