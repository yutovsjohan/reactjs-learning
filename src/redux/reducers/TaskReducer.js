import { createSlice } from "@reduxjs/toolkit";

const taskReduxState = JSON.parse(
  localStorage.getItem("taskReduxState") || "[]"
);

export const TaskReducer = createSlice({
  name: "task",
  initialState: {
    add: taskReduxState.add ? taskReduxState.add : {},
    edit: taskReduxState.edit ? taskReduxState.edit : {},
  },
  reducers: {
    draft: (state, action) => {
      if (action.payload.editMode) {
        state.edit = action.payload.data;
      } else {
        state.add = action.payload.data;
      }
      localStorage.setItem("taskReduxState", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { draft } = TaskReducer.actions;

export default TaskReducer.reducer;
