import { createSlice } from '@reduxjs/toolkit/';
import { USERS } from 'shared/constants';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    users: USERS,
  },
  reducers: {
    addUser(state, action) {
      state.users.push({ id: new Date().getTime(), ...action.payload.user });
    },
    changeUserInfo(state, action) {
      const { userData } = action.payload;
      const currentUser = state.users.find((user) => user.id === userData.id);
      currentUser.lastName = userData?.lastName;
      currentUser.firstName = userData?.firstName;
      currentUser.middleName = userData?.middleName;
      currentUser.city = userData?.city?.value;
    },
    changeUserRecommendations(state, action) {
      const currentUser = state.users.find((user) => user.id === action.payload.userId);
      currentUser.recommendations = !currentUser.recommendations;
    },
  },
});

export const { changeUserInfo, changeUserRecommendations, addUser } = userSlice.actions;
export default userSlice.reducer;
