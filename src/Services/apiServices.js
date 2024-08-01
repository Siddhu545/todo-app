import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const data = await response.json();
  console.log(data);
  return data.todos;  // Return the array of todos
};

export const addTodo = async (todo) => {
  const response = await fetch(`${API_URL}/add`, {  // Updated to correct endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  const data = await response.json();
  return data;  // Return the added todo object
};

export const updateTodo = async (id, todo) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...todo }), // Include the id in the payload
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response.json(); // Optional: return some data, e.g., success message
};
