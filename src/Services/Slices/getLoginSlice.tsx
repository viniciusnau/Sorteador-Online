import { createSlice } from '@reduxjs/toolkit';
import services from '../services';

interface LoginState {
    data: any[];
    loading: boolean;
    error: boolean;
    loggedIn: boolean;
}

const initialState: LoginState = {
    data: [],
    loading: false,
    error: false,
    loggedIn: false,
};

const usersListSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
      getLogin: (state) => {
          state.loading = true;
          state.error = false;
          state.data = [];
          state.loggedIn = false;
      },
      getLoginSuccess: (state, action) => {
          state.loading = false;
          state.error = false;
          state.data = action.payload;
          state.loggedIn = true; 
      },
      getLoginFailure: (state) => {
          state.loading = false;
          state.error = true;
          state.data = [];
          state.loggedIn = false;
      },
  },
});

export const { getLogin, getLoginSuccess, getLoginFailure } =
  usersListSlice.actions;

export default usersListSlice.reducer;

export const fetchLogin =
    (credentials: { username: string; password: string }, redirect: boolean = false) =>
    async (dispatch: (arg0: { payload?: any; type: string }) => void) => {
        dispatch(getLogin());
        try {
            const response = await services.getLogin(credentials);
            if (response.status === 200 && response.data) { 
                dispatch(getLoginSuccess(response.data)); 
            } else {
                dispatch(getLoginFailure());
            }
        } catch (err) {
            dispatch(getLoginFailure());
        }
    };
