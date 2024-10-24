
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('kinesin-isAuthenticated', true);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
       localStorage.setItem('kinesin-isAuthenticated', false);
      // localStorage.setItem('kinesin-isAuthenticated', true);
      
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
