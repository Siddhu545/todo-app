import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  TextInput,
  Textarea,
  Select,
  Spinner,
  Alert,
} from "flowbite-react";

const ToDoList = ({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
  loading,
  error,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDescription, setEditDescription] = useState("");

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title); // Use 'todo.todo' here
    setEditDueDate(todo.dueDate || "");
    setEditPriority(todo.priority || "Medium");
    setEditDescription(todo.description || "");
  };

  const saveEdit = async (id) => {
    const updatedTodo = {
      todo: editTitle, // Use 'todo' property for the title
      dueDate: editDueDate,
      priority: editPriority,
      description: editDescription,
    };
    await editTodo(id, updatedTodo);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      {error && <Alert color="failure">{error}</Alert>}
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="flex items-center justify-between p-2 my-2 border-b border-gray-300">
            {editingId === todo.id ? (
              <div className="space-y-2">
                <TextInput
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full"
                />
                <TextInput
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full"
                  min={new Date().toISOString().split("T")[0]}
                />
                <Select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="w-full"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
                <Textarea
                  placeholder="Description (optional)"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <Button
                    size="xs"
                    color="success"
                    onClick={() => saveEdit(todo.id)}
                  >
                    Save
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span
                    className={`text-lg ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                  {todo.description && (
                    <p className="text-sm text-gray-600">{todo.description}</p>
                  )}
                  {todo.dueDate && (
                    <p className="text-sm text-gray-500">
                      Due Date: {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  <Badge
                    color={
                      todo.priority === "High"
                        ? "red"
                        : todo.priority === "Medium"
                        ? "yellow"
                        : "green"
                    }
                  >
                    {todo.priority}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="xs"
                    color="success"
                    onClick={() => toggleComplete(todo.id)}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </Button>
                  <Button
                    size="xs"
                    color="warning"
                    onClick={() => startEditing(todo)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default ToDoList;
