import React, { useState } from 'react';
import { Button, TextInput, Textarea, Select, Spinner, Alert } from 'flowbite-react';
import { addTodo } from '../Services/apiServices';

const AddToDoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const newTodo = {
        todo: title,  // This maps to 'todo' in the API
        completed: false,
        userId: 1, // Set the appropriate userId
      };
  
      await addTodo(newTodo);
      // Clear the form
      setTitle('');
      setDueDate('');
      setPriority('Medium');
      setDescription('');
    } catch (err) {
      setError('Failed to add ToDo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-4">
      <TextInput
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
        required
      />
      <TextInput
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full"
        min={getTodayDate()}
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Select>
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full"
      />
      {error && <Alert color="failure">{error}</Alert>}
      <Button color="success" type="submit" className="w-full" disabled={loading}>
        {loading ? <Spinner size="sm" /> : 'Add Task'}
      </Button>
    </form>
  );
};

export default AddToDoForm;
