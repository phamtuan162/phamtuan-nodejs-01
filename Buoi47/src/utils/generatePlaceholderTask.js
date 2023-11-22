export const generatePlaceholderTask = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    column: column.column,
    content: "",
    columnName: column.columnName,
    FE_PlaceholderTask: true,
  };
};
