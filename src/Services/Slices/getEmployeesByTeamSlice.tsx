import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface EmployeesByTeamState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: EmployeesByTeamState = {
  data: [],
  loading: false,
  error: false,
};

const employeesByTeamSlice = createSlice({
  name: "employeesByTeam",
  initialState,
  reducers: {
    getEmployeesByTeam: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getEmployeesByTeamSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getEmployeesByTeamFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  getEmployeesByTeam,
  getEmployeesByTeamSuccess,
  getEmployeesByTeamFailure,
} = employeesByTeamSlice.actions;

export default employeesByTeamSlice.reducer;

export const fetchEmployeesByTeam =
  (filter: any, page: number) => async (
    dispatch: (arg0: {
      payload: any;
      type: "employeesByTeam/getEmployeesByTeam" | "employeesByTeam/getEmployeesByTeamSuccess" | "employeesByTeam/getEmployeesByTeamFailure";
    }) => void
  ) => {
    dispatch(getEmployeesByTeam());
    try {
      const response = await services.getEmployeesByTeam(filter, page);
      dispatch(getEmployeesByTeamSuccess(response));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getEmployeesByTeamFailure());
    }
  };
