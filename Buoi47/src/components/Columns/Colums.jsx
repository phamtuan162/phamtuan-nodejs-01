import { useSelector, useDispatch } from "react-redux";
import Tasks from "../Tasks/Tasks";
import "./columns.scss";
import { columnSlice } from "../../stores/slices/columnSlice";
const { addColumn } = columnSlice.actions;
function Colums() {
  const columns = useSelector((state) => state.column.columns);
  const dispatch = useDispatch();
  //   const HandleAddColumn = () => {
  //     const column = `Column ${columns.length + 1}`;
  //     const updatedColumns = [
  //       ...columns,
  //       {
  //         columnName: column,
  //         column: column.toLowerCase(),
  //       },
  //     ];
  //     dispatch(addColumn(updatedColumns));
  //   };
  console.log(columns);
  return (
    <div className="column-list">
      <div className="column-list-container">
        {columns.map(({ _id, columnName, column }) => {
          return (
            <div className="column-item" key={_id}>
              <div className="column-item-header">
                <div className="column-name">
                  <div className="edit">0</div>
                  {columnName}
                </div>
                <button className="btn-remove">
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
                <Tasks column={column} />
              </div>
              <div className="column-item-footer">
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
          );
        })}
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
  );
}

export default Colums;
