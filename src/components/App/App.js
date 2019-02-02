import React, { Component } from "react";
import { debounce } from "throttle-debounce";
import pt from "prop-types";
import PriceDisplay from "../PriceDisplay";
import SearchSelect from "../SearchSelect";
import { SEARCH_TYPE } from "../../constants";
import AnimationSlot from "./AnimationSlot";
import { getViewportHeight, isMobile } from "../../utils";

class App extends Component {
	state = {
		isMobile: false,
		appHeight: "100vh",
		showFrom: true,
		showTo: false,
		inputValue: {
			from: "",
			to: "",
		},
		selectedOption: {
			from: {
				label: "",
				value: "",
			},
			to: {
				label: "",
				value: "",
			},
		},
	};

	constructor(props) {
		super(props);

		this.searchAddress = debounce(500, this.searchAddress);
	}

	componentDidMount() {
		if (isMobile()) {
			this.setState({
				isMobile: true,
				appHeight: getViewportHeight(),
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.selectedOption.to.value && this.state.selectedOption.from.value) {
			if (
				prevState.selectedOption.to.value !== this.state.selectedOption.to.value ||
				prevState.selectedOption.from.value !== this.state.selectedOption.from.value
			) {
				this.getPriceEstimate();
			}
		}
	}

	render() {
		const { showFrom, showTo, selectedOption, isMobile, appHeight } = this.state;
		const { addressResults, priceEstimateResults, working, failed } = this.props;

		return (
			<div className="App" style={{ height: appHeight }}>
				<div className="App__inner">
					<header className="App__header">
						<AnimationSlot state="logoIn">
							{styles => (
								<div className="App__header__text" style={styles}>
									<span>a2b me</span>
									<AnimationSlot state="ballIn">
										{styles => <div className="App__header__circle" style={styles} />}
									</AnimationSlot>
								</div>
							)}
						</AnimationSlot>
					</header>
					{showFrom && (
						<AnimationSlot state="searchBoxEnter" isMobile={isMobile} first>
							{styles => (
								<div className="App__search" style={styles}>
									<SearchSelect
										options={addressResults.from}
										selectedOption={selectedOption.from}
										onSelect={this.handleSelect(SEARCH_TYPE.FROM)}
										onInputChange={this.handleInputChange(SEARCH_TYPE.FROM)}
										placeholder="Start"
									/>
								</div>
							)}
						</AnimationSlot>
					)}

					{showTo && (
						<AnimationSlot state="searchBoxEnter" isMobile={isMobile}>
							{styles => (
								<div className="App__search" style={styles}>
									<SearchSelect
										options={addressResults.to}
										selectedOption={selectedOption.to}
										onSelect={this.handleSelect(SEARCH_TYPE.TO)}
										onInputChange={this.handleInputChange(SEARCH_TYPE.TO)}
										placeholder="Finish"
									/>
								</div>
							)}
						</AnimationSlot>
					)}
					{(!!Object.keys(priceEstimateResults).length || working.priceEstimate || failed.priceEstimate) && (
						<AnimationSlot state="priceDisplayEnter">
							{styles => (
								<div className="App__priceDisplay" style={styles}>
									<PriceDisplay
										items={priceEstimateResults}
										working={working.priceEstimate}
										failed={failed.priceEstimate}
									/>
								</div>
							)}
						</AnimationSlot>
					)}
				</div>
			</div>
		);
	}

	handleSelect = type => {
		return selectedOption => {
			this.setState({
				selectedOption: {
					...this.state.selectedOption,
					[type]: selectedOption,
				},
			});

			if (!this.state.showTo) {
				this.setState({
					showTo: true,
				});
			}

			this.props.searchAddressClearResults(type);
		};
	};

	getPriceEstimate() {
		const {
			selectedOption: { from, to },
		} = this.state;
		this.props.getPriceEstimate(from.value, to.value);
	}

	searchAddress = (query, type) => {
		this.props.searchAddress(query, type);
	};

	handleInputChange = type => ({ value }) => {
		this.setState({
			inputValue: {
				...this.state.inputValue,
				[type]: value,
			},
		});
		this.searchAddress(value, type);
	};
}

App.propTypes = {
	working: pt.object.isRequired,
	addressResults: pt.object,
	priceEstimateResults: pt.object,
	failed: pt.object.isRequired,
	searchAddress: pt.func.isRequired,
	getPriceEstimate: pt.func.isRequired,
	searchAddressClearResults: pt.func.isRequired,
};

export default App;
