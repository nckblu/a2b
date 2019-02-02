import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import reducer from "./modules/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import logger from "redux-logger";

export class Store {
	static configure() {
		const sagaMiddleware = createSagaMiddleware();
		const middleware = [...getDefaultMiddleware(), sagaMiddleware];

		if (process.NODE_ENV !== "production") {
			middleware.push(logger);
		}

		const store = configureStore({
			reducer,
			middleware,
			devTools: process.env.NODE_ENV !== "production",
		});

		sagaMiddleware.run(rootSaga);

		return store;
	}
}

export default Store;
