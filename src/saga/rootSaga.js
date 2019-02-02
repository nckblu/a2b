import { all } from "redux-saga/effects";
import * as actions from "../modules/actions";
import { put, takeEvery, call } from "redux-saga/effects";
import ApiService from "../services/ApiService";
import LocationService from "../services/LocationService";
import PriceEstimateService from "../services/PriceEstimateService";

export default function* rootSaga() {
	yield all([watchSearchAddressRequest(), watchGetPriceEstimateRequest()]);
}

// Seach address
export function* watchSearchAddressRequest() {
	yield takeEvery(actions.SEARCH_ADDRESS_REQUEST, searchAddressRequest);
}
export function* searchAddressRequest(action) {
	const { address, type } = action.payload;
	try {
		if (!address || !address.trim()) {
			yield put(actions.searchAddressClearResults({ type }));
			return;
		}
		const response = yield call(ApiService.searchAddress, address);
		const results = LocationService.getResultsFromResponse(response);
		yield put(actions.searchAddressSuccess({ results, type }));
	} catch (e) {
		console.log("error is", e);
		yield put(actions.searchAddressFail({ type: action.payload.type }));
	}
}

// Get price estimate
export function* watchGetPriceEstimateRequest() {
	yield takeEvery(actions.GET_PRICE_ESTIMATE_REQUEST, getPriceEstimateRequest);
}
export function* getPriceEstimateRequest(action) {
	const { start, end } = action.payload;
	try {
		const response = yield call(ApiService.getPriceEstimate, start, end);
		const results = PriceEstimateService.getResultsFromResponse(response);
		yield put(actions.getPriceEstimateSuccess({ results }));
	} catch (e) {
		console.log("error is", e);
		yield put(actions.getPriceEstimateFail());
	}
}
