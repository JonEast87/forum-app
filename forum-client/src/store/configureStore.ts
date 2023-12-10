// due to the usage of redux toolkit I had to import legacy_createStore to maintain this code as is
import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./AppState";

const configureStore = () => {
    return createStore(rootReducer, {});
};

export default configureStore;