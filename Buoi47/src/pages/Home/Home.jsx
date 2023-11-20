import "./home.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../stores/middleware/fetchData";
import Board from "../../components/Board/Board";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="home">
      <Board />
    </div>
  );
}

export default Home;
