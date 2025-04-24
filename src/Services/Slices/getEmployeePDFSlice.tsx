import { createSlice } from '@reduxjs/toolkit';
import services from '../services';
import { FilterEmployee } from '../../Types/Types';
import { AppDispatch } from '../StoreConfig'; 

interface EmployeeState {
    loading: boolean;
    error: boolean;
    filter: FilterEmployee;
}

const initialState: EmployeeState = {
    loading: false,
    error: false,
    filter: {
        name: '',
        city: '',
        team: '',
        role: '',
        email: '',
        is_active: '',
    },
};

const employeePDFSlice = createSlice({
    name: 'employeePDF',
    initialState,
    reducers: {
        getEmployee: (state) => {
            state.loading = true;
            state.error = false;
        },
        getEmployeeSuccess: (state) => {
            state.loading = false;
            state.error = false;
        },
        getEmployeeFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        setFilterPDF: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const {
    getEmployee,
    getEmployeeSuccess,
    getEmployeeFailure,
    setFilterPDF,
} = employeePDFSlice.actions;

export default employeePDFSlice.reducer;

export const fetchEmployeePDF =
    (filter: FilterEmployee) =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(getEmployee());
        try {
            const blob = await services.getEmployeePDF(filter);
            const url = window.URL.createObjectURL(
                new Blob([blob], { type: 'application/pdf' })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Funcionários_encontrados.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            dispatch(getEmployeeSuccess());
        } catch (err) {
            console.error('Failed to fetch employees PDF:', err);
            dispatch(getEmployeeFailure());
        }
    };
