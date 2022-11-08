import { createSlice } from '@reduxjs/toolkit/';
import { CARS_STATE } from 'shared/constants';

const garageSlice = createSlice({
  name: 'garageCars',
  initialState: {
    cars: CARS_STATE,
  },
  reducers: {
    addCar(state, action) {
      state.cars.push({ id: new Date().getTime(), ...action.payload.data });
    },
    removeCar(state, action) {
      state.cars = state.cars.filter((car) => car.id !== action.payload.id);
    },
  },
});

export const { addCar, removeCar } = garageSlice.actions;
export default garageSlice.reducer;
