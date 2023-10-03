const apiUrl = `https://rz4yjk-8080.csb.app/todos`;

export const getAllTodo = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

export const getTodo = async (id) => {
  const response = await fetch(apiUrl + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todo = await response.json();
  return todo;
};

export const postTodo = async (data) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataNew = await response.json();
  return dataNew;
};

export const deleteTodo = async (id) => {
  const response = await fetch(apiUrl + "/" + id, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const updateTodo = async (id, course, completed) => {
  const response = await fetch(apiUrl + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ course, completed }),
  });
  const data = await response.json();
  return data;
};
