import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isAuthUser: false,
    isAuthAdmin: false,
    token: '',
    userId: '',
  },
  reducers: {
    loginUser(state, actions) {
      return {
        ...state,
        isAuthUser: true,
        token: actions.payload.token,
        userId: actions.payload.user_id,
      };
    },
    loginAdmin(state, actions) {
      return {
        ...state,
        isAuthAdmin: true,
        token: actions.payload.token,
        userId: actions.payload.user_id,
      };
    },
    logout(state, actions) {
      return {
        ...state,
        isAuthUser: false,
        isAuthAdmin: false,
        token: '',
        userId: '',
      };
    },
  },
});

export const { loginUser, loginAdmin, logout } = userSlice.actions;
export default userSlice.reducer;
