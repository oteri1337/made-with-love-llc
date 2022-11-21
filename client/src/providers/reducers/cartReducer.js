function cartReducer(state = {}, action) {
  switch (action.dispatch) {
    case "ADD_TO_CART":
      return {
        ...state,
        [action.data.id]: action.data,
      };

    case "EMPTY_CART":
      return {};

    case "UPDATE_QUANTITY":
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          quantity: action.data.value,
        },
      };

    case "REMOVE_FROM_CART":
      delete state[action.data.id];

    default:
      return state;
  }
}

export default cartReducer;
