const defaultState = { array: [], object: {}, search_object: {} };

function groupsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_GROUPS":
      return action.data;
    case "UPDATE_GROUP":
      return {
        ...state,
        object: {
          [action.data.slug]: action.data,
        },
      };
    case "UPDATE_GROUPS_PAGE":
      return {
        ...action.data,
        array: [...state.array, ...action.data.array],
      };
    default:
      return state;
  }
}

export default groupsReducer;
