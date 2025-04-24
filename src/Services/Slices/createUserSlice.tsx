import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import services from '../services';

interface UserState {
    loadingCreation: boolean;
    errorCreation: boolean;
    successCreation: boolean;
    status: number | null;
}

const initialState: UserState = {
    loadingCreation: false,
    errorCreation: false,
    successCreation: false,
    status: null,
};

const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        createUserStart: (state) => {
            state.loadingCreation = true;
            state.errorCreation = false;
            state.successCreation = false;
            state.status = null;
        },
        createUserSuccess: (state) => {
            state.loadingCreation = false;
            state.successCreation = true;
            state.status = 200;
        },
        createUserFailure: (state, action: PayloadAction<number>) => {
            state.loadingCreation = false;
            state.errorCreation = true;
            state.status = action.payload;
        },
        resetUserState: (state) => {
            state.loadingCreation = false;
            state.errorCreation = false;
            state.successCreation = false;
            state.status = null;
        },
    },
});

export const {
    createUserStart,
    createUserSuccess,
    createUserFailure,
    resetUserState,
} = createUserSlice.actions;

export default createUserSlice.reducer;

export const createUserThunk = (body: any) => async (dispatch: any) => {
    dispatch(createUserStart());
    try {
        await services.createUser(body);
        dispatch(createUserSuccess());
    } catch (err: any) {
        console.log('err: ', err);
        dispatch(createUserFailure(err?.response?.status));
    }
};
