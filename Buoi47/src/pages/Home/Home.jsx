import "./home.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../stores/middleware/fetchData";
import Colums from "../../components/Columns/Colums";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <div className="home">
      <Colums />
    </div>
  );
}

export default Home;
