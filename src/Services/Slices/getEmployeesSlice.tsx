import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface EmployeesState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: EmployeesState = {
  data: [],
  loading: false,
  error: false,
};

const employeesSlice = createSlice({
  name: "allEmployees",
  initialState,
  reducers: {
    getEmployees: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getEmployeesFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  getEmployees,
  getEmployeesSuccess,
  getEmployeesFailure,
} = employeesSlice.actions;

export default employeesSlice.reducer;

export const fetchEmployees = () => async (
  dispatch: (arg0: {
    payload: any;
    type: "allEmployees/getEmployees" | "allEmployees/getEmployeesSuccess" | "allEmployees/getEmployeesFailure";
  }) => void
) => {
  dispatch(getEmployees());
  try {
    const response = await services.getEmployees();
    dispatch(getEmployeesSuccess(response));
  } catch (err) {
    console.log("err: ", err);
    dispatch(getEmployeesFailure());
  }
};
