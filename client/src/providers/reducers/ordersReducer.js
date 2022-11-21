const defaultState = { array: [], object: {}, search_object: {} };

function ordersReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_ORDERS":
      return action.data;
    case "UPDATE_ORDER":
      return {
        ...state,
        object: {
          [action.data.reference]: action.data,
        },
      };
    case "UPDATE_ORDERS_PAGE":
      return {
        ...action.data,
        array: [...state.array, ...action.data.array],
      };
    default:
      return state;
  }
}

export default ordersReducer;
