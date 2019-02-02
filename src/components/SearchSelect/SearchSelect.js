import React, { PureComponent } from "react";
import { config, Trail } from "react-spring";
import cn from "classnames";
import pt from "prop-types";

export class SearchSelect extends PureComponent {
	state = {
		inputValue: "",
		cursorPosition: 0,
	};

	constructor(props) {
		super(props);

		this.$input = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedOption.value !== this.props.selectedOption.value) {
			this.setState({
				inputValue: this.props.selectedOption.label,
				cursorPosition: 0,
			});
		}
	}

	componentDidMount() {
		this.$input.current.focus();
	}

	render() {
		const { options, placeholder } = this.props;
		const { inputValue, cursorPosition } = this.state;
		return (
			<div className="SearchSelect">
				<input
					placeholder={placeholder}
					className="SearchSelect__input"
					onChange={this.handleInputChange}
					value={inputValue}
					ref={this.$input}
					autoFocus
					onKeyDown={this.handleKeyDown}
				/>

				<div className="SearchSelect__options">
					<Trail
						config={config.stiff}
						items={options}
						keys={item => item.index}
						from={{ y: 30, opacity: 0 }}
						to={{ y: 0, opacity: 1 }}
					>
						{option => props => {
							return (
								<div
									className={cn("SearchSelect__options__option", {
										"SearchSelect__options__option--isSelected": option.index === cursorPosition,
									})}
									onClick={this.handleOptionClick(option)}
									style={{
										opacity: props.opacity,
										transform: `translate3d(0,${props.y}%,0)`,
									}}
								>
									{option.label}
								</div>
							);
						}}
					</Trail>
				</div>
			</div>
		);
	}

	handleInputChange = e => {
		const value = e.target.value;
		this.setState({ inputValue: value });
		this.props.onInputChange({ value });
	};

	handleOptionClick = option => {
		return () => {
			this.props.onSelect(option);
		};
	};

	handleKeyDown = e => {
		const { options } = this.props;
		if (!options.length) return;
		switch (e.key) {
			case "ArrowDown":
				this.handleArrowDownPress();
				break;
			case "ArrowUp":
				this.handleArrowUpPress();
				break;
			case "Enter":
				this.handleEnterPress();
				break;
			default:
				break;
		}
	};

	handleArrowDownPress() {
		const { cursorPosition } = this.state;
		if (cursorPosition + 1 < this.props.options.length) {
			this.setState({ cursorPosition: cursorPosition + 1 });
		} else {
			this.setState({ cursorPosition: 0 });
		}
	}

	handleArrowUpPress() {
		const { cursorPosition } = this.state;
		if (cursorPosition - 1 < 0) {
			this.setState({ cursorPosition: this.props.options.length - 1 });
		} else {
			this.setState({ cursorPosition: cursorPosition - 1 });
		}
	}

	handleEnterPress() {
		const { cursorPosition } = this.state;
		const { options } = this.props;
		const option = options.find(item => item.index === cursorPosition);
		this.props.onSelect(option);
	}
}

SearchSelect.propTypes = {
	options: pt.array,
	selectedOption: pt.object,
	onSelect: pt.func.isRequired,
	onInputChange: pt.func.isRequired,
	placeholder: pt.string,
};

export default SearchSelect;
