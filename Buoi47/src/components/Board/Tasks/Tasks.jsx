import { useSelector } from "react-redux";
import { mapOrder } from "../../../utils/sort";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./tasks.scss";
import Task from "./Task";

function Tasks({ column }) {
  const tasks = useSelector((state) => state.task.tasks);

  const tasksColumn = tasks.filter((task) => task.column === column);

  const orderedTasks = mapOrder(
    tasksColumn,
    tasksColumn.map((taskColumn) => taskColumn._id),
    "_id"
  );

  return (
    <div className="tasks-list">
      <SortableContext
        items={orderedTasks?.map((c) => c._id)}
        strategy={verticalListSortingStrategy}
      >
        {orderedTasks.length > 0
          ? orderedTasks.map((task) => {
              return <Task key={task._id} task={task} />;
            })
          : ""}
      </SortableContext>
    </div>
  );
}

export default Tasks;
