import React from "react";
import { sendRequestThenDispatch } from "hooks";
import SpinnerComponent from "components/SpinnerComponent";

function BuyPayComponent({ data, rawData }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const payWithPayStack = () => {
    var handler = PaystackPop.setup({
      key: "pk_test_f2c23dc93935cb13f5c362d77856827d34a16be4",
      email: rawData.email,
      amount: rawData.amount_in_ngn * 100,
      currency: "NGN",
      ref: rawData.reference, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: rawData.phone_number,
          },
        ],
      },
      callback: function (response) {
        const body = { ...response };
        callBack(
          "/api/transactions/confirm/buy",
          "UPDATE_TRANSACTION",
          body,
          () => {},
          "PATCH"
        );
      },
      onClose: function () {},
    });
    handler.openIframe();
  };

  const payWithFlutterWave = () => {
    FlutterwaveCheckout({
      public_key: PUBLIC_KEY,
      tx_ref: rawData.reference,
      amount: rawData.amount_in_ngn,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      // specified redirect URL
      // redirect_url:
      //   "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
      // meta: {
      //   consumer_id: 23,
      //   consumer_mac: "92a3-912ba-1192a",
      // },
      customer: {
        email: rawData.email,
        phone_number: rawData.phone_number,
      },
      callback: function (body) {
        console.log(body);
        callBack(
          "/api/transactions/confirm/buy",
          "UPDATE_TRANSACTION",
          body,
          () => {},
          "PATCH"
        );
      },
      customizations: {
        title: "TraderFX Martketplace",
        description: "Payment for Crypto",
        logo: "https://www.traderfxm.com/assets/images/logo.png",
      },
    });
  };

  const renderPaymentButton = () => {
    if (fetching) {
      return (
        <center>
          <SpinnerComponent />
        </center>
      );
    }
    return (
      <form>
        <center>
          <button type="button" onClick={payWithFlutterWave} className="btn">
            PAY WITH FLUTTERWAVE
          </button>
        </center>
      </form>
    );
  };

  return (
    <div>
      {renderPaymentButton()}
      <br />
    </div>
  );
}

export default BuyPayComponent;
