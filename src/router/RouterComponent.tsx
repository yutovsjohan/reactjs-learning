import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import TaskList from "../components/task-management/TaskList";
import AddEditTask from "../components/task-management/AddEditTask";
import App from "../App";

export default class RouterComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<TaskList />} />
            <Route path="add" element={<AddEditTask editMode={false} />} />
            <Route
              path="edit/:taskId"
              element={<AddEditTask editMode={true} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
