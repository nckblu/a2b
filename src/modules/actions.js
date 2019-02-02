import { createAction } from "redux-starter-kit";

/* Search address */
export const searchAddress = createAction("SEARCH_ADDRESS_REQUEST");
export const SEARCH_ADDRESS_REQUEST = searchAddress.toString();
export const searchAddressSuccess = createAction("SEARCH_ADDRESS_SUCCESS");
export const SEARCH_ADDRESS_SUCCESS = searchAddressSuccess.toString();
export const searchAddressFail = createAction("SEARCH_ADDRESS_FAIL");
export const SEARCH_ADDRESS_FAIL = searchAddressFail.toString();
export const searchAddressClearResults = createAction("SEARCH_ADDRESS_CLEAR_RESULTS");
export const SEARCH_ADDRESS_CLEAR_RESULTS = searchAddressClearResults.toString();

/* Get price estimate */
export const getPriceEstimate = createAction("GET_PRICE_ESTIMATE_REQUEST");
export const GET_PRICE_ESTIMATE_REQUEST = getPriceEstimate.toString();
export const getPriceEstimateSuccess = createAction("GET_PRICE_ESTIMATE_SUCCESS");
export const GET_PRICE_ESTIMATE_SUCCESS = getPriceEstimateSuccess.toString();
export const getPriceEstimateFail = createAction("GET_PRICE_ESTIMATE_FAIL");
export const GET_PRICE_ESTIMATE_FAIL = getPriceEstimateFail.toString();
