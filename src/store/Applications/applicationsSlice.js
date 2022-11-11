import { createSlice } from '@reduxjs/toolkit';
import { APPLICATIONS_STATE } from 'shared/constants';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: APPLICATIONS_STATE,
  },
  reducers: {
    addApplication(state, action) {
      state.applications.push({
        id: new Date().getTime(),
        status: { name: 'На рассмотрении', id: 1 },
        ...action.payload.data,
      });
    },
  },
});

export const { addApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
