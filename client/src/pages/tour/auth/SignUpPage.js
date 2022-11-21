import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import TourContainerComponent from "components/container/TourContainerComponent";

function SignUpPage({ location }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Sign Up",
    },
  ];

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
    {
      id: "password_confirmation",
      type: "password",
    },
    {
      id: "phone_number",
      type: "number",
      prefix: "+234",
      inputMode: "tel",
    },
    {
      id: "first_name",
    },
    {
      id: "last_name",
    },
    {
      id: "address",
      required: false,
    },
    // {
    //   id: "bank_name",
    //   type: "select",
    //   options: [
    //     {
    //       id: 1,
    //       value: "044",
    //       label: "Access Bank",
    //     },
    //     {
    //       id: 2,
    //       value: "023",
    //       label: "Citi Bank",
    //     },
    //     {
    //       id: 4,
    //       value: "050",
    //       label: "EcoBank PLC",
    //     },
    //     {
    //       id: 5,
    //       value: "011",
    //       label: "First Bank PLC",
    //     },
    //     {
    //       id: 6,
    //       value: "214",
    //       label: "First City Monument Bank",
    //     },
    //     {
    //       id: 7,
    //       value: "070",
    //       label: "Fidelity Bank",
    //     },
    //     {
    //       id: 8,
    //       value: "058",
    //       label: "Guaranty Trust Bank",
    //     },
    //     {
    //       id: 9,
    //       value: "076",
    //       label: "Polaris bank",
    //     },
    //     {
    //       id: 10,
    //       value: "221",
    //       label: "Stanbic IBTC Bank",
    //     },
    //     {
    //       id: 11,
    //       value: "068",
    //       label: "Standard Chaterted bank PLC",
    //     },
    //     {
    //       id: 12,
    //       value: "232",
    //       label: "Sterling Bank PLC",
    //     },
    //     {
    //       id: 13,
    //       value: "033",
    //       label: "United Bank for Africa",
    //     },
    //     {
    //       id: 14,
    //       value: "032",
    //       label: "Union Bank PLC",
    //     },
    //     {
    //       id: 15,
    //       value: "035",
    //       label: "Wema Bank PLC",
    //     },
    //     {
    //       id: 16,
    //       value: "057",
    //       label: "Zenith bank PLC",
    //     },
    //     {
    //       id: 17,
    //       value: "215",
    //       label: "Unity Bank PLC",
    //     },
    //     {
    //       id: 18,
    //       value: "101",
    //       label: "ProvidusBank PLC",
    //     },
    //     {
    //       id: 183,
    //       value: "082",
    //       label: "Keystone Bank",
    //     },
    //     {
    //       id: 184,
    //       value: "301",
    //       label: "Jaiz Bank",
    //     },
    //     {
    //       id: 186,
    //       value: "030",
    //       label: "Heritage Bank",
    //     },
    //     {
    //       id: 231,
    //       value: "100",
    //       label: "Suntrust Bank",
    //     },
    //     {
    //       id: 252,
    //       value: "608",
    //       label: "FINATRUST MICROFINANCE BANK",
    //     },
    //     {
    //       id: 253,
    //       value: "090175",
    //       label: "Rubies Microfinance Bank",
    //     },
    //     {
    //       id: 254,
    //       value: "090267",
    //       label: "Kuda",
    //     },
    //     {
    //       id: 258,
    //       value: "090115",
    //       label: "TCF MFB",
    //     },
    //     {
    //       id: 259,
    //       value: "400001",
    //       label: "FSDH Merchant Bank",
    //     },
    //     {
    //       id: 260,
    //       value: "502",
    //       label: "Rand merchant Bank",
    //     },
    //     {
    //       id: 301,
    //       value: "103",
    //       label: "Globus Bank",
    //     },
    //     {
    //       id: 389,
    //       value: "327",
    //       label: "Paga",
    //     },
    //     {
    //       id: 395,
    //       value: "000026",
    //       label: "Taj Bank Limited",
    //     },
    //     {
    //       id: 596,
    //       value: "100022",
    //       label: "GoMoney",
    //     },
    //     {
    //       id: 597,
    //       value: "090180",
    //       label: "AMJU Unique Microfinance Bank",
    //     },
    //   ],
    // },
    // {
    //   id: "account_name",
    // },
    // {
    //   id: "account_number",
    //   type: "number",
    //   required: false,
    // },
    // {
    //   id: "bank_name",
    //   required: false,
    // },
    // {
    //   id: "country",
    //   required: false,
    // },
    // {
    //   id: "state",
    //   required: false,
    // },
  ];

  const onSubmit = (data) => {
    const body = { ...data };
    body.phone_number = "+234" + body.phone_number;
    callBack("/api/users", "UPDATE_USER", body);
  };

  const params = new URLSearchParams(location.search);
  const refid = params.get("refid");

  const initialState = {
    user_id: refid || null,
  };

  return (
    <TourContainerComponent bread={nav}>
      <div className="row app-my-3 ">
        <div className="col s12 m12 l6 offset-l3">
          <div className="card-panel center">
            <ul className="stepper linear ">
              <li className="step active">
                <div className="step-title">Account Information</div>
                <p>Fields marked with * are required</p>
                {refid && <p>You are signing up via a referral link</p>}
                <div className="step-content">
                  <Form
                    {...{
                      formArray,
                      fetching,
                      errors,
                      message,
                      onSubmit,
                      text: "Sign Up",
                      initialState,
                    }}
                  />
                </div>
              </li>

              <li className="step">
                <div className="step-title">Email Verification</div>
              </li>
              <li className="step">
                <div className="step-title">Phone Verification</div>
              </li>
              <li className="step">
                <div className="step-title">BVN Verification</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default SignUpPage;
