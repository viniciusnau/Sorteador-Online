import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import services from '../services';
import { Employee } from '../../Types/Types';
import axios from "axios";

interface EmployeeState {
    data: Employee[];
    loading: boolean;
    error: boolean;
    count: number;
    currentPage: number;
}

const initialState: EmployeeState = {
    data: [],
    loading: false,
    error: false,
    count: 0,
    currentPage: 1,
};

const createEmployeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        getEmployee: (state) => {
            state.loading = true;
            state.error = false;
            state.data = [];
        },
        getEmployeeSuccess: (
            state,
            action: PayloadAction<{
                results: Employee[];
                count: number;
            }>
        ) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload.results;
            state.count = action.payload.count;
        },
        getEmployeeFailure: (state) => {
            state.loading = false;
            state.error = true;
            state.data = [];
        },
    },
});

export const {
    getEmployee,
    getEmployeeSuccess,
    getEmployeeFailure,
    setCurrentPage,
} = createEmployeeSlice.actions;

export default createEmployeeSlice.reducer;

export const createEmployee =
    (body: any) => async (dispatch: any) => {
        dispatch(getEmployee());
        try {
            const response = await services.createEmployee(body);
            dispatch(
                getEmployeeSuccess({
                    results: response.results,
                    count: response.count,
                })
            );
        } catch (err) {
            console.error('Failed to create employee:', err);
            dispatch(getEmployeeFailure());
        }
    };

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await services.deleteEmployee(id);
            return response;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to delete employee');
            }
            return rejectWithValue('Failed to delete supervisor');
        }
    }
);
