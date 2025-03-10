import {Task} from '../models/task.model.js';

const createTasks = async (req, res) => {
    try {
        const {title, description, dueDate, priority} = req.body;
        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
        })

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTasks = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {createTasks, getTasks, deleteTasks};