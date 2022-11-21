function userReducer(state = false, action) {
  switch (action.dispatch) {
    case "UPDATE_USER":
      return action.data;
    case "SIGN_OUT":
      return false;
    default:
      return state;
  }
}

export default userReducer;
