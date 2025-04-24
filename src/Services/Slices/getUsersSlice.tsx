import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import services from '../services';
import { UserProfile, FilterUserProfile } from '../../Types/Types';

interface UserProfileState {
  data: UserProfile[];
  loading: boolean;
  error: boolean;
  count: number;
  currentPage: number;
}

const initialState: UserProfileState = {
  data: [],
  loading: false,
  error: false,
  count: 0,
  currentPage: 1,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    getUserProfiles: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getUserProfilesSuccess: (
      state,
      action: PayloadAction<{
        results: UserProfile[];
        count: number;
      }>
    ) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload.results;
      state.count = action.payload.count;
    },
    getUserProfilesFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  getUserProfiles,
  getUserProfilesSuccess,
  getUserProfilesFailure,
  setCurrentPage,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;

export const fetchUserProfiles =
  (filter: FilterUserProfile) => async (dispatch: any) => {
    dispatch(getUserProfiles());
    try {
      const response = await services.getUserProfiles(filter);
      dispatch(
        getUserProfilesSuccess({
          results: response.results,
          count: response.count,
        })
      );
    } catch (err) {
      console.error('Failed to fetch user profiles:', err);
      dispatch(getUserProfilesFailure());
    }
  };
