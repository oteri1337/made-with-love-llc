const defaultState = { array: [], object: {}, search_object: {} };

function transactionsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_TRANSACTIONS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        object: {
          [action.data.reference]: action.data,
        },
      };
    case "UPDATE_TRANSACTIONS_PAGE":
      return {
        ...action.data,
        array: [...state.array, ...action.data.array],
      };
    default:
      return state;
  }
}

export default transactionsReducer;
