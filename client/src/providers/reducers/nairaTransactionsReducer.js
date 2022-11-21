const defaultState = { array: [], object: {}, search_object: {} };

function nairaTransactionsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_NAIRATRANSACTIONS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
    case "UPDATE_NAIRATRANSACTION":
      return {
        ...state,
        object: {
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_NAIRATRANSACTIONS_PAGE":
      return {
        ...action.data,
        array: [...state.array, ...action.data.array],
      };
    default:
      return state;
  }
}

export default nairaTransactionsReducer;
