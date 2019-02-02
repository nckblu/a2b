import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export class ApiService {
	static searchAddress(address) {
		return axios.get(`location/${address}`);
	}

	static getPriceEstimate(start, end) {
		return axios.get("price-estimate", {
			params: {
				startLat: start.lat,
				startLon: start.lon,
				endLat: end.lat,
				endLon: end.lon,
			},
		});
	}
}

export default ApiService;
