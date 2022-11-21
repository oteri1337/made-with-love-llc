export const ERROR_OBJECT = {
  errors: ["server error"],
  data: {},
};

export async function getRequest(url) {
  let response;

  try {
    response = await fetch(url);
    response = await response.json();
  } catch (e) {
    response = ERROR_OBJECT;
  }

  return response;
}

export async function sendRequest(url, body, type = "POST") {
  let response;

  try {
    response = await fetch(url, {
      method: type,
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
  } catch (e) {
    response = { ...ERROR_OBJECT, jsError: e };
  }

  return response;
}

export async function sendFormRequest(url, body, type = "POST") {
  let response;

  try {
    response = await fetch(url, {
      method: type,
      body: body,
      credentials: "include",
    });
    response = await response.json();
  } catch (e) {
    response = { ...ERROR_OBJECT, jsError: e };
  }

  return response;
}

export const requestUpload = async function (endpoint, formData) {
  try {
    let response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return (response = await response.json());
  } catch (error) {
    let data = {
      errors: ["Server Error"],
      data: {},
    };
    return data;
  }
};

export async function signOut(callReducer) {
  await getRequest("/api/users/auth/signout");
  callReducer({ dispatch: "UPDATE_USER", data: false });
}

export async function adminSignOut(callReducer) {
  await getRequest("/api/admins/auth/signout");
  callReducer({ dispatch: "UPDATE_ADMIN", data: false });
}

export async function getBtcAddressBalance(address) {
  const url = `https://insight.bitpay.com/api/addr/${address}/balance`;
  let response = await fetch(url);
  response = await response.json();
  return response / 100000000;
}

export async function getBtcAddressTransactions(address) {
  const url = `https://insight.bitpay.com/api/txs/?address=${address}`;
  let response = await fetch(url);
  response = await response.json();
  return response;
}

export async function getEthAddressBalance(address) {
  let url = `https://cors-anywhere.herokuapp.com/https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`;
  let response = await fetch(url);
  response = await response.json();
  return response.ETH.balance;
}

export async function getEthAddressTransactions(address) {
  let url = `https://cors-anywhere.herokuapp.com/https://api.ethplorer.io/getAddressTransactions/${address}?apiKey=freekey`;
  let response = await fetch(url);
  response = await response.json();
  return response;
}
