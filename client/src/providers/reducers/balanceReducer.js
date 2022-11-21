function balanceReducer(state = { btc: 0.0, eth: 0.0 }, action) {
  switch (action.dispatch) {
    case "UPDATE_BTC_BALANCE":
      return { ...state, btc: action.data };
    case "UPDATE_ETH_BALANCE":
      return { ...state, eth: action.data };
    default:
      return state;
  }
}

export default balanceReducer;
