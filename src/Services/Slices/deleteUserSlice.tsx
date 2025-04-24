import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import services from '../services';

interface deleteUserState {
    data: any;
    loading: boolean;
    error: boolean;
}

const initialState: deleteUserState = {
    data: null,
    loading: false,
    error: false,
};

const deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState,
    reducers: {
        deleteUser: (state) => {
            state.loading = true;
            state.error = false;
            state.data = null;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload;
        },
        deleteUserFailure: (state) => {
            state.loading = false;
            state.error = true;
            state.data = null;
        },
    },
});

export const { deleteUser, deleteUserSuccess, deleteUserFailure } =
    deleteUserSlice.actions;

export default deleteUserSlice.reducer;

export const fetchDeleteUser = createAsyncThunk(
    'deleteUser/fetchDeleteUser',
    async (id: string, { rejectWithValue }) => {
      try {
        await services.deleteUser(id);
        return { response: "Usuário deletado com sucesso" };
      } catch (err) {
        console.error("Erro ao deletar usuário:", err);
        return rejectWithValue(err); 
      }
    }
  );
  