import React from "react";
import SpinnerComponent from "components/SpinnerComponent";

function SellPayComponent({ data, rawData }) {
  const { cryptoId, address, reference } = rawData;

  const [received, setReceived] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  const confirm = async () => {
    setFetching(true);
    let response = await fetch("/api/transactions/confirm/sell", {
      method: "PATCH",
      body: JSON.stringify({ reference }),
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    setFetching(false);

    if (response.errors.length === 0) {
      location.reload();
    }
  };

  React.useEffect(() => {
    (async () => {
      if (cryptoId == 1) {
        const url = `https://insight.bitpay.com/api/addr/${address}`;
        let response = await fetch(url);
        response = await response.json();
        if (response.totalReceived) {
          setReceived(response.totalReceived);
        }
      }

      if (cryptoId == 2) {
        const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
        let response = await fetch(url);
        response = await response.json();
        if (response.result) {
          setReceived(response.result / 1e18);
        }
      }

      if (cryptoId == 3) {
        const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdac17f958d2ee523a2206206994597c13d831ec7&address=${address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
        let response = await fetch(url);
        response = await response.json();
        if (response.result) {
          setReceived(response.result / 1e6);
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    if (received >= rawData.amount_in_crypto) {
      confirm();
    }
  }, [received]);

  return (
    <div>
      <center>
        <p>
          Please send {data.amount_in_crypto} to the address below to proceed,
          then click on CONFIRM PAYMENT to proceed{" "}
        </p>
        <p>
          <b>{address}</b>
        </p>
        <p> or scan the QR code below with your wallet app.</p>
        <p>
          You will receive {data.amount_in_ngn} via {data.bank_name}{" "}
          {data.account_number} {data.account_name} as soon as your payment is
          received.
        </p>
      </center>
      <center>
        <img
          src={`https://chart.googleapis.com/chart?cht=qr&chl=${data.currency}:${address}?amount=${rawData.amount_in_crypto}&chs=160x160&chld=L|0`}
          alt={address}
        />

        <p>Expected: {data.amount_in_crypto}</p>
        <p>
          Received: {received} {data.symbol}
        </p>

        {!fetching && (
          <button className="btn" onClick={confirm}>
            CONFIRM PAYMENT
          </button>
        )}

        {fetching && <SpinnerComponent />}
      </center>
    </div>
  );
}

export default SellPayComponent;
