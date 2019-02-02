import React from "react";
import { shallow, mount } from "enzyme";
import PriceDisplay, { failedMessage } from "./PriceDisplay";

describe("(Component) PriceDisplay", () => {
	let wrapper;

	it("Shows failed message on fail", () => {
		const props = {
			items: {},
			failed: true,
		};

		wrapper = shallow(<PriceDisplay {...props} />);
		expect(wrapper.find(".PriceDisplay__failed").text()).toEqual(failedMessage);
	});

	it("Renders <Price /> when an estimate is present", () => {
		const props = {
			items: {
				UberX: {
					estimate: "£10-30",
				},
			},
		};

		wrapper = mount(<PriceDisplay {...props} />);
		expect(!!wrapper.find(".Price").length).toEqual(true);
	});
});
