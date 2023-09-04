import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import TaskList from "../components/task-management/TaskList";
import AddTask from "../components/task-management/AddTask";
import App from "../App";

export default class RouterComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<TaskList />} />
            <Route path="add-task" element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
