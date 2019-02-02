import React, { PureComponent } from "react";
import Price from "../Price";
import pt from "prop-types";

export const failedMessage = "Shit - something went wrong, try again";
export class PriceDisplay extends PureComponent {
	render() {
		const { items, working, failed } = this.props;
		const estimate = items["UberX"] && items["UberX"].estimate ? items["UberX"].estimate : "";
		return (
			<div className="PriceDisplay">
				<div className="PriceDisplay__inner">
					<div className="PriceDisplay__item">
						<Price failed={failed} estimate={estimate} working={working} />
						{failed && <div className="PriceDisplay__failed">{failedMessage}</div>}
					</div>
				</div>
			</div>
		);
	}
}

PriceDisplay.propTypes = {
	items: pt.object,
	working: pt.bool,
	failed: pt.bool,
};

export default PriceDisplay;
