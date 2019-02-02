import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import Store from "./store";
import "./styles/_core.scss";
import { unregister } from "./serviceWorker";

unregister(); // Worst part of CRA

const store = Store.configure();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
