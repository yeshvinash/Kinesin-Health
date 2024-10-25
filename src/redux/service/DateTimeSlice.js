import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: [],
  time: [],
};

const dateTimeSlice = createSlice({
  name: "dateTime",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date.push(action.payload);
    },
    removeDate:(state,action)=>{
      state.date =[]
    },
    setTime: (state, action) => {
      state.time.push(action.payload);
    },
    removetime:(state,action)=>{
      state.time =[]
    },
  },
});

export const { setDate, setTime,removeDate,removetime } = dateTimeSlice.actions;
export default dateTimeSlice.reducer;
