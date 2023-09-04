import React, { useState, useEffect } from "react";
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
import Consts, { Priority, Status } from "../../constants/Consts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { draft } from "../../redux/reducers/TaskReducer";

interface Props {
  editMode: boolean;
}

const AddEditTask = ({ editMode }: Props) => {
  const taskService = new TaskService();
  const today = new Date().toJSON().substring(0, 10);
  const rows: number = 10;
  const navigate = useNavigate();
  const [state, setState] = useState({
    _id: "",
    title: "",
    description: "",
    startDate: today,
    dueDate: today,
    organization: "",
    priority: "1",
    status: "1",
    errors: [""],
    openErrorPanel: false,
    disabledButton: false,
    isLoading: false,
    isDraft: false,
  });
  const { taskId } = useParams();

  const dispatch = useDispatch();
  const stateRedux = useSelector((e: any) => e.task);

  useEffect(() => {
    if (editMode) {
      if (stateRedux.edit.isDraft && stateRedux.edit._id === taskId) {
        console.info("stateRedux: ", stateRedux);
        setState(stateRedux.edit);
      } else {
        setState({ ...state, isLoading: true });
        taskService
          .getById(taskId)
          .then((response: any) => {
            let items = response.data.items;
            if (items.length) {
              let item = items[0];
              setState({
                ...state,
                _id: item._id,
                title: item.title,
                description: item.description,
                startDate: format(
                  new Date(item.startDate as string),
                  Consts.FORMAT_DATE_YYYY_MM_DD
                ),
                dueDate: format(
                  new Date(item.dueDate as string),
                  Consts.FORMAT_DATE_YYYY_MM_DD
                ),
                organization: item.organization,
                priority: item.priority,
                status: item.status,
                isLoading: false,
              });
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    } else {
      if (stateRedux.add.isDraft) {
        setState(stateRedux.add);
      }
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, isDraft: true });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setState({
      ...state,
      errors: [],
      openErrorPanel: false,
      disabledButton: true,
    });

    if (isValid()) {
      const task: Task = {
        title: state.title,
        startDate: new Date(state.startDate),
        dueDate: new Date(state.dueDate),
        organization: state.organization,
        priority: parseInt(state.priority),
        status: parseInt(state.status),
        description: state.description,
      };

      if (editMode) {
        task._id = state._id;
      }

      taskService
        .save([task])
        .then((response: any) => {
          navigate("/");
        })
        .catch((error: any) => {
          console.error(error);
          let message = error.message;
          if (error.response?.data?.message) {
            message = error.response.data.message;
          }
          setState({
            ...state,
            errors: [message],
            openErrorPanel: true,
            disabledButton: false,
          });
        });
    }
  };

  const isValid = () => {
    const { title, startDate, dueDate, organization } = state;
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
      setState({
        ...state,
        errors: errors,
        openErrorPanel: true,
        disabledButton: false,
      });
    }

    return isValid;
  };

  return (
    <div className="task-information">
      <form>
        <Grid container spacing={2}>
          <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
            <InputText
              name={"title"}
              label={"Title"}
              value={state.title}
              required
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
            <InputText
              name={"organization"}
              label={"Organization"}
              value={state.organization}
              required
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
            <SelectOption
              name={"priority"}
              label={"Priority"}
              value={state.priority}
              options={Priority}
              required
              onChange={(e) => handleChange(e)}
            />
          </Grid>

          <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
            <InputDate
              name={"startDate"}
              label={"Start Date"}
              value={state.startDate}
              required
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
            <InputDate
              name={"dueDate"}
              label={"Due Date"}
              value={state.dueDate}
              required
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid className="form-item" item xs={12} sm={6} md={4} lg={4}>
            <SelectOption
              name={"status"}
              label={"Status"}
              value={state.status}
              options={Status}
              required
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid className="form-item" item xs={12} sm={12} md={12} lg={12}>
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              id="description"
              name="description"
              rows={rows}
              value={state.description}
              onChange={(e) => {
                handleChange(e);
              }}
            ></textarea>
          </Grid>
        </Grid>

        <br />
        <Collapse in={state.openErrorPanel}>
          <Alert
            severity="error"
            onClose={() => setState({ ...state, openErrorPanel: false })}
          >
            <AlertTitle>Error</AlertTitle>
            {state.errors.map((error) => (
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
              onClick={(e) => handleSave(e)}
              disabled={state.disabledButton}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={4} sm={3} md={2} lg={2}>
            <Link to="/">
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                fullWidth
                disabled={state.disabledButton}
                onClick={() => {
                  dispatch(draft({ editMode: editMode, data: state }));
                }}
              >
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEditTask;
