import { useSelector } from "react-redux";
import "./tasks.scss";
function Tasks({ column }) {
  const tasks = useSelector((state) => state.task.tasks);

  const tasksColumn = tasks.filter((task) => task.column === column);
  return (
    <div className="tasks-list">
      {tasksColumn.length > 0
        ? tasksColumn.map(({ content, _id }) => {
            return (
              <div key={_id} className="tasks-item">
                <p>{content}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Tasks;
