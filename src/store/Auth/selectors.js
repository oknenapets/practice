import { createSelector } from '@reduxjs/toolkit';
import { getUsers } from 'store/User/selectors';

export const getUserId = (state) => state.auth.userId;

export const getCurrentUser = createSelector([getUsers, getUserId], (users, id) => users.find((user) => user.id === id));
