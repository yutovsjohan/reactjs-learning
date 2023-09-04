import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./reducers/TaskReducer";

export default configureStore({
  reducer: {
    task: TaskReducer,
  },
});
