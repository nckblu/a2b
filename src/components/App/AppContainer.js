import { connect } from "react-redux";
import * as selectors from "../../selectors";
import * as actions from "../../modules/actions";
import App from "./App";

const mapStateToProps = state => ({
	working: selectors.working(state),
	addressResults: selectors.addressResults(state),
	priceEstimateResults: selectors.priceEstimate(state),
	failed: selectors.failed(state),
});

const mapDispatchToProps = dispatch => ({
	searchAddress: (address, type) => dispatch(actions.searchAddress({ address, type })),
	getPriceEstimate: (start, end) => dispatch(actions.getPriceEstimate({ start, end })),
	searchAddressClearResults: type => dispatch(actions.searchAddressClearResults({ type })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
