import reducer, { initialState } from "./reducer";
import * as actions from "./actions";

describe("(Reducer) reducer", () => {
	it("Handles SEARCH_ADDRESS_REQUEST correctly", () => {
		const address = "London";
		const type = "to";
		const state = reducer(initialState, actions.searchAddress({ address, type }));
		expect(state.working.searchAddress).toBe(true);
	});

	it("Handles SEARCH_ADDRESS_SUCCESS correctly", () => {
		const type = "to";
		const results = [1, 2, 3];
		const state = reducer(initialState, actions.searchAddressSuccess({ results, type }));
		expect(state.results.addresses.to).toEqual(results);
	});

	it("Handles SEARCH_ADDRESS_FAIL correctly", () => {
		const type = "to";
		const state = reducer(initialState, actions.searchAddressFail({ type }));
		expect(state.failed.searchAddress[type]).toEqual(true);
	});

	it("Handles SEARCH_ADDRESS_CLEAR_RESULTS correctly", () => {
		const type = "from";
		const prevState = { ...initialState };
		prevState.results.addresses[type] = [1, 2, 3];
		const state = reducer(initialState, actions.searchAddressClearResults({ type }));
		expect(state.results.addresses[type].length).toEqual(0);
	});

	it("Handles GET_PRICE_ESTIMATE_REQUEST correctly", () => {
		const start = { lon: 1, lat: 2 };
		const end = { lon: 2, lat: 3 };
		const state = reducer(initialState, actions.getPriceEstimate({ start, end }));
		expect(state.working.priceEstimate).toBe(true);
	});

	it("Handles GET_PRICE_ESTIMATE_SUCCESS correctly", () => {
		const results = { test: 1 };
		const type = "to";
		const state = reducer(initialState, actions.getPriceEstimateSuccess({ results, type }));
		expect(state.results.priceEstimate).toEqual(results);
	});

	it("Handles GET_PRICE_ESTIMATE_FAIL correctly", () => {
		const state = reducer(initialState, actions.getPriceEstimateFail());
		expect(state.failed.priceEstimate).toBe(true);
	});
});
