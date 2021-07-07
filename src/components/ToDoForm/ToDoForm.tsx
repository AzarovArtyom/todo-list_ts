import React, { useState } from 'react';
import './ToDoForm.css';

interface ToDoFormProps {
  onAddTask(title: string): void
}

export const ToDoForm: React.FC<ToDoFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (title.trim() !== '') {
      onAddTask(title);
      setTitle('');
    }
  };

  return (
    <div className="ToDoForm">
      <form className="ToDoForm-content" onSubmit={ handleSubmit }>
        <button className="ToDoForm-button material-icons" type="submit">add</button>
        <input
          className="ToDoForm-input"
          type="text"
          placeholder="Добавить задачу"
          autoFocus
          value={ title }
          onChange={ handleChange }
        />
      </form>
    </div>
  );
};
