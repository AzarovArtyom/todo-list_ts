import React from "react";

import {ITask} from "../ToDo/ToDo";

import "./ToDoList.css"

interface ToDoListProps {
    tasks: ITask[]
    onToggle(id: string): void
    onDelete(id: string): void
}

export const ToDoList: React.FC<ToDoListProps> = ({tasks,onToggle, onDelete}) => {

    if(tasks.length === 0){
        return (
            <div>
                <span>Задач не запланировано</span>
            </div>
        )
    }
    return (
        <ul>
            {tasks.map(task => {
                const classes = ["task"]
                if (task.done) {
                    classes.push("completed")
                }
                    return (
                        <li className={classes.join(' ')} key={task.id}>
                            <label>
                                <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)}/>
                                <span>{task.title}</span>
                                <i className="material-icons" onClick={() => onDelete(task.id)}>delete</i>
                            </label>
                        </li>
                    )
            })}
        </ul>
    )
}