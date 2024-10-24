import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: [],
  city: [],
  zipcode: [],
  country: [],
};

const addressSlice = createSlice({
  name: "totalAddress",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address.push(action.payload);
    },
    setCity: (state, action) => {
      state.city.push(action.payload);
    },
    setZip: (state, action) => {
      state.zipcode.push(action.payload);
    },
    setCountry: (state, action) => {
      state.country.push(action.payload);
    },
  },
});

export const { setAddress, setCity, setZip, setCountry } = addressSlice.actions;
export default addressSlice.reducer;
