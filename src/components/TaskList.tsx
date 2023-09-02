import { Task } from "../model/Task";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList = ({ tasks, setTasks }: Props) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "date",
      width: 120,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "date",
      width: 120,
    },
    { field: "organization", headerName: "Organization", width: 200 },
    { field: "priority", headerName: "Priority", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  const deleteTaskFunc = (id: number | undefined) => {
    setTasks(
      tasks.filter((t) => {
        // add "return" to fix error eslint: Expected an assignment or function call and instead saw an expression @typescript-eslint/no-unused-expressions
        return t._id !== id;
      })
    );
  };

  return (
    <div className="task-list">
      <Button variant="outlined" startIcon={<AddIcon />}>
        Add
      </Button>

      <h4>Task List</h4>

      {/* style={{ height: 400, width: "96%" }} */}
      <div>
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <table>
        <tbody>
          {tasks.map((e) => (
            // {/* add key on element to remove this warning: Each child in a list should have a unique “key” prop */}
            <tr key={e._id}>
              <td>{e.title}</td>
              <td>
                <button onClick={() => deleteTaskFunc(e._id)}>
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
