import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { taskSlice } from "../../../stores/slices/taskSlice";
const { editTaskContent } = taskSlice.actions;

function Task({ task, HandleRemoveTask }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [taskContent, setTaskContent] = useState(task.content);
  const inputRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: { ...task, task_id: task._id },
  });
  const dndKitTaskStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : undefined,
  };
  const handleInputChange = (e) => {
    setTaskContent(e.target.value);
  };
  const HandleClick = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const HandleBlurInput = async (task) => {
    const updatedTask = { ...task, content: taskContent };
    await dispatch(editTaskContent(updatedTask));
    setIsEditing(false);
  };

  const handleInputKeyDown = (e, task) => {
    if (e.key === "Enter") {
      e.preventDefault();
      HandleBlurInput(task);
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={{
        ...dndKitTaskStyle,
        visibility: task?._id.includes("-placeholder-card")
          ? "hidden"
          : "visible",
        height: task?._id.includes("-placeholder-card") ? "1px" : "100px",
      }}
      {...listeners}
      {...attributes}
      key={task._id}
      className="tasks-item"
      onClick={HandleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={taskContent}
          onChange={handleInputChange}
          onBlur={() => HandleBlurInput(task)}
          onKeyDown={(e) => handleInputKeyDown(e, task)}
          type="text"
        />
      ) : (
        <p>{task.content}</p>
      )}

      <button className="btn-remove" onClick={() => HandleRemoveTask(task)}>
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
  );
}

export default Task;