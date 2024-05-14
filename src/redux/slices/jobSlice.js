import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
};
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {

    setLoading: (state, action) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
    },
  },
});

 export const{setLoading,setError,setJobs}=jobSlice.actions

export default jobSlice.reducer;
