import LocationService from "./LocationService";

describe("(Service) LocationService", () => {
	it("Transforms data correctly", () => {
		const response = {
			data: { results: [{ label: "London, England, United Kingdom", lat: 51.50643, lon: -0.12721 }] },
		};
		const result = LocationService.getResultsFromResponse(response);

		expect(result).toEqual([
			{
				label: response.data.results[0].label,
				index: 0,
				value: {
					lat: response.data.results[0].lat,
					lon: response.data.results[0].lon,
				},
			},
		]);
	});
});
