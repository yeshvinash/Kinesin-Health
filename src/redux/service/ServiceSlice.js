import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    selectedServices: [],
  },
  reducers: {
    addService: (state, action) => {
      state.selectedServices.push(action.payload);
    },
    removeService: (state, action) => {
      state.selectedServices = state.selectedServices.filter(
        (service) => service !== action.payload
      );
    },
  },
});

export const { addService, removeService, } = serviceSlice.actions;

export default serviceSlice;
