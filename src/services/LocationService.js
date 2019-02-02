export class LocationService {
	static getResultsFromResponse(response, maxResults = 4) {
		if (!response.data.results.length) return [];
		return response.data.results
			.map((result, index) => {
				const { label, lon, lat } = result;
				return {
					label,
					index,
					value: {
						lat,
						lon,
					},
				};
			})
			.slice(0, maxResults);
	}
}

export default LocationService;
