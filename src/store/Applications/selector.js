import { createSelector } from '@reduxjs/toolkit';
import { getUserId } from 'store/Auth/selectors';

export const getApplications = (state) => state.application.applications;

export const getUsertApplications = createSelector([getApplications, getUserId], (applications, userId) =>
  applications.filter((application) => application.userId === userId)
);
