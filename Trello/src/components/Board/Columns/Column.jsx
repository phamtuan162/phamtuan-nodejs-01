import Tasks from "../Tasks/Tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { columnSlice } from "../../../stores/slices/columnSlice";
import { taskSlice } from "../../../stores/slices/taskSlice";
import { toast } from "react-toastify";
import { postTask } from "../../../services/postTask";
const { updateTask } = taskSlice.actions;
const { updateColumn, editColumnName } = columnSlice.actions;
function Column({ column, HandleAddTask, setLoading, tasksOld }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [columnName, setColumnName] = useState(column.columnName);
  const inputRef = useRef(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: { ...column, column_id: column._id },
  });
  const dndKitCommonStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : undefined,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const HandleRemoveColumn = async (column) => {
    setLoading(true);

    const findTask = tasksOld.filter((item) => item.column !== column.column);
    const updatedTask = findTask.map(({ _id, ...rest }) => ({ ...rest }));
    postTask(updatedTask).then(async (data) => {
      if (data) {
        await dispatch(updateColumn(data.columns));
        await dispatch(updateTask(data.tasks));
        setLoading(false);
        toast.success("Xóa column thành công ");
      }
    });
  };

  const HandleClick = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setColumnName(e.target.value);
  };

  const HandleBlurInput = async (column) => {
    column.columnName = columnName;
    await dispatch(editColumnName(column));
    setIsEditing(false);
  };

  const handleInputKeyDown = (e, column) => {
    if (e.key === "Enter") {
      e.preventDefault();
      HandleBlurInput(column);
    }
  };

  return (
    <div ref={setNodeRef} style={dndKitCommonStyle} {...attributes}>
      <div className="column-item" key={column._id} {...listeners}>
        <div className="column-item-header">
          <div className="column-name" onClick={() => HandleClick()}>
            <div className="edit">0</div>
            {isEditing ? (
              <input
                ref={inputRef}
                value={columnName}
                onChange={handleInputChange}
                onBlur={() => HandleBlurInput(column)}
                onKeyDown={(e) => handleInputKeyDown(e, column)}
                type="text"
              />
            ) : (
              <p className="name">{column.columnName}</p>
            )}
          </div>
          <button
            className="btn-remove"
            onClick={() => HandleRemoveColumn(column)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              ></path>
            </svg>
          </button>
        </div>
        <div className="column-item-body">
          <Tasks column={column} setLoading={setLoading} tasksOld={tasksOld} />
        </div>
        <div
          className="column-item-footer"
          onClick={() => HandleAddTask(column)}
        >
          <button className="btn-add-task">
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
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Column;
