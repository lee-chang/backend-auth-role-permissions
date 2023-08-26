import { Task } from "../../interfaces/task.interface";
import TaskModel from "./task.model";

export const getAllTasks = async () => {
    const tasks = await TaskModel.find();
    return tasks;
}

export const getTaskById = async (id: string) => {
    const task = await TaskModel.findById(id);
    return task;
}

export const createdTask = async (task: Task) => {
    const newTask = new TaskModel(task);
    const taskCreated = await newTask.save();
    return taskCreated;
}

export const updateTaskById = async (id: string, task: Task) => {
    const updateTask = await TaskModel.findByIdAndUpdate(id, task, {new: true});
    return updateTask;
}

export const deleteTaskById = async (id: string) => {
    const deleteTask = await TaskModel.findByIdAndDelete(id);
    return deleteTask;
}


//MODEL RELATIONAL USER

export const getTaskByUser = async (id: string) => {
    const tasks = await TaskModel.find({user: id});
    return tasks;
}