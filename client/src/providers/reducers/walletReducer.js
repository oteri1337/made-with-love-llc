const bitcoin = {
  balance: 0,
  balance_usd: 0,
  balance_map: {},
  transactions: [],
};

const ethereum = {
  balance: 0,
  balance_usd: 0,
  balance_map: {},
  transactions: [],
};

const usdt = {
  balance_map: {},
  transactions: [],
  balance_approximate: 0,
};

const defaultState = { bitcoin, ethereum, usdt };

function walletReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "SIGN_OUT":
      return defaultState;
    case "UPDATE_BTC_WALLET":
      return { ...state, bitcoin: action.data };
    case "UPDATE_ETH_WALLET":
      return { ...state, ethereum: action.data };
    case "UPDATE_USDT_WALLET":
      return { ...state, usdt: action.data };
    default:
      return state;
  }
}

export default walletReducer;
