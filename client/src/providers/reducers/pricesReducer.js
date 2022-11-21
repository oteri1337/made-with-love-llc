const defaultState = {
  tether: { usd: 1 },
  bitcoin: { usd: 1 },
  ethereum: { usd: 1 },
};

function bitcoinReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PRICES":
      return action.data;
    default:
      return state;
  }
}

export default bitcoinReducer;
