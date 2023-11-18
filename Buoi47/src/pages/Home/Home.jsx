import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks, taskSlice } from "../../stores/slices/taskSlice";
function Home() {
  const tasks = useSelector((state) => state.task.tasks);

  const dispatch = useDispatch();
  console.log(tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  return <div>Home</div>;
}

export default Home;
