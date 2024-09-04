import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      (state.alljobs = action), payload;
    },
  },
});
export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
