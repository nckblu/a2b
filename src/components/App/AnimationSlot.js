import { config, Keyframes } from "react-spring";
import delay from "await-delay";

export const AnimationSlot = Keyframes.Spring({
	searchBoxEnter: async (next, cancel, ownProps) => {
		const distance = ownProps.isMobile ? 50 : 300;

		if (ownProps.first) {
			await delay(500);
		}
		await next({
			from: {
				opacity: 0,
				transform: `translate(0, ${distance}px)`,
			},
			opacity: 1,
			transform: "translate(0, 0px)",
			config: config.gentle,
		});
	},
	logoIn: async next => {
		await next({
			from: {
				opacity: 0,
				transform: "translate(0px, -500px)",
			},
			opacity: 1,
			transform: "translate(0px, 0px)",
			config: config.gentle,
		});
		await delay(200);
		await next({
			transform: "translate(-60px, 0px)",
			config: config.gentle,
		});
	},
	githubIn: async next => {
		// await delay(200);
		await next({
			from: {
				opacity: 0,
				transform: "translate(100px, 0px)",
			},
			opacity: 1,
			transform: "translate(0px, 0px)",
			config: config.gentle,
		});
	},
	ballIn: async next => {
		await delay(1400);
		await next({
			from: {
				opacity: 0,
				transform: "translate(0, -200px)",
			},
			opacity: 1,
			transform: "translate(0, 0px)",
			config: config.wobbly,
		});
	},
	priceDisplayEnter: async (next, n, ownProps) => {
		const distance = ownProps.isMobile ? 50 : 300;
		await next({
			from: {
				opacity: 0,
				transform: `translate(0px, ${distance}px)`,
			},
			opacity: 1,
			transform: "translate(0px, 0px)",
			config: config.gentle,
		});
	},
});

export default AnimationSlot;
