import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import services from '../services';
import { FilterEmployee, Employee } from '../../Types/Types';

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

const employeeSlice = createSlice({
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
} = employeeSlice.actions;

export default employeeSlice.reducer;

export const fetchEmployee =
    (filter: FilterEmployee, page: number) => async (dispatch: any) => {
        dispatch(getEmployee());
        try {
            const response = await services.getEmployee(filter, page);
            dispatch(
                getEmployeeSuccess({
                    results: response.results,
                    count: response.count,
                })
            );
        } catch (err) {
            console.error('Failed to fetch employees:', err);
            dispatch(getEmployeeFailure());
        }
    };
