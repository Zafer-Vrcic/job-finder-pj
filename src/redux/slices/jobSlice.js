import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [], //will not touch this array/just for the filter
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
      state.mainJobs = action.payload;
    },
    deleteJob: (state, action) => {
      
      //to find item index which we going to delete
      const i = state.jobs.findIndex((i) => i.id === action.payload);
      //to delete item from the array
      state.jobs.splice(i, 1);
    },
    createJob: (state, action) => {
      state.jobs.push(action.payload); // Correctly add the job to the array
    },
    //depends on the company will filter
    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();
      const filtered = state.mainJobs.filter((i) =>
        i[action.payload.field].toLowerCase().includes(query)
      );
      state.jobs = filtered;
    },
    //for the Sort By letter,
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "A-Z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "Z-A":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));

          break;
        case "Latest":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "Oldest":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));

          break;
        default:
          break;
      }
      
    },
    //for the filter to work normaly
    clearFilters:(state)=>{
      state.jobs=state.mainJobs;
    }
    
  },
});

export const {
  clearFilters,
  sortJobs,
  filterBySearch,
  createJob,
  setLoading,
  setError,
  setJobs,
  deleteJob,
} = jobSlice.actions;

export default jobSlice.reducer;
