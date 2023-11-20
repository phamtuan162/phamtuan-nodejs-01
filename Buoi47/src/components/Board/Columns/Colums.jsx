import { useSelector, useDispatch } from "react-redux";
import "./columns.scss";
import { taskSlice } from "../../../stores/slices/taskSlice";
import { postTask } from "../../../services/postTask";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";

const { updates } = taskSlice.actions;
function Colums({ columns }) {
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const HandleAddTask = (column) => {
    setLoading(true);
    const taskNew = {
      content: `Task ${tasks.length + 1}`,
      columnName: column.columnName,
      column: column.column,
    };
    const tasksOld = columns.reduce((acc, col) => {
      const tasksForColumn = tasks
        .filter((task) => task.column === col.column)
        .map((task) => ({
          content: task.content,
          columnName: col.columnName,
          column: task.column,
        }));

      return [...acc, ...tasksForColumn];
    }, []);
    postTask([...tasksOld, taskNew]).then(async (data) => {
      if (data) {
        await dispatch(updates(data.tasks));
        setLoading(false);
        toast.success("Thêm task mới thành công");
      }
    });
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="column-list">
        <div className="column-list-container">
          <SortableContext
            items={columns?.map((c) => c._id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => {
              return (
                <Column
                  key={column._id}
                  column={column}
                  HandleAddTask={HandleAddTask}
                />
              );
            })}
          </SortableContext>
        </div>
        <button className="btn-add">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Add Column
        </button>
      </div>
    </>
  );
}

export default Colums;
