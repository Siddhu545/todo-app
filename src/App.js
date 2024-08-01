import React, { useState, useEffect } from 'react';
import AddToDoForm from './Components/AddToDoForm';
import ToDoList from './Components/ToDoList';
import SortFilterControls from './Components/SortFilterControls';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data.todos.map(todo => ({
          id: todo.id,
          title: todo.todo, // Mapping 'todo' to 'title'
          completed: todo.completed,
          // Add additional fields if needed, like dueDate or priority
        })));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Add a new task by making a POST request
  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {  // Correct endpoint for adding todos
        todo: newTodo.title, // Mapping 'title' to 'todo'
        completed: newTodo.completed,
        userId: 152, // Assuming a fixed userId for simplicity
        // Add additional fields here if needed, like dueDate or priority
      });
      setTodos([...todos, {
        id: response.data.id,
        title: response.data.todo, // Mapping 'todo' to 'title'
        completed: response.data.completed,
        // Add additional fields if returned from the API
      }]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle completion status by making a PUT request
  const toggleComplete = async (id) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        todo: updatedTodo.title, // Send the current title
        completed: !updatedTodo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  // Delete a task by making a DELETE request
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Edit a task by making a PUT request
  const editTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        todo: updatedTodo.title, // Mapping 'title' to 'todo'
        completed: updatedTodo.completed,
        // Add additional fields here if needed, like dueDate or priority
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        )
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const getSortedTodos = () => {
    let sortedTodos = [...todos];
    if (sortOption === 'dueDate') {
      sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOption === 'priority') {
      sortedTodos.sort((a, b) => {
        const priorities = { High: 1, Medium: 2, Low: 3 };
        return priorities[a.priority] - priorities[b.priority];
      });
    } else if (sortOption === 'title') {
      sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedTodos;
  };

  const getFilteredTodos = () => {
    let filteredTodos = getSortedTodos();
    if (filterOption === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    } else if (filterOption === 'pending') {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    } else if (filterOption === 'highPriority') {
      filteredTodos = filteredTodos.filter((todo) => todo.priority === 'High');
    }
    return filteredTodos;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <AddToDoForm addTodo={addTodo} />
      <SortFilterControls
        sortOption={sortOption}
        onSortChange={handleSortChange}
        filterOption={filterOption}
        onFilterChange={handleFilterChange}
      />
      <ToDoList
        todos={getFilteredTodos()}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
