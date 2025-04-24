import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import services from '../services'; 

export const uploadUserImage = createAsyncThunk(
    'imageUpload/uploadUserImage',
    async (
        { userId, image }: { userId: string; image: FormData },
        { rejectWithValue }
    ) => {
        try {
            const response = await services.uploadImageUser(userId, image);
            return response.data; 
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Falha ao enviar a imagem');
            }
            return rejectWithValue('Falha ao enviar a imagem');
        }
    }
);

const imageUploadSlice = createSlice({
    name: 'imageUpload',
    initialState: {
        loading: false,
        errorUploadImageUser: null as string | null,
        successUploadUser: false,
    },
    reducers: {
        resetUploadState: (state) => {
            state.loading = false;
            state.errorUploadImageUser = null;
            state.successUploadUser = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadUserImage.pending, (state) => {
                state.loading = true;
                state.errorUploadImageUser = null; 
                state.successUploadUser = false; 
            })
            .addCase(uploadUserImage.fulfilled, (state) => {
                state.loading = false;
                state.successUploadUser = true;
            })
            .addCase(uploadUserImage.rejected, (state, action) => {
                state.loading = false; 
                state.errorUploadImageUser = action.payload as string; 
                state.successUploadUser = false; 
            });
    },
});

export const { resetUploadState } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
