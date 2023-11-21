import { useSelector, useDispatch } from "react-redux";
import "./columns.scss";
import { taskSlice } from "../../../stores/slices/taskSlice";
import { columnSlice } from "../../../stores/slices/columnSlice";
import { postTask } from "../../../services/postTask";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";
import { v4 as uuidv4 } from "uuid";
import { setLocalStorage } from "../../../utils/localStorage";
const { updateTask } = taskSlice.actions;
const { updateColumn } = columnSlice.actions;
function Colums({ columns }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const tasksOld = columns.reduce((acc, column) => {
    const { columnName } = column;
    const columnTasks = column.tasks.map(({ column, content }) => ({
      column,
      content,
      columnName: columnName,
    }));
    return acc.concat(columnTasks);
  }, []);
  const HandleAddTask = async (column) => {
    setLoading(true);
    const taskNew = {
      column: column.column,
      content: `Task ${tasksOld.length + 1}`,
      columnName: column.columnName,
    };
    const updatedTask = [...tasksOld, taskNew];

    postTask(updatedTask).then(async (data) => {
      if (data) {
        await dispatch(updateColumn(data.columns));
        await dispatch(updateTask(data.tasks));
        setLoading(false);
        toast.success("Thêm task mới thành công");
      }
    });
  };

  const HandleAddColumn = async () => {
    const column = parseInt(uuidv4().slice(0, 4), 16) % 10000;
    const newColumn = {
      column: `${column}`,
      columnName: `Column ${columns.length + 1}`,
      _id: uuidv4(),
    };
    const updatedColumn = [...columns, newColumn];
    await dispatch(updateColumn(updatedColumn));
    toast.success("Thêm column mới thành công");
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
                  setLoading={setLoading}
                />
              );
            })}
          </SortableContext>
        </div>
        <button className="btn-add" onClick={HandleAddColumn}>
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
