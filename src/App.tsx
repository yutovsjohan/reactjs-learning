import { useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { Task } from "./model/Task";

function App() {
  let count = 0;
  const obj = JSON.parse(localStorage.getItem("tasks") || "[]");
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(obj);

  const addTaskFunc = (e: React.FormEvent) => {
    e.preventDefault();
    // if (task) {
    //   setTasks([
    //     ...tasks,
    //     {
    //       _id: Date.now(),
    //       title: task,
    //       description: "",
    //       startDate: new Date(),
    //       dueDate: new Date(),
    //       organization: "",
    //       priority: 1,
    //       status: 1,
    //     },
    //   ]);
    //   setTask("");
    // }
  };

  count = tasks.length;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  return (
    // If there is 1 element then no need div element
    // If there are many elements, there must be a div tag outside
    <div className="App">
      <h2 className="App-title">Task Management</h2>
      <p>Count: {count} </p>
      {/* task={task} setTask={setTask} addTaskFunc={addTaskFunc} */}
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
