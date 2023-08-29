import { Task } from "../model/Task";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList = ({ tasks, setTasks }: Props) => {
  const deleteTaskFunc = (id: number) => {
    setTasks(
      tasks.filter((t) => {
        // add "return" to fix error eslint: Expected an assignment or function call and instead saw an expression @typescript-eslint/no-unused-expressions
        return t.id !== id;
      })
    );
  };

  return (
    <div className="task-list">
      <table>
        <tbody>
          {tasks.map((e) => (
            // {/* add key on element to remove this warning: Each child in a list should have a unique “key” prop */}
            // <div className="task-item" key={e.id}>
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>
                <button onClick={() => deleteTaskFunc(e.id)}>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
