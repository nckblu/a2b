import React, { PureComponent } from "react";
import pt from "prop-types";

const BUFFER_TIME = 500;

export class Price extends PureComponent {
	initialState = {
		fromValue: 0,
		toValue: 0,
		isSpinning: false,
		estimate: "",
	};

	constructor() {
		super();

		this.state = { ...this.initialState };
	}

	componentDidMount() {
		this.startSpinning();
		this.setState({ estimate: this.props.estimate });
		if (this.props.estimate) {
			this.transitionToRealEstimate();
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.failed) {
			this.setState({ ...this.initialState });
		}
		if (this.props.estimate !== prevProps.estimate) {
			this.setState({ estimate: this.props.estimate }, () => {
				this.transitionToRealEstimate();
			});
		}
		if (!prevProps.working && this.props.working) {
			this.startSpinning();
		}
	}

	transitionToRealEstimate() {
		setTimeout(() => {
			this.setState({ isSpinning: false }, () => {
				const estimateSplit = this.props.estimate.split("-");
				const fromValue = parseInt(estimateSplit[0].substr(1), 10);
				const toValue = parseInt(estimateSplit[1], 10);
				this.setState({
					fromValue,
					toValue,
				});
			});
		}, BUFFER_TIME);
	}

	startSpinning() {
		this.setState({ isSpinning: true }, () => {
			this.spinNumbers();
		});
	}

	spinNumbers() {
		if (!this.state.isSpinning) return false;
		this.setState(
			{
				fromValue: Math.floor(Math.random() * 90 + 10),
				toValue: Math.floor(Math.random() * 90 + 10),
			},
			() => {
				setTimeout(() => this.spinNumbers(), 50);
			}
		);
	}

	render() {
		const { fromValue, toValue } = this.state;
		const { failed } = this.props;
		const fromValueSplit = fromValue.toString().split("");
		const toValueSplit = toValue.toString().split("");
		if (failed) return null;
		return (
			<div className="Price">
				<div className="Price__inner">
					<div className="Price__estimate">
						<span className="Price__estimate__currency">£</span>
						{fromValueSplit.map((digit, i) => (
							<span key={`from-${i}`} className="Price__estimate__digit">
								{digit}
							</span>
						))}
						<span className="Price__estimate__sep">-</span>
						{toValueSplit.map((digit, i) => (
							<span key={`to-${i}`} className="Price__estimate__digit">
								{digit}
							</span>
						))}
					</div>
					<div className="Price__label">UberX Estimate</div>
				</div>
			</div>
		);
	}
}

Price.propTypes = {
	estimate: pt.string,
	working: pt.bool,
	failed: pt.bool,
};

export default Price;
