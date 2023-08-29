import React, { useRef } from "react";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  addTaskFunc: (e: React.FormEvent) => void;
}

const AddTask = ({ task, setTask, addTaskFunc }: Props) => {
  // useRef is a hook used to refer to DOM elements or other values in a component.
  // useRef is used to store and access values without re-rendering the component.
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="add-task">
      <form
        className="add-task-form"
        onSubmit={(e) => {
          addTaskFunc(e);
        }}
      >
        <input
          type="text"
          placeholder="Input a task"
          className="task-name"
          value={task}
          // if there is no "onChange" then it will render by default as read-only field
          // Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
          onChange={(e) => setTask(e.target.value)}
          ref={inputRef}
        />
        <button className="add-task-submit" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTask;
