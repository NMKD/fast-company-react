import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    quality: qualitiesReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
