import "./styles/App.css";
import AddTask from "./components/task-management/AddTask";
import TaskList from "./components/task-management/TaskList";

function App() {
  return (
    // If there is 1 element then no need div element
    // If there are many elements, there must be a div tag outside
    <div className="App">
      <h2 className="App-title">Task Management</h2>
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
