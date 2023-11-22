import { mapOrder } from "../../../utils/sort";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./tasks.scss";
import Task from "./Task";
import { getLocalStorage } from "../../../utils/localStorage";
import { taskSlice } from "../../../stores/slices/taskSlice";
import { postTask } from "../../../services/postTask";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const { updateTask } = taskSlice.actions;

function Tasks({ column, setLoading, tasksOld }) {
  const dispatch = useDispatch();
  const orderedTasks = mapOrder(column.tasks, column?.taskOrderIds, "_id");
  const HandleRemoveTask = (task) => {
    setLoading(true);

    const findTask = tasksOld.filter((item) => item._id !== task._id);
    const updatedTask = findTask.map(({ _id, ...rest }) => ({ ...rest }));

    postTask(updatedTask).then(async (data) => {
      if (data) {
        await dispatch(updateTask(data.tasks));
        setLoading(false);
        toast.success("Xóa task thành công");
      }
    });
  };
  return (
    <div className="tasks-list">
      <SortableContext
        items={orderedTasks?.map((c) => c._id)}
        strategy={verticalListSortingStrategy}
      >
        {orderedTasks.length > 0
          ? orderedTasks.map((task) => {
              return (
                <Task
                  key={task._id}
                  task={task}
                  HandleRemoveTask={HandleRemoveTask}
                />
              );
            })
          : ""}
      </SortableContext>
    </div>
  );
}

export default Tasks;
