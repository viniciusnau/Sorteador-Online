import { createSlice } from '@reduxjs/toolkit';
import services from '../services';
import { FilterUserProfile } from '../../Types/Types';
import { AppDispatch } from '../StoreConfig';

interface UserProfileState {
  loading: boolean;
  error: boolean;
  filter: FilterUserProfile;
}

const initialState: UserProfileState = {
  loading: false,
  error: false,
  filter: {
    start_date: '',
    end_date: '',
    email: '',
  },
};

const userProfilePDFSlice = createSlice({
  name: 'userProfilePDF',
  initialState,
  reducers: {
    getUserProfile: (state) => {
      state.loading = true;
      state.error = false;
    },
    getUserProfileSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    getUserProfileFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    setFilterUserProfilePDF: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileFailure,
  setFilterUserProfilePDF,
} = userProfilePDFSlice.actions;

export default userProfilePDFSlice.reducer;

export const fetchUserProfilePDF = (filter: FilterUserProfile) => async (dispatch: AppDispatch) => {
  dispatch(getUserProfile());
  try {
    const blob = await services.getUsersPDF(filter);
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Perfis_de_usuários.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove(); 
    window.URL.revokeObjectURL(url);

    dispatch(getUserProfileSuccess());
  } catch (err) {
    console.error('Failed to fetch user profiles PDF:', err);
    dispatch(getUserProfileFailure());
  }
};
