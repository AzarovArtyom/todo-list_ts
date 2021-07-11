import React, { useState } from 'react';

import { ITask } from '../ToDo/ToDo';

import './ToDoList.css';

interface ToDoListProps {
  tasks: ITask[]

  onToggleDone(id: string): void

  onDelete(id: string): void

  onToggleEditMode(id: string): void

  onEdit(id: string, editedTitle: string): void

  onToggleShowInfo(id: string): void

  onAddComment(id: string, comment: string): void

  onToggleEditCommentMode(id: string): void

  onEditComment(id: string, editedComment: string): void
}

export const ToDoList: React.FC<ToDoListProps> = (
  {
    tasks,
    onToggleDone,
    onDelete,
    onToggleEditMode,
    onEdit,
    onToggleShowInfo,
    onAddComment,
    onToggleEditCommentMode,
    onEditComment,
  },
) => {
  /* const [editMode, setEditMode] = useState<boolean>(false) */
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedTitleId, setEditedTitleId] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [commentId, setCommentId] = useState<string>('');
  const [editedComment, setEditedComment] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedTitle(event.target.value);
  };

  const handleSaveEditedTitleId = (id: string): void => {
    setEditedTitleId(id);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (editedTitle.trim() !== '') {
      onEdit(editedTitleId, editedTitle);
      setEditedTitleId('');
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

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (comment.trim() !== '') {
      onAddComment(commentId, comment);
      setCommentId('');
      setComment('');
    }
  };

  const onClickEditComment = (taskId: string, taskComment: string): void => {
    setCommentId(taskId);
    setEditedComment(taskComment);
    onToggleEditCommentMode(taskId);
  };

  const handleChangeEditedComment = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedComment(event.target.value);
  };

  const handleSubmitEditedComment = (event: React.FormEvent<HTMLFormElement>): void => {
    if (editedComment.trim() !== '') {
      onEditComment(commentId, editedComment);
      setCommentId('');
      setEditedComment('');
    }
  };

  const onClickSaveEditedComment = (taskId: any): void => {
    handleSubmitEditedComment(taskId);
    onToggleEditCommentMode(taskId);
  };

  const onClickInfo = (taskId: any): void => {
    onToggleShowInfo(taskId);
    setCommentId(taskId);
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
    <div>
      { tasks.map((task) => {
        const classes = ['task'];
        if (task.done) {
          classes.push('completed');
        }
        return (
          <div key={ task.id }>
            <div className={ classes.join(' ') }>
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
                <i
                  className="material-icons ToDoList_task-icons_info"
                  onClick={ (): void => onClickInfo(task.id) }
                >
                  info
                </i>
                { !task.editMode ? (
                  <i
                    className="material-icons ToDoList_task-icons_edit"
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
            </div>
            { task.showInfo ? (
              <div className="ToDoList_task-info">
                <div className="ToDoList_task-info_date">
                  <div className="ToDoList_task-info_date_created">Создана:</div>
                  <div className="ToDoList_task-info_date_date">{ task.date }</div>
                </div>
                { !task.comment.trim() ? (
                  <form
                    className="ToDoList_task-info_comment_form"
                    onSubmit={ handleSubmitComment }
                  >
                    <button
                      className="ToDoForm-button_add-comment material-icons"
                      type="submit"
                    >
                      add
                    </button>
                    <input
                      className="ToDoList_task-info_comment_input"
                      type="text"
                      placeholder="Добавить комментарий"
                      onChange={ handleChangeComment }
                    />
                  </form>
                ) : (
                  <div>
                    { !task.editCommentMode ? (
                      <div className="ToDoList_task-info_comment">
                        <button
                          className="ToDoForm-button_edit-comment material-icons"
                          onClick={ (): void => onClickEditComment(task.id, task.comment) }
                        >
                          edit
                        </button>
                        <div
                          className="ToDoList_task-info_commentTitle"
                        >
                          { task.comment }
                        </div>
                      </div>
                    ) : (
                      <form
                        className="ToDOList_task-info_comment_form"
                      >
                        <button
                          className="ToDoForm-button_save-comment material-icons"
                          onClick={ (): void => onClickSaveEditedComment(task.id) }
                        >
                          save
                        </button>
                        <input
                          className="ToDoList_task-info_comment_input"
                          type="text"
                          value={ editedComment }
                          autoFocus
                          onChange={ handleChangeEditedComment }
                          onFocus={ handleFocus }
                        />
                      </form>
                    ) }

                  </div>
                ) }
              </div>
            ) : <span> </span> }
          </div>
        );
      }) }
    </div>
  );
};
