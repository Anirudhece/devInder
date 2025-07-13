import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state) => {
      return null;
    },
  },
});

export default connectionSlice.reducer;
export const { addConnections, removeConnections } = connectionSlice.actions;