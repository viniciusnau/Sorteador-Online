import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '../services';
import { enableMapSet } from 'immer';

enableMapSet();

interface ErrorPayload {
    id: string;
    name: string;
    property: string;
    errorMessage: string;
}

interface EmployeeErrorDetail {
    id: string;
    name: string;
    property: string;
    errorMessage: string;
}

interface SnackbarMessages {
    success: string | null;
    error: string | null;
}

interface EmployeeState {
    loading: boolean;
    errorUpdate: string | null;
    successUpdate: boolean;
    successIds: Set<string>;
    errorIds: Set<string>;
    errorDetails: EmployeeErrorDetail[];
    initialData: Map<any, { [key:string | number]: any }>;
    totalUpdates: number;
    snackbarMessages: SnackbarMessages;
    showSuccessSnackbar: boolean;
    showErrorSnackbar: boolean;
}

const initialState: EmployeeState = {
    loading: false,
    errorUpdate: null,
    successUpdate: false,
    successIds: new Set(),
    errorIds: new Set(),
    errorDetails: [],
    initialData: new Map(),
    totalUpdates: 0,
    snackbarMessages: { success: null, error: null },
    showSuccessSnackbar: false,
    showErrorSnackbar: false,
};

export const updateEmployee = createAsyncThunk<
    { id: string; updates: any },
    { id: string; name: string; property: string; [key: string]: any },
    { rejectValue: ErrorPayload }
>(
    'employees/updateEmployee',
    async (
        { id, name, property, ...updates }: { id: string; name: string; property: string; [key: string]: any },
        { rejectWithValue }
    ) => {
        try {
            if (property === 'email' && typeof updates.email === 'string') {
                if (updates.email !== "") {
                    const validDomain = '@defensoria.sc.gov.br';
                    if (!updates.email.endsWith(validDomain)) {
                        return rejectWithValue({
                            id,
                            name: name || 'Unknown',
                            property,
                            errorMessage: `O e-mail deve terminar com "${validDomain}"`,
                        });
                    }
                }
            }

            const response = await services.updateEmployee(id, updates);
            return { id, updates };
        } catch (err: any) {
            return rejectWithValue({
                id,
                name: name || 'Unknown',
                property: property || 'Unknown',
                errorMessage:
                    err.response?.data?.detail || 'Failed to update employee',
            });
        }
    }
);

const updateEmployeeSlice = createSlice({
    name: 'updateEmployee',
    initialState,
    reducers: {
        setInitialData(state, action) {
            state.initialData = new Map(action.payload);
        },
        resetCounters(state) {
            state.successIds.clear();
            state.errorIds.clear();
            state.errorDetails = [];
            state.totalUpdates = 0;
            state.snackbarMessages = { success: null, error: null };
            state.showSuccessSnackbar = false;
            state.showErrorSnackbar = false;
        },
        setTotalUpdates(state, action) {
            state.totalUpdates = action.payload;
        },
        markUpdatesEnd(state) {
            if (state.successIds.size > 0) {
                state.snackbarMessages.success = `${state.successIds.size} pessoa(s) atualizada(s).`;
                state.showSuccessSnackbar = true;
            }
            if (state.errorIds.size > 0) {
                state.snackbarMessages.error = 'Falha ao atualizar alguns funcionários';
                state.showErrorSnackbar = true;
            }
        },
        markUpdateError(state) {
            if (state.errorIds.size > 0) {
                state.snackbarMessages.error = 'Falha ao atualizar alguns funcionários';
                state.showErrorSnackbar = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.errorUpdate = null;
                state.successUpdate = false;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.successUpdate = true;
                state.errorUpdate = null;
                state.successIds.add(action.payload.id);

                if (
                    state.successIds.size > 0 &&
                    state.successIds.size + state.errorIds.size ===
                        state.totalUpdates
                ) {
                    state.snackbarMessages.success = `${state.successIds.size} pessoa(s) atualizada(s)`;
                    state.showSuccessSnackbar = true;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.successUpdate = false;
                state.errorUpdate =
                    action.payload?.errorMessage || 'Unknown error';
                state.errorIds.add(action.payload?.id || 'unknown');
                state.errorDetails.push({
                    id: action.payload?.id || 'unknown',
                    name: action.payload?.name || 'Unknown',
                    property: action.payload?.property || 'Unknown',
                    errorMessage: state.errorUpdate || 'Unknown error',
                });

                if (
                    state.successIds.size + state.errorIds.size ===
                    state.totalUpdates
                ) {
                    state.snackbarMessages.error =
                        'Falha ao atualizar alguns funcionários';
                    state.showErrorSnackbar = true;
                }
            });
    },
});

export const {
    setInitialData,
    resetCounters,
    setTotalUpdates,
    markUpdatesEnd,
    markUpdateError,
} = updateEmployeeSlice.actions;
export default updateEmployeeSlice.reducer;
