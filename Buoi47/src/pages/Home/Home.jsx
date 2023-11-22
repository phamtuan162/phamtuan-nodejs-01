import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchData } from "../../stores/middleware/fetchData";
import Board from "../../components/Board/Board";

function Home() {
  const columns = useSelector((state) => state.column.columns);
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const hasDataFetched = useRef(false);

  useEffect(() => {
    if (!hasDataFetched.current && (!columns.length || !tasks.length)) {
      dispatch(fetchData());
      hasDataFetched.current = true;
    }
  }, [columns, tasks]);

  return (
    <div className="home">
      <Board />
    </div>
  );
}

export default Home;
