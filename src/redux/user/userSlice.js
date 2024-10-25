import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    selectedImage: null,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeuser: (state) => {
      return { email: "", selectedImage: null };
    },
  },
});

export const { setUser, updateUser,removeuser } = userSlice.actions;
export default userSlice.reducer;
