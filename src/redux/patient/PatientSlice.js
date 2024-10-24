// patientSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  patientId: undefined,
  patientFullName: undefined
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    removePatient: (state, action) => {
      const patientToRemove = action.payload;
      state.selectedPatient = state.selectedPatient.filter(
        (patient) => patient.name !== patientToRemove.name
      );
    },
    clearPatient: (state) => {
      state.patients = []
    },

    addPreviousPageForEditPatient: (state, action) => {
      state.previousPageForEditPatient = action.payload;
    },
    clearPreviousPageForEditPatient: (state, action) => {
      state.previousPageForEditPatient = undefined;
    },

    addPatientId: (state, action) => {
      state.patientId = action.payload;
    },
    clearPatientId: (state) => {
      state.patientId = undefined;
    },

    addPatientFullName: (state, action) => {
      state.patientFullName = action.payload;
    },
    clearPatientFullName: (state) => {
      state.patientFullName = undefined;
    },
  },
});

export const { addPatient, removePatient, clearPatient, addPatientId, addPreviousPageForEditPatient, clearPreviousPageForEditPatient, clearPatientId, addPatientFullName, clearPatientFullName } = patientSlice.actions;
export default patientSlice.reducer;
