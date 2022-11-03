import { createSlice } from '@reduxjs/toolkit/';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    userId: null,
  },
  reducers: {
    login(state, actions) {
      state.isAuth = true;
      state.userId = actions.payload.user.id;
    },
    logout(state) {
      state.isAuth = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
