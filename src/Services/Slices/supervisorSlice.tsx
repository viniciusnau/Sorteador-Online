import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from "../services";
import axios from "axios";

interface SupervisorState {
    creating: boolean;
    error: string | null;
}

const initialState: SupervisorState = {
    creating: false,
    error: null,
};

export const deleteSupervisor = createAsyncThunk(
    'supervisor/deleteSupervisor',
    async ({ employee, team }: { employee: string; team: string }, { rejectWithValue }) => {
        try {
            const response = await services.deleteSupervisor(employee, team);
            return response;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to delete supervisor');
            }
            return rejectWithValue('Failed to delete supervisor');
        }
    }
);

export const uploadImage = createAsyncThunk(
    'upload/image',
    async ({ employeeId, image }: { employeeId: string; image: File }, { rejectWithValue }) => {
        try {
            const response = await services.uploadImage(employeeId, image);
            return response;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to upload image');
            }
            return rejectWithValue('Failed to upload image');
        }
    }
);

export const createSupervisor = createAsyncThunk(
    'supervisor/createSupervisor',
    async ({ employee, team }: { employee: string; team: string }, { rejectWithValue }) => {
        try {
            const response = await services.createSupervisor({ employee, team });
            return response;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to create supervisor');
            }
            return rejectWithValue('Failed to create supervisor');
        }
    }
);

const supervisorSlice = createSlice({
    name: 'supervisor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSupervisor.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createSupervisor.fulfilled, (state) => {
                state.creating = false;
                state.error = null;
            })
            .addCase(createSupervisor.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload as string;
            });
    },
});

export default supervisorSlice.reducer;
