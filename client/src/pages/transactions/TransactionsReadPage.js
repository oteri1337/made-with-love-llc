import React from "react";
import { Helmet } from "react-helmet";
import { getRequest } from "functions/http";
import { formatTransaction } from "functions/data";
import TableComponent from "components/TableComponent";
import SpinnerComponent from "components/SpinnerComponent";
import BuyPayComponent from "./components/BuyPayComponent";
import SellPayComponent from "./components/SellPayComponent";
import TourContainerComponent from "components/container/TourContainerComponent";

function TransactionsReadPage({ match }) {
  const [refreshing, setRefreshing] = React.useState(true);
  const { reference } = match.params;
  const [rawData, setRaw] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const response = await getRequest(`/api/transactions/${reference}`);
      if (response.errors.length === 0) {
        setRaw(response.data);
      }
      setRefreshing(false);
    })();
  }, []);

  if (refreshing) {
    return (
      <TourContainerComponent bread={[{ label: "Transaction Not Found" }]}>
        <div className="container">
          <br />
          <br />
          <SpinnerComponent />
        </div>
      </TourContainerComponent>
    );
  }

  if (!rawData) {
    return (
      <TourContainerComponent bread={[{ label: "Transaction Not Found" }]}>
        <div className="container">
          <br />
          <br />
          <ul className="collection">
            <li className="collection-item">
              <center> Failed To Find Transaction</center>
            </li>
          </ul>
        </div>
      </TourContainerComponent>
    );
  }

  const data = formatTransaction(rawData);

  let nav = [
    {
      label: `${data.type} ${data.amount_in_crypto}`,
    },
  ];

  const renderStep = () => {
    if (data.type == "SELL" && rawData.status == 1) {
      return <SellPayComponent {...{ data, rawData }} />;
    }
    if (data.type == "BUY" && rawData.status == 1) {
      return <BuyPayComponent {...{ data, rawData }} />;
    }
    if (data.type == "BUY" && rawData.status == 2) {
      return (
        <center>
          <h1 className="material-icons notranslate green-text">
            <b>done</b>
          </h1>
          <p>Your payment has been received</p>
          <p>You will receive {data.amount_in_crypto}</p>
          <p> via {data.address} shortly.</p>
        </center>
      );
    }
    if (data.type == "SELL" && rawData.status == 2) {
      return (
        <center>
          <h1 className="material-icons notranslate green-text">
            <b>done</b>
          </h1>
          <p>Your payment has been received</p>
          <p>You will receive {data.amount_in_ngn}</p>
          <p>
            via {data.bank_name} {data.account_number} {data.account_name}{" "}
            shortly.
          </p>
        </center>
      );
    }
    if (rawData.status == 3) {
      return (
        <center>
          <h1 className="material-icons notranslate green-text">
            <b>done</b>
          </h1>
          <p>TRANSACTION COMPLETED</p>
        </center>
      );
    }
  };

  return (
    <TourContainerComponent bread={nav}>
      <div className="container app-mt-1">
        <Helmet>
          <script src="https://checkout.flutterwave.com/v3.js"></script>
        </Helmet>
        <div className="card-panel">
          <div className="row">
            <div className="col l5 s12">{renderStep()}</div>
            <div className="col l7 s12">
              <TableComponent {...{ data }} />
            </div>
          </div>
        </div>
        <br />
      </div>
    </TourContainerComponent>
  );
}

export default TransactionsReadPage;
