import Colums from "./Columns/Colums";
import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { mapOrder } from "../../utils/sort";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./Columns/Column";
import Task from "./Tasks/Task";
import { postTask } from "../../services/postTask";
import { setLocalStorage } from "../../utils/localStorage";
import { cloneDeep } from "lodash";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_COLUMN",
  TASK: "ACTIVE_DRAG_ITEM_TASK",
};
function Board() {
  const columns = useSelector((state) => state.column.columns);
  const tasks = useSelector((state) => state.task.tasks);
  const newColumns = columns.map((column) => {
    const newTasks = tasks.filter((task) => task.column === column.column);
    const taskOrderIds = newTasks.map((task) => task._id);

    return { ...column, tasks: [...newTasks], taskOrderIds };
  });
  let tasksUpdated;
  const columnOrderIds = newColumns.map((column) => column._id);

  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingTask, setOldColumnWhenDraggingTask] =
    useState(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(newColumns, columnOrderIds, "_id"));
  }, [columns, tasks]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };
  const findColumnTaskId = (taskId) => {
    return orderedColumns.find((column) =>
      column?.tasks?.some((task) => task._id === taskId)
    );
  };

  const moveTaskBetweenDifferentColumns = (
    overColumn,
    overTaskId,
    active,
    over,
    activeColumn,
    activeDraggingTaskId,
    activeDraggingTaskData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overTaskIndex = overColumn?.tasks?.findIndex(
        (task) => task._id === overTaskId
      );
      let newTaskIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newTaskIndex =
        overTaskIndex >= 0
          ? overTaskIndex + modifier
          : overColumn?.tasks?.length + 1;
      const nextColumns = cloneDeep(prevColumns);

      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );

      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumn) {
        nextActiveColumn.tasks = nextActiveColumn.tasks.filter(
          (task) => task._id !== activeDraggingTaskId
        );
        nextActiveColumn.taskOrderIds = nextActiveColumn.tasks.map(
          (task) => task._id
        );
      }

      if (nextOverColumn) {
        nextOverColumn.tasks = nextOverColumn.tasks.filter(
          (task) => task._id !== activeDraggingTaskId
        );
        const rebuild_activeDraggingCardData = {
          ...activeDraggingTaskData,
          column: nextOverColumn.column,
        };

        nextOverColumn.tasks.splice(
          newTaskIndex,
          0,
          rebuild_activeDraggingCardData
        );
        nextOverColumn.taskOrderIds = nextOverColumn.tasks.map(
          (task) => task._id
        );
      }
      return nextColumns;
    });
  };
  const HandleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.column_id
        ? ACTIVE_DRAG_ITEM_TYPE.COLUMN
        : ACTIVE_DRAG_ITEM_TYPE.TASK
    );
    setActiveDragItemData(e?.active?.data?.current);
    if (!e?.active?.data?.current?.column_id) {
      setOldColumnWhenDraggingTask(findColumnTaskId(e?.active?.id));
    }
  };

  const HandleDragOver = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = e;
    if (!over || !active) return;

    const {
      id: activeDraggingTaskId,
      data: { current: activeDraggingTaskData },
    } = active;
    const { id: overTaskId } = over;

    const activeColumn = findColumnTaskId(activeDraggingTaskId);
    const overColumn = findColumnTaskId(overTaskId);
    if (!activeColumn || !overColumn) return;
    if (activeColumn._id !== overColumn._id) {
      moveTaskBetweenDifferentColumns(
        overColumn,
        overTaskId,
        active,
        over,
        activeColumn,
        activeDraggingTaskId,
        activeDraggingTaskData
      );
    }
  };

  const HandleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || !active) return;
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.TASK) {
      const {
        id: activeDraggingTaskId,
        data: { current: activeDraggingTaskData },
      } = active;
      const { id: overTaskId } = over;

      const activeColumn = findColumnTaskId(activeDraggingTaskId);
      const overColumn = findColumnTaskId(overTaskId);
      if (!activeColumn || !overColumn) return;
      if (oldColumnWhenDraggingTask._id !== overColumn._id) {
        moveTaskBetweenDifferentColumns(
          overColumn,
          overTaskId,
          active,
          over,
          activeColumn,
          activeDraggingTaskId,
          activeDraggingTaskData
        );
      } else {
        const oldColumnIndex = oldColumnWhenDraggingTask?.tasks?.findIndex(
          (item) => item._id === activeDragItemId
        );
        const newColumnIndex = overColumn?.tasks?.findIndex(
          (item) => item._id === overTaskId
        );
        const dndOrderedTasks = arrayMove(
          oldColumnWhenDraggingTask?.tasks,
          oldColumnIndex,
          newColumnIndex
        );
        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          targetColumn.tasks = dndOrderedTasks;
          targetColumn.taskOrderIds = dndOrderedTasks.map((task) => task._id);

          return nextColumns;
        });
      }
      tasksUpdated = orderedColumns.reduce((acc, column) => {
        const { columnName } = column;
        const columnTasks = column.tasks.map(({ _id, column, content }) => ({
          _id,
          column,
          content,
          columnName: columnName,
        }));
        return acc.concat(columnTasks);
      }, []);
      setLocalStorage("tasks", tasksUpdated);
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex(
          (orderedColumn) => orderedColumn._id === active.id
        );
        const newIndex = orderedColumns.findIndex(
          (orderedColumn) => orderedColumn._id === over.id
        );
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
        const columnsUpdated = dndOrderedColumns.map((column) => ({
          column: column.column,
          columnName: column.columnName,
          _id: column._id,
        }));

        setLocalStorage("columns", columnsUpdated);
        setOrderedColumns(dndOrderedColumns);
      }
    }

    setActiveDragItemData(null);
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setOldColumnWhenDraggingTask(null);
  };
  return (
    <DndContext
      onDragEnd={HandleDragEnd}
      onDragStart={HandleDragStart}
      onDragOver={HandleDragOver}
      sensors={sensors}
    >
      <Colums columns={orderedColumns} />
      <DragOverlay dropAnimation={dropAnimation}>
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
