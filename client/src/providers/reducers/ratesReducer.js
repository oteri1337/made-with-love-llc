const defaultState = { array: [], object: {}, search_object: {} };

function ratesReducer(state = defaultState, action) {
	switch (action.dispatch) {
		case "UPDATE_RATES":
			return action.data;
		case "UPDATE_RATE":
			return {
				...state,
				object: {
					[action.data.id]: action.data
				}
			};
		case "UPDATE_RATES_PAGE":
			return {
				...action.data,
				array: [...state.array, ...action.data.array]
			};
		default:
			return state;
	}
}

export default ratesReducer;
