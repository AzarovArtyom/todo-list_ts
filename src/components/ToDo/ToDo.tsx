import React, {useState} from "react";

import {ToDoForm} from "../ToDoForm/ToDoForm";
import {ToDoList} from "../ToDoList/ToDoList";

import { nanoid } from 'nanoid';

import "./ToDo.css"

export interface ITask {
    id: string
    title: string
    done: boolean
}

export const ToDo: React.FC = () => {
    const [tasks, setTask] = useState<ITask[]>([])

    const handleAddTask = (title: string) => {
        const newTask: ITask = {
            id: nanoid(),
            title: title,
            done: false
        }
        setTask(prevState => [newTask, ...prevState])
    }

    const handleToggle = (id: string) => {
        setTask(prevState => prevState.map((task) => (task.id === id ? {...task, done: !task.done} : task)))
    }

    const handleDelete = (id: string) => {
        setTask(prevState => prevState.filter((task) => id !== task.id))
    }

    return (
        <div className="ToDo">
            <ToDoForm onAddTask={handleAddTask}/>
            <ToDoList
                tasks={tasks}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
        </div>
    )
}
