import React from 'react';
import { Select } from 'flowbite-react';

const SortFilterControls = ({ sortOption, onSortChange, filterOption, onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-1/2"
      >
        <option value="">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </Select>
      <Select
        value={filterOption}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-1/2"
      >
        <option value="">Filter By</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="highPriority">High Priority</option>
      </Select>
    </div>
  );
};

export default SortFilterControls;
