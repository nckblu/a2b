import { createReducer } from "redux-starter-kit";
import * as actions from "./actions";

export const initialState = {
	working: {
		searchAddress: false,
		priceEstimate: false,
	},
	results: {
		location: [],
		priceEstimate: {},
		addresses: {
			from: [],
			to: [],
		},
	},
	failed: {
		priceEstimate: false,
		searchAddress: {
			to: false,
			from: false,
		},
	},
};

/* NOTE: createReducer from redux-starter-kit allows for direct state mutation */
export const reducer = createReducer(initialState, {
	[actions.SEARCH_ADDRESS_REQUEST]: (state, action) => {
		const { type } = action.payload;
		state.working.searchAddress = true;
		state.failed.searchAddress[type] = false;
		state.results.addresses[type] = [];
	},
	[actions.SEARCH_ADDRESS_SUCCESS]: (state, action) => {
		const { type, results } = action.payload;
		state.working.searchAddress = false;
		state.results.addresses[type] = results;
	},
	[actions.SEARCH_ADDRESS_FAIL]: (state, action) => {
		const { type } = action.payload;
		state.working.searchAddress = false;
		state.failed.searchAddress[type] = true;
		state.results.addresses[type] = [];
	},
	[actions.SEARCH_ADDRESS_CLEAR_RESULTS]: (state, action) => {
		const { type } = action.payload;
		state.working.searchAddress = false;
		state.failed.searchAddress[type] = false;
		state.results.addresses[type] = [];
	},

	[actions.GET_PRICE_ESTIMATE_REQUEST]: (state, action) => {
		state.working.priceEstimate = true;
		state.failed.priceEstimate = false;
	},
	[actions.GET_PRICE_ESTIMATE_SUCCESS]: (state, action) => {
		const { results } = action.payload;
		state.working.priceEstimate = false;
		state.results.priceEstimate = results;
	},
	[actions.GET_PRICE_ESTIMATE_FAIL]: (state, action) => {
		state.working.priceEstimate = false;
		state.results.priceEstimate = {};
		state.failed.priceEstimate = true;
	},
});

export default reducer;
