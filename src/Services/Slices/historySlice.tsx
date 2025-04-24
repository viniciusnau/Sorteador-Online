import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from "../services";
import axios from "axios";
import { FilterHistory } from "../../Types/Types";

interface LogDetails {
    employee_city: string;
    employee_name: string;
    employee_role: string;
    employee_team: string;
    employee_email: string | null;
    employee_image: string;
    employee_phone: string | null;
    employee_gender: string;
    employee_is_active: boolean;
    employee_blood_type: string | null;
    employee_start_date: string;
    employee_description: string;
    employee_return_date: string;
    previous_employee_city?: string;
    previous_employee_name?: string;
    previous_employee_role?: string;
    previous_employee_team?: string;
    previous_employee_email?: string;
    previous_employee_image?: string;
    previous_employee_phone?: string;
    previous_employee_gender?: string;
    previous_employee_is_active?: boolean;
    previous_employee_blood_type?: string;
    previous_employee_start_date?: string;
    previous_employee_description?: string;
    previous_employee_return_date?: string;
    username?: string;
}

interface HistoryLog {
    id: number;
    is_employee_log: boolean;
    is_supervisor_log: boolean;
    action: string;
    details: LogDetails;
    created_at: string;
}

interface HistoryState {
    getting: boolean;
    error: string | null;
    logs: HistoryLog[];
}

const initialState: HistoryState = {
    getting: false,
    error: null,
    logs: [],
};

export const getHistory = createAsyncThunk(
    'history/getHistory',
    async ({ filters, page }: { filters: FilterHistory; page: number }, { rejectWithValue }) => {
        try {
            const response = await services.getHistory(filters, page);
            return response.results;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to get history');
            }
            return rejectWithValue('Failed to get history');
        }
    }
);

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistory.pending, (state) => {
                state.getting = true;
                state.error = null;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.getting = false;
                state.logs = action.payload; // Store logs in state
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.getting = false;
                state.error = action.payload as string;
            });
    },
});

export default historySlice.reducer;
