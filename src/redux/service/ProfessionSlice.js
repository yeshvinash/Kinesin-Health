import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProfessional: [],
  };
const professionSlice = createSlice({
  name: "profession",
  initialState,
  reducers: {
    addProfession: (state, action) => {
        state.selectedProfessional.push(action.payload);
    },
    removeprofession: (state, action) => {
        const professionToRemove = action.payload;
        state.selectedProfessional = state.selectedProfessional.filter(
          (profession) => profession.name !== professionToRemove.name
        );
    },
    clearprofession:(state, action)=>{
      state.selectedProfessional = []
    }
  },
});

export const { addProfession, removeprofession,clearprofession } = professionSlice.actions;

export default professionSlice;
