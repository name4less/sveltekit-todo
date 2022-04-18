/* eslint-disable no-unreachable */
import DataError from '$lib/util/DataError';
import { postReq, getReq, putReq, deleteReq } from '$lib/util/WebRequest';
import { getUserByEmail } from './_auth_db';

const API_URL = 'http://localhost:3004/tasks';

export const createTask = async (email, task) => {
	try {
		const { id } = await getUserByEmail(email);
		const created = await postReq(API_URL, {
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
			project_id: task.project_id,
			allDay: task.allDay,
			user_id: id,
			completed: false
		});
		return created;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const getAllTasks = async (email) => {
	try {
		const { id } = await getUserByEmail(email);
		const tasks = await getReq(`${API_URL}?user_id=${id}`);
		return tasks;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const getTask = async (email, taskId) => {
	try {
		const { id } = await getUserByEmail(email);
		const tasks = await getReq(`${API_URL}?user_id=${id}&id=${taskId}`);

		if (tasks.length > 0) {
			return tasks[0];
		} else {
			throw new DataError(401, 'Invalid data');
		}
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const updateTask = async (task) => {
	try {
		// TODO: implement task update in database
		const taskNew = await putReq(`${API_URL}/${task.id}`, {
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
			project_id: task.project_id,
			user_id: task.user_id,
			allDay: task?.allDay,
			completed: task.completed
		});
		return taskNew;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const deleteTask = async (taskId) => {
	try {
		// TODO: implement task creation
		const task = await deleteReq(`${API_URL}/${taskId}`);
		return task;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};
