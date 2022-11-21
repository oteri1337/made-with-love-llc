import React from "react";
import { Helmet } from "react-helmet";
import { formatOrder } from "functions/data";
import { getRequestThenDispatch } from "hooks";
import TableComponent from "components/TableComponent";
import SpinnerComponent from "components/SpinnerComponent";
import OrderPayComponent from "./components/OrderPayComponent";
import OrderProductsComponent from "./components/OrderProductsComponent";
import TourContainerComponent from "components/container/TourContainerComponent";

import FormComponent from "components/FormComponent";
import BreadComponent from "components/container/BreadComponent";
import TourNavComponent from "components/container/TourNavComponent";

function OrderReadPage({ match }) {
  const { reference } = match.params;
  const url = `/api/orders/${reference}`;
  const { state, request } = getRequestThenDispatch(url, "UPDATE_ORDER");

  if (request.fetching) {
    return (
      <TourContainerComponent>
        <center>
          <SpinnerComponent />
        </center>
      </TourContainerComponent>
    );
  }

  const rawData = state.orders.object[reference];

  if (!rawData) {
    return (
      <TourContainerComponent>
        <div className="container center app-py-3">
          <div className="card-panel app-py-3">ORDER NOT FOUND</div>
        </div>
      </TourContainerComponent>
    );
  }

  const data = formatOrder(rawData);

  return (
    <TourContainerComponent bread={[{ label: `Order ${rawData.reference}` }]}>
      <div className="container app-py-3">
        <Helmet>
          <script src="https://checkout.flutterwave.com/v3.js"></script>
        </Helmet>
        <div className="card-panel center">
          <h1>{data.total_in_ngn}</h1>
          <br />
          <br />
          <OrderPayComponent rawData={rawData} />
          <OrderProductsComponent products={rawData.products} />
          <TableComponent data={data} />
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default OrderReadPage;
