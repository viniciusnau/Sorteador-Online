import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface TeamsState {
  teams: any[];
  loading: boolean;
  error: boolean;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: false,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    getTeams: (state) => {
      state.loading = true;
      state.error = false;
      state.teams = [];
    },
    getTeamsSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.teams = action.payload;
    },
    getTeamsFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.teams = [];
    },
  },
});

export const {
  getTeams,
  getTeamsSuccess,
  getTeamsFailure,
} = teamsSlice.actions;

export default teamsSlice.reducer;

export const fetchTeams = (is_outsourced: boolean) => async (
  dispatch: (arg0: {
    payload: any;
    type: "teams/getTeams" | "teams/getTeamsSuccess" | "teams/getTeamsFailure";
  }) => void
) => {
  dispatch(getTeams());
  try {
    const response = await services.getTeams(is_outsourced);
    dispatch(getTeamsSuccess(response));
  } catch (err) {
    console.log("err: ", err);
    dispatch(getTeamsFailure());
  }
};
