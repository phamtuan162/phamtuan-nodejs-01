import Colums from "./Columns/Colums";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { mapOrder } from "../../utils/sort";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./Columns/Column";
import Task from "./Tasks/Task";
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_COLUMN",
  TASK: "ACTIVE_DRAG_ITEM_TASK",
};
function Board() {
  const columns = useSelector((state) => state.column.columns);

  const [orderedColumns, setOrderedColumn] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  useEffect(() => {
    setOrderedColumn(
      mapOrder(
        columns,
        columns.map((column) => column._id),
        "_id"
      )
    );
  }, [columns]);

  const HandleDragStart = (e) => {
    console.log(e);
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.column_id
        ? ACTIVE_DRAG_ITEM_TYPE.COLUMN
        : ACTIVE_DRAG_ITEM_TYPE.TASK
    );
    setActiveDragItemData(e?.active?.data?.current);
  };

  const HandleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(
        (orderedColumn) => orderedColumn._id === active.id
      );
      const newIndex = orderedColumns.findIndex(
        (orderedColumn) => orderedColumn._id === over.id
      );
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      //   const dndOrderedColumnsIds = dndOrderedColumns.map(
      //     (dndOrderedColumn) => dndOrderedColumn._id
      //   );

      setOrderedColumn(dndOrderedColumns);
    }

    setActiveDragItemData(null);
    setActiveDragItemId(null);
    setActiveDragItemType(null);
  };

  return (
    <DndContext onDragEnd={HandleDragEnd} onDragStart={HandleDragStart}>
      <Colums columns={orderedColumns} />
      <DragOverlay>
        {!activeDragItemType && null}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
          <Column column={activeDragItemData} />
        )}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.TASK && (
          <Task task={activeDragItemData} />
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;
