//TOOD
import React from "react";
import { mount } from "enzyme";
import SearchSelect from "./SearchSelect";

describe("(Component) SearchSelect", () => {
	let wrapper;

	it("Renders without error", () => {
		const props = {
			options: [{ value: { lat: 1, lon: 2 }, index: 0, label: "label" }],
			selectedOption: null,
			onSelect: () => {},
			onInputChange: () => {},
			placeholder: "placeholder",
		};

		wrapper = mount(<SearchSelect {...props} />);
		expect(!!wrapper.find("input").length).toEqual(true);
	});
});
