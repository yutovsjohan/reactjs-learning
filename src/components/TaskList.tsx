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
import TaskService from "../services/TaskService";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import PriorityToText from "./format/PriorityToText";
import StatusToText from "./format/StatusToText";
import Consts from "../constants/Consts";
import DateFormatted from "./format/DateFormatted";

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
  };

  handleSearch = () => {
    this.setState({ isLoading: true });
    this.taskService
      .get()
      .then((response: any) => {
        let items = response.data.items;
        items.map((item: any) => {
          item.id = item._id;
          item.priority = parseInt(item.priority);
          item.status = parseInt(item.status);
        });
        this.setState({ tasks: items, isLoading: false });
        console.info(items);
      })
      .catch((error: any) => {
        console.error(error);
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
    this.handleCancelDelete();
  };

  handleCancelDelete = () => {
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
          <Grid item xs={4} sm={3} md={2} lg={2}>
            <Button variant="outlined" fullWidth startIcon={<AddIcon />}>
              Add
            </Button>
          </Grid>
          <Grid item xs={4} sm={6} md={8} lg={8}></Grid>
          <Grid item xs={4} sm={3} md={2} lg={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SearchIcon />}
              onClick={() => this.handleSearch()}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <h4>Task List</h4>

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
            onClose={() => this.handleCancelDelete()}
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
                onClick={() => this.handleCancelDelete()}
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
