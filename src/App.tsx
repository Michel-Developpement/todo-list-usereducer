import React from "react";
import "./App.css";
import taskReducer from "./helpers/Task.reducer";

function App() {
  const [task, setTask] = React.useState("");
  const [state, dispatchTask] = React.useReducer(taskReducer, {
    tasks: [],
    completeTasks: [],
    count: 0,
    isFetching: false,
    error: "",
    isLoaded: false,
    isCompleted: [],
    isAdding: false,
    isEditing: false,
    isDeleting: false,
  });
  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.currentTarget.value;
    setTask(input);
    console.log(input);
  };
  const handleAddTask = () => {
    dispatchTask({ type: "ADD_TASK", payload: task });
    setTask("");
    console.log("handleAddTask");
    console.log(state.tasks);
  };
  const handleCompleteTask = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    dispatchTask({
      type: "COMPLETE_TASK",
      payload: state.tasks[index],
    });
    dispatchTask({
      type: "DELETE_TASK",
      payload: state.tasks[index],
    });
    console.log("handleCompleteTask");
  };
  const handleDeleteCompleteTask = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    dispatchTask({
      type: "DELETE_COMPLETE_TASK",
      payload: state.completeTasks[index],
    });
    console.log("handleDeleteCompleteTask");
  };
  const handleDeleteTask = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    dispatchTask({
      type: "DELETE_TASK",
      payload: state.tasks[index],
    });
    console.log("handleDeleteTask");
    console.log(state.tasks);
  };

  return (
    <>
      <h1 className="text-2xl">Task List</h1>
      <br />
      <input
        type="text"
        onChange={handleForm}
        defaultValue={task}
        value={task}
      />
      <button onClick={handleAddTask}>add task</button>
      <br />
      <p>Tasks : {state.count}</p>
      <ul className="w-1/2 mb-5">
        {state.tasks.map((task, index = 0) => (
          <li className="block" key={index}>
            <p className="inline">{task}</p>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleCompleteTask(e, index)
              }
            >
              complete
            </button>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleDeleteTask(e, index)
              }
            >
              delete
            </button>
            <button>edit</button>
          </li>
        ))}
      </ul>
      <hr />
      <p>Complete tasks {state.completeTasks.length}</p>
      <ul className="mt-5">
        {state.completeTasks.map((completeTask, index = 0) => (
          <li className="block" key={index}>
            <p className="inline">{completeTask}</p>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleDeleteCompleteTask(e, index)
              }
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
