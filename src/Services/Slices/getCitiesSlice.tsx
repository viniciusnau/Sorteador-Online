import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface CitiesState {
  cities: any[];
  loading: boolean;
  error: boolean;
}

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: false,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    getCities: (state) => {
      state.loading = true;
      state.error = false;
      state.cities = [];
    },
    getCitiesSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.cities = action.payload;
    },
    getCitiesFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.cities = [];
    },
  },
});

export const {
  getCities,
  getCitiesSuccess,
  getCitiesFailure,
} = citiesSlice.actions;

export default citiesSlice.reducer;

export const fetchCities = (is_outsourced: boolean) => async (
  dispatch: (arg0: {
    payload: any;
    type: "cities/getCities" | "cities/getCitiesSuccess" | "cities/getCitiesFailure";
  }) => void
) => {
  dispatch(getCities());
  try {
    const response = await services.getCities(is_outsourced);
    dispatch(getCitiesSuccess(response));
  } catch (err) {
    console.log("err: ", err);
    dispatch(getCitiesFailure());
  }
};
