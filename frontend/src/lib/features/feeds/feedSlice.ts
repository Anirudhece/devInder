import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feeds",
  initialState: null,
  reducers: {
    addfeed: (state, action) => {
      return action.payload;
    },
    removeUserFromfeed: (state: any, action) => {
      const filteredState = state?.filter((user: any) => {
        return user?._id !== action.payload;
      });
      return filteredState;
    },
  },
});

export const { addfeed, removeUserFromfeed } = feedSlice.actions;
export default feedSlice.reducer;
