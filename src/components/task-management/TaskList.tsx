import React from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Consts from "../../constants/Consts";
import TaskService from "../../services/TaskService";
import DateFormatted from "../format/DateFormatted";
import PriorityToText from "../format/PriorityToText";
import StatusToText from "../format/StatusToText";
import "../../styles/Task.css";
import { Link } from "react-router-dom";

class TaskList extends React.Component {
  taskService = new TaskService();

  columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 250, headerAlign: "center" },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        return (
          <DateFormatted
            value={param.value}
            formatDate={Consts.FORMAT_DATE_DD_MM_YY}
          />
        );
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        return (
          <DateFormatted
            value={param.value}
            formatDate={Consts.FORMAT_DATE_DD_MM_YY}
          />
        );
      },
    },
    {
      field: "organization",
      headerName: "Organization",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "number",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        return <PriorityToText value={param.value} />;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (param) => {
        return <StatusToText value={param.value} />;
      },
    },
    {
      field: "",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (param) => {
        return (
          <>
            <Grid
              container
              spacing={1}
              className="form-button-group"
              justifyContent="center"
            >
              <Grid item md={5}>
                <IconButton
                  aria-label="edit"
                  size="large"
                  title="Edit"
                  onClick={() => this.handleEdit(param.row.id)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Grid>
              <Grid item md={5}>
                <IconButton
                  aria-label="delete"
                  size="large"
                  title="Delete"
                  onClick={() => this.handleDelete(param.row.id)}
                >
                  <AiFillDelete fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
          </>
        );
      },
    },
  ];

  state = {
    tasks: [],
    isLoading: false,
    isOpenDeleteConfirmDialog: false,
    deleteId: "",
    disabledButton: false,
  };

  handleSearch = () => {
    this.setState({ isLoading: true, disabledButton: true });
    this.taskService
      .get()
      .then((response: any) => {
        let items = response.data.items;
        items.map((item: any) => {
          item.id = item._id;
          item.priority = parseInt(item.priority);
          item.status = parseInt(item.status);
          return null;
        });
        this.setState({ tasks: items });
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false, disabledButton: false });
      });
  };

  handleEdit = (id: string) => {
    // TODO: implement edit later
  };

  handleDelete = (id: string) => {
    this.setState({ isOpenDeleteConfirmDialog: true, deleteId: id });
  };

  handleDeleteConfirmed = () => {
    this.setState({ isLoading: true });
    let entries: [{ itemId: string }] = [{ itemId: this.state.deleteId }];
    this.taskService
      .delete(entries)
      .then((response: any) => {
        console.info(response);
        this.handleSearch();
      })
      .catch((error: any) => {
        console.error(error);
      });
    this.handleCloseDialog();
  };

  handleCloseDialog = () => {
    this.setState({
      isLoading: false,
      isOpenDeleteConfirmDialog: false,
      deleteId: "",
    });
  };

  render() {
    return (
      <div className="task-list">
        <Grid container spacing={2} className="form-button-group">
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <h4>Task List</h4>
          </Grid>
          <Grid item xs={4} sm={3} md={2} lg={2} className="align-self-center">
            <Link to="/add-task">
              <Button variant="outlined" fullWidth startIcon={<AddIcon />}>
                Add
              </Button>
            </Link>
          </Grid>
          <Grid item xs={2} sm={4} md={6} lg={7}></Grid>
          <Grid
            item
            xs={4}
            sm={3}
            md={2}
            lg={2}
            justifyContent="flex-end"
            className="align-self-center"
          >
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SearchIcon />}
              onClick={() => this.handleSearch()}
              disabled={this.state.disabledButton}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <div>
          <DataGrid
            rows={this.state.tasks}
            columns={this.columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            autoHeight
            disableRowSelectionOnClick
            loading={this.state.isLoading}
          />
          <Dialog
            open={this.state.isOpenDeleteConfirmDialog}
            onClose={() => this.handleCloseDialog()}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this row?
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                startIcon={<AiFillDelete />}
                onClick={() => this.handleDeleteConfirmed()}
              >
                Delete
              </Button>

              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => this.handleCloseDialog()}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default TaskList;
