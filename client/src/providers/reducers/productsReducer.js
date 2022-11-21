const defaultState = { array: [], object: {}, search_object: {} };

function productseducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PRODUCTS":
      return action.data;
    case "UPDATE_PRODUCT":
      return {
        ...state,
        object: {
          [action.data.slug]: action.data,
        },
      };
    case "UPDATE_PRODUCTS_PAGE":
      return {
        ...action.data,
        array: [...state.array, ...action.data.array],
      };
    default:
      return state;
  }
}

export default productseducer;
