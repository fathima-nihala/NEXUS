import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api'; 

// Types for the user and auth state
interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async Thunk for registration
export const webRegister = createAsyncThunk(
  'auth/webRegister',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/web_reg`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed.'
      );
    }
  }
);

// Async Thunk for login
export const webLogin = createAsyncThunk(
  'auth/webLogin',
  async (loginData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/web_log`, loginData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed.'
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(webRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(webRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(webRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(webLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(webLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      // Save token to localStorage
      localStorage.setItem('authToken', action.payload.token);
    });
    builder.addCase(webLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
