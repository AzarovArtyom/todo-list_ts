import React, { useState } from 'react';

import { ITask } from '../ToDo/ToDo';

import './ToDoList.css';

interface ToDoListProps {
  tasks: ITask[]

  onToggleDone(id: string): void

  onDelete(id: string): void

  onToggleEditMode(id: string): void

  onEdit(id: string, editedTitle: string): void
}

export const ToDoList: React.FC<ToDoListProps> = (
  {
    tasks,
    onToggleDone,
    onDelete,
    onToggleEditMode,
    onEdit,
  },
) => {
  /* const [editMode, setEditMode] = useState<boolean>(false) */
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [id, setId] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedTitle(event.target.value);
  };

  const handleSaveEditedTitleId = (id: string): void => {
    setId(id);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (editedTitle.trim() !== '') {
      onEdit(id, editedTitle);
      setId('');
      setEditedTitle('');
    }
  };

  const onClickEdit = (taskId: string, taskTitle: string): void => {
    handleSaveEditedTitleId(taskId);
    setEditedTitle(taskTitle);
    onToggleEditMode(taskId);
  };

  const onClickSave = (taskId: any): void => {
    handleSubmit(taskId);
    onToggleEditMode(taskId);
  };

  const handleFocus = (event: any): void => event.target.select();

  if (tasks.length === 0) {
    return (
      <div>
        <span>Задач не запланировано</span>
      </div>
    );
  }
  return (
    <ul>
      { tasks.map((task) => {
        const classes = ['task'];
        if (task.done) {
          classes.push('completed');
        }
        return (
          <li className={ classes.join(' ') } key={ task.id }>
            { task.editMode ? (
              <input
                type="text"
                value={ editedTitle }
                autoFocus
                onChange={ handleChange }
                onFocus={ handleFocus }
              />
            ) : (
              <label>
                <input
                  type="checkbox"
                  checked={ task.done }
                  onChange={ (): void => onToggleDone(task.id) }
                />
                <span>{ task.title }</span>
              </label>
            ) }
            <div className="ToDoList_task-icons">
              { !task.editMode ? (
                <i
                  className="material-icons ToDOList_task-icons_edit"
                  onClick={ (): void => onClickEdit(task.id, task.title) }
                >
                  edit
                </i>
              )
                : (
                  <i
                    className="material-icons ToDoList_task-icons_save"
                    onClick={ (): void => onClickSave(task.id) }
                  >
                    save
                  </i>
                ) }
              <i
                className="material-icons ToDoList_task-icons_delete"
                onClick={ (): void => onDelete(task.id) }
              >
                delete
              </i>
            </div>
          </li>
        );
      }) }
    </ul>
  );
};
