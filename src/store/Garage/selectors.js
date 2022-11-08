import { createSelector } from '@reduxjs/toolkit';
import { getUserId } from 'store/Auth/selectors';

export const getCars = (state) => state.garage.cars;

export const getUserCars = createSelector([getCars, getUserId], (cars, userId) => cars.filter((car) => car.userId === userId));
