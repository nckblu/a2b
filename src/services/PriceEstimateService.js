export class PriceEstimateService {
	static getResultsFromResponse(response) {
		if (!response.data.results.length) return {};
		return response.data.results.reduce((acc, current) => {
			return {
				...acc,
				[current.displayName]: {
					...current,
				},
			};
		}, {});
	}
}

export default PriceEstimateService;
