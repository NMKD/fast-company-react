import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../service/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        qualitiesRequested(state) {
            state.isLoading = true;
        },
        qualitiesReceved(state, { payload }) {
            state.entities = payload;
            state.isLoading = false;
        },
        qualitiesRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        }
    }
});

const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } =
    qualitiesSlice.actions;

const { reducer: qualitiesReducer } = qualitiesSlice;

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
        const { data } = await qualityService.fetchAll();
        dispatch(qualitiesReceved(data.content));
    } catch (e) {
        dispatch(
            qualitiesRequestFailed("Ошибка при загрузки данных - 'качество'")
        );
    }
};

export const getQualitiesState = () => (state) => state.quality;
// export const getLoading = () => (state) => state.quality.isLoading;
// export const getError = () => (state) => state.quality.error;

export default qualitiesReducer;
