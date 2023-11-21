import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Task({ task }) {
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
  return (
    <div
      ref={setNodeRef}
      style={dndKitTaskStyle}
      {...listeners}
      {...attributes}
      key={task._id}
      className="tasks-item"
    >
      <p>{task.content}</p>
    </div>
  );
}

export default Task;
