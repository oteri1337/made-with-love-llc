const defaultState = { array: [], object: {}, search_object: {} };

function parentgroupsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PARENTGROUPS":
      return action.data;
    case "UPDATE_PARENTGROUP":
      return {
        ...state,
        object: {
          [action.data.slug]: action.data,
        },
      };
    case "UPDATE_PARENTGROUPS_PAGE":
      return {
        ...action.data,
        array: [...state.array, ...action.data.array],
      };
    default:
      return state;
  }
}

export default parentgroupsReducer;
