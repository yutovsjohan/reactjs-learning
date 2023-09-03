import React from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import TaskService from "../../services/TaskService";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import { Task } from "../../model/Task";
import InputText from "../form/InputText";
import InputDate from "../form/InputDate";
import SelectOption from "../form/SelectOption";
import { Priority, Status } from "../../constants/Consts";

class AddTask extends React.Component {
  taskService = new TaskService();
  rows: number = 10;
  today = new Date().toJSON().substring(0, 10);

  state = {
    title: "",
    description: "",
    startDate: this.today,
    dueDate: this.today,
    organization: "",
    priority: "1",
    status: "1",
    errors: [],
    openErrorPanel: false,
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ errors: [], openErrorPanel: false });

    if (this.isValid()) {
      const task: Task = {
        title: this.state.title,
        startDate: new Date(this.state.startDate),
        dueDate: new Date(this.state.dueDate),
        organization: this.state.organization,
        priority: parseInt(this.state.priority),
        status: parseInt(this.state.status),
        description: this.state.description,
      };

      this.taskService
        .save([task])
        .then((response: any) => {
          console.info(response);
          // TODO: handle back task list page
        })
        .catch((error: any) => {
          console.error(error);
          let message = error.message;
          if (error.response?.data?.message) {
            message = error.response.data.message;
          }
          this.setState({
            errors: [message],
            openErrorPanel: true,
          });
        });
    }
  };

  isValid = () => {
    const { title, startDate, dueDate, organization } = this.state;
    let isValid = true;
    let errors: any[] = [];

    if (!title || !title.trim().length) {
      isValid = false;
      errors.push("Title is required");
    }

    if (!startDate) {
      isValid = false;
      errors.push("Start date is required");
    }

    if (!dueDate) {
      isValid = false;
      errors.push("Due date is required");
    }

    if (!organization || !organization.trim().length) {
      isValid = false;
      errors.push("Organization is required");
    }

    if (startDate && dueDate && new Date(startDate) > new Date(dueDate)) {
      isValid = false;
      errors.push("Start date must be before or equal to due date");
    }

    if (errors.length) {
      this.setState({ errors: errors, openErrorPanel: true });
    }

    return isValid;
  };

  render() {
    return (
      <div className="add-task">
        <form>
          <Grid container spacing={2}>
            <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
              <InputText
                name={"title"}
                label={"Title"}
                value={this.state.title}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>
            <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
              <InputText
                name={"organization"}
                label={"Organization"}
                value={this.state.organization}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>
            <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
              <SelectOption
                name={"priority"}
                label={"Priority"}
                value={this.state.priority}
                options={Priority}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>

            <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
              <InputDate
                name={"startDate"}
                label={"Start Date"}
                value={this.state.startDate}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>
            <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
              <InputDate
                name={"dueDate"}
                label={"Due Date"}
                value={this.state.dueDate}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>
            <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
              <SelectOption
                name={"status"}
                label={"Status"}
                value={this.state.status}
                options={Status}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>
            <Grid className="form-item" item xs={12} sm={12} md={12} lg={12}>
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                id="description"
                name="description"
                rows={this.rows}
                value={this.state.description}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              ></textarea>
            </Grid>
          </Grid>

          <br />
          <Collapse in={this.state.openErrorPanel}>
            <Alert
              severity="error"
              onClose={() => this.setState({ openErrorPanel: false })}
            >
              <AlertTitle>Error</AlertTitle>
              {this.state.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </Alert>
          </Collapse>
          <br />

          <Grid
            container
            spacing={2}
            className="form-button-group"
            justifyContent="flex-end"
          >
            <Grid item xs={4} sm={3} md={2} lg={2}>
              <Button
                type="submit"
                variant="outlined"
                startIcon={<SaveIcon />}
                fullWidth
                onClick={(e) => this.handleSave(e)}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={4} sm={3} md={2} lg={2}>
              <Button variant="outlined" startIcon={<CancelIcon />} fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default AddTask;