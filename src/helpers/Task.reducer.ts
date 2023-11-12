type TaskPayload = {
  oldTask: string;
  newTask: string;
};

type Payload = string | boolean | TaskPayload | undefined;
type Action = {
  type: string;
  payload?: Payload;
};
type State = {
  tasks: string[];
  completeTasks: string[];
  count: number;
  isFetching: boolean;
  error: string;
  isLoaded: boolean;
  isCompleted: boolean[];
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
};
// const initialState: State = {
//   tasks: [],
//   count: 0,
//   isFetching: false,
//   error: "",
//   isLoaded: false,
//   isAdding: false,
//   isEditing: false,
//   isDeleting: false,
// };
const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload as string],
        count: state.count + 1,
        isAdding: true,
        isLoaded: false,
      };
    case "ADD_TASK_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload as string],
        count: state.count + 1,
        isAdding: false,
        isLoaded: true,
      };
    case "ADD_TASK_FAILURE":
      return {
        ...state,
        error: action.payload as string,
        isAdding: false,
        isLoaded: false,
      };
    case "EDIT_TASK":
      return {
        ...state,
        isEditing: true,
        isLoaded: false,
      };
    case "EDIT_TASK_SUCCESS":
      if (
        typeof action.payload !== "string" &&
        typeof action.payload !== "boolean" &&
        action.payload?.oldTask &&
        action.payload?.newTask
      ) {
        const { oldTask, newTask } = action.payload;
        return {
          ...state,
          tasks: state.tasks.map((task: string) => {
            if (task === oldTask) {
              return newTask;
            }
            return task;
          }),
          isEditing: false,
          isLoaded: true,
        };
      }
      return state;

    case "EDIT_TASK_FAILURE":
      return {
        ...state,
        // error: action.payload,
        isEditing: false,
        isLoaded: false,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task: string) => task !== action.payload),
        count: state.count - 1,
        isCompleted: state.isCompleted.filter(
          (task: boolean) => task !== action.payload
        ),
        isDeleting: true,
        isLoaded: false,
      };
    case "DELETE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.filter((task: string) => task !== action.payload),
        count: state.count - 1,
        // isCompleted: state.isCompleted.filter(
        //   (isComplete: boolean, index: number) => {
        //     if (index === action.payload) {
        //       return !isComplete;
        //     }
        //     return isComplete;
        //   }
        // ),
        isDeleting: false,
        isLoaded: true,
      };
    case "DELETE_TASK_FAILURE":
      return {
        ...state,
        // error: action.payload!,
        isDeleting: false,
        isLoaded: false,
      };
    case "COMPLETE_TASK":
      return {
        ...state,
        completeTasks: [...state.completeTasks, action.payload as string],
        // tasks: state.tasks.filter((task: string) => task !== action.payload),
      };
    case "DELETE_COMPLETE_TASK":
      return {
        ...state,
        completeTasks: state.completeTasks.filter(
          (task: string) => task !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default taskReducer;
