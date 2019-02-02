import React from "react";
import { mount } from "enzyme";
import Price from "./Price";

describe("(Component) Price", () => {
	let wrapper;

	it("Eventually displays the correct price", () => {
		const props = {
			estimate: "£10-30",
			working: false,
			failed: false,
		};

		wrapper = mount(<Price {...props} />);

		return new Promise(resolve => {
			setTimeout(() => {
				expect(
					wrapper
						.find(".Price__estimate__digit")
						.at(0)
						.text()
				).toEqual("1");
				expect(
					wrapper
						.find(".Price__estimate__digit")
						.at(1)
						.text()
				).toEqual("0");
				expect(
					wrapper
						.find(".Price__estimate__digit")
						.at(2)
						.text()
				).toEqual("3");
				expect(
					wrapper
						.find(".Price__estimate__digit")
						.at(3)
						.text()
				).toEqual("0");
				resolve();
			}, 1200); // TODO: Look into this, BUFFER_TIME should suffice but there is some delay with enzyme mount
		});
	});
});
