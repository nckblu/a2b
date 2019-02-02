// import { expectSaga } from "redux-saga-test-plan";
// import * as sagas from "./rootSaga";
// import * as actions from "../modules/actions";
// import { call } from "redux-saga/effects";
// import ApiService from "../services/ApiService";
// import LocationService from "../services/LocationService";
// import { throwError } from "redux-saga-test-plan/providers";
// import reducer, { initialState } from "../modules/reducer";

// TODO: Issue with testplan - Cannot find module 'redux-saga/lib/internal/sagaHelpers' from 'index.js'

// describe("(Saga) Root Saga", () => {
// 	test("(Integration) searchAddressRequest", () => {
// 		const type = "to";
// 		const address = "London";
// 		const response = {
// 			data: { results: [{ label: "London, England, United Kingdom", lat: 51.50643, lon: -0.12721 }] },
// 		};
// 		const results = LocationService.getResultsFromResponse(response);
// 		const action = actions.searchAddressRequest({ address, type });
// 		const successAction = actions.searchAddressSuccess({ results, type });

// 		return expectSaga(sagas.searchAddressRequest, action)
// 			.provide([[call(ApiService.searchAddress, address), response]])
// 			.put(successAction)
// 			.run();
// 	});
// });
