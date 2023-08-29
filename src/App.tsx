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
    if (task) {
      setTasks([...tasks, { id: Date.now(), name: task, isDone: false }]);
      setTask("");
    }
  };

  count = tasks.length;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  return (
    // If there is 1 element then no need div element
    // If there are many elements, there must be a div tag outside
    <div className="App">
      <h2 className="App-title">To-do list app</h2>
      <p>Count: {count} </p>
      <AddTask task={task} setTask={setTask} addTaskFunc={addTaskFunc} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
