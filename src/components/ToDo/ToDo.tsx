import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { ToDoForm } from '../ToDoForm/ToDoForm';
import { ToDoList } from '../ToDoList/ToDoList';

import './ToDo.css';

export interface ITask {
  id: string
  title: string
  comment: string
  done: boolean
  editMode: boolean
  editCommentMode: boolean
  showInfo: boolean
  date: string
}

export const ToDo: React.FC = () => {
  const [tasks, setTask] = useState<ITask[]>([]);

  const handleAddTask = (title: string): void => {
    const newTask: ITask = {
      id: nanoid(),
      title,
      comment: '',
      done: false,
      editMode: false,
      editCommentMode: false,
      showInfo: false,
      date: new Date().toLocaleString(),
    };
    setTask((prevState) => [newTask, ...prevState]);
  };

  const handleToggleDone = (id: string): void => {
    const doneTasks = [...tasks].map((task: ITask) => (task.id === id
      ? { ...task, done: !task.done }
      : task));
    setTask(doneTasks);
  };

  const handleDelete = (id: string): void => {
    const deletedTasks = [...tasks].filter((task: ITask) => id !== task.id);
    setTask(deletedTasks);
  };

  const handleToggleEditMode = (id: string): void => {
    /* let updatedTasks = [...tasks.map((task: ITask) => task.id === id? {...task, editMode: !task.editMode}: task)] */
    setTask((prevState) => prevState.map((task) => (task.id === id ? { ...task, editMode: !task.editMode } : task)));
  };

  const handleEdit = (id: string, editedTitle: string): void => {
    setTask((prevState) => prevState.map((task: ITask) => (task.id === id ? { ...task, title: editedTitle } : task)));
  };

  const handleToggleEditCommentMode = (id: string): void => {
    /* let updatedTasks = [...tasks.map((task: ITask) => task.id === id? {...task, editMode: !task.editMode}: task)] */
    setTask((prevState) => prevState.map((task) => (task.id === id ? { ...task, editCommentMode: !task.editCommentMode } : task)));
  };

  const handleAddComment = (id: string, comment: string): void => {
    setTask((prevState) => prevState.map((task: ITask) => (task.id === id ? { ...task, comment } : task)));
  };

  const handleEditComment = (id: string, editedComment: string): void => {
    setTask((prevState) => prevState.map((task: ITask) => (task.id === id ? { ...task, comment: editedComment } : task)));
  };

  const handleToggleShowInfo = (id: string): void => {
    setTask((prevState) => prevState.map((task) => (task.id === id ? { ...task, showInfo: !task.showInfo } : task)));
  };

  return (
    <div className="ToDo">
      <ToDoForm onAddTask={ handleAddTask } />
      <ToDoList
        tasks={ tasks }
        onToggleDone={ handleToggleDone }
        onDelete={ handleDelete }
        onEdit={ handleEdit }
        onToggleEditMode={ handleToggleEditMode }
        onToggleShowInfo={ handleToggleShowInfo }
        onAddComment={ handleAddComment }
        onToggleEditCommentMode={ handleToggleEditCommentMode }
        onEditComment={ handleEditComment }
      />
    </div>
  );
};
