import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface RolesState {
  roles: any[];
  loading: boolean;
  error: boolean;
}

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: false,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    getRoles: (state) => {
      state.loading = true;
      state.error = false;
      state.roles = [];
    },
    getRolesSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.roles = action.payload;
    },
    getRolesFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.roles = [];
    },
  },
});

export const {
  getRoles,
  getRolesSuccess,
  getRolesFailure,
} = rolesSlice.actions;

export default rolesSlice.reducer;

export const fetchRoles = (is_outsourced: boolean) => async (
  dispatch: (arg0: {
    payload: any;
    type: "roles/getRoles" | "roles/getRolesSuccess" | "roles/getRolesFailure";
  }) => void
) => {
  dispatch(getRoles());
  try {
    const response = await services.getRoles(is_outsourced);
    dispatch(getRolesSuccess(response));
  } catch (err) {
    console.log("err: ", err);
    dispatch(getRolesFailure());
  }
};
