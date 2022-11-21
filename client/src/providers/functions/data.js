import { format } from "./dom";

export const formatTransaction = function (data) {
  const newData = { ...data };

  if (newData.cryptoId == 1) {
    newData.currency = "bitcoin";
    newData.symbol = "BTC";
  }

  if (newData.cryptoId == 2) {
    newData.currency = "ethereum";
    newData.symbol = "ETH";
  }

  if (newData.cryptoId == 3) {
    newData.currency = "tether";
    newData.symbol = "USDT";
  }

  if (newData.type == 1) {
    newData.type = "BUY";
  }

  if (newData.type == 2) {
    newData.type = "SELL";
  }

  if (typeof newData.amount_in_crypto == "number") {
    // newData.amount_in_crypto = newData.amount_in_crypto.toFixed(8);
    newData.amount_in_crypto = newData.amount_in_crypto + " " + newData.symbol;
  }

  if (typeof newData.amount_in_usd == "number") {
    newData.amount_in_usd = format("USD", newData.amount_in_usd);
  }

  if (typeof newData.amount_in_ngn == "number") {
    newData.amount_in_ngn = format("NGN", newData.amount_in_ngn);
  }

  if (newData.status === 1) {
    newData.status = "(1/3) Pending";
  }

  if (newData.status === 2) {
    newData.status = "(2/3) Paid";
  }

  if (newData.status === 3) {
    newData.status = "(3/3) Completed";
  }

  delete newData.id;
  delete newData.path;
  delete newData.user_id;
  delete newData.cryptoId;
  return newData;
};

export const formatNairaTransaction = function (data) {
  const newData = { ...data };

  // if (newData.cryptoId == 1) {
  //   newData.currency = "bitcoin";
  //   newData.symbol = "BTC";
  // }

  // if (newData.cryptoId == 2) {
  //   newData.currency = "ethereum";
  //   newData.symbol = "ETH";
  // }

  // if (newData.cryptoId == 3) {
  //   newData.currency = "tether";
  //   newData.symbol = "USDT";
  // }

  // if (newData.type == 1) {
  //   newData.type = "BUY";
  // }

  // if (newData.type == 2) {
  //   newData.type = "SELL";
  // }

  // if (typeof newData.amount_in_crypto == "number") {
  //   // newData.amount_in_crypto = newData.amount_in_crypto.toFixed(8);
  //   newData.amount_in_crypto = newData.amount_in_crypto + " " + newData.symbol;
  // }

  // if (typeof newData.amount_in_usd == "number") {
  //   newData.amount_in_usd = format("USD", newData.amount_in_usd);
  // }

  if (typeof newData.amount == "number") {
    newData.amount = format("NGN", newData.amount);
  }

  if (newData.status === 1) {
    newData.status = "Pending";
  }

  if (newData.status === 2) {
    newData.status = "Completed";
  }

  if (newData.type === 1) {
    newData.type = "Deposit";
  }

  delete newData.id;
  delete newData.path;
  delete newData.user_id;
  delete newData.cryptoId;
  return newData;
};

export const formatOrder = function (data) {
  const newData = { ...data };

  if (typeof newData.total_in_crypto == "number") {
    newData.total_in_crypto = newData.total_in_crypto.toFixed(8);
    newData.total_in_crypto = newData.total_in_crypto + " " + newData.symbol;
  }

  if (typeof newData.total_in_ngn == "number") {
    newData.total_in_ngn = format("NGN", newData.total_in_ngn);
  }

  if (newData.status === 1) {
    newData.status = "(1/3) Pending ";
  }

  if (newData.status === 2) {
    newData.status = "(2/3) Paid";
  }

  if (newData.status === 3) {
    newData.status = "(3/3) Completed";
  }

  delete newData.id;
  delete newData.path;
  delete newData.user_id;
  delete newData.cp_url;
  return newData;
};
