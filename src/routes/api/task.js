import { createTask, deleteTask, getTask, getAllTasks, updateTask } from '$lib/data/_task_db';
import { parse } from 'cookie';
import { isValidSession } from '../../lib/data/_auth_db';
import DataError from '$lib/util/DataError';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(req) {
	// const { body, headers } = req;
	// console.log(body);
	// console.log(headers);
	try {
		const {
			headers: { cookie },
			body: { task }
		} = req;
		const { session_id } = parse(cookie || '');
		const email = req.locals.user.email;
		const taskObj = JSON.parse(req.body);
		if (isValidSession(session_id, email)) {
			const created = await createTask(email, taskObj.task);
			return {
				status: 201,
				body: {
					success: true,
					body: task
				}
			};
		}
		throw new DataError(401, 'Invalid session');
	} catch (err) {
		return handleError(err);
	}
}

export async function get(req) {
	try {
		const {
			headers: { cookie }
		} = req;
		const email = req.locals.user.email;
		const { session_id } = parse(cookie || '');
		if (isValidSession(session_id, email)) {
			const tasks = await getAllTasks(email);
			return {
				status: 200,
				body: tasks
			};
		}
		throw new DataError(401, 'Invalid session');
	} catch (err) {
		return handleError(err);
	}
}

export async function put(req) {
	try {
		const {
			headers: { cookie },
			body: { task }
		} = req;

		const taskObj = JSON.parse(req.body);
		const { session_id } = parse(cookie || '');
		const email = req.locals.user.email;

		if (isValidSession(session_id, email)) {
			let taskOld = await getTask(email, taskObj.id);
			if (!taskOld.error) {
				const updated = await updateTask({
					...taskObj,
					user_id: taskOld.user_id
				});
				return {
					status: 200,
					body: {
						task: {
							success: true,
							old: taskOld,
							updated
						}
					}
				};
			}
		}
		throw new DataError(401, 'Invalid session');
	} catch (err) {
		return handleError(err);
	}
}

export async function del(req) {
	try {
		const {
			headers: { cookie },
			body: { id }
		} = req;
		const { session_id } = parse(cookie || '');
		const email = req.locals.user.email;
		const taskId = req.body;
		if (isValidSession(session_id, email)) {
			const task = await getTask(email, taskId);
			if (task) {
				const taskDeleted = await deleteTask(taskId);
				return {
					status: 200,
					body: {
						success: true,
						taskDeleted
					}
				};
			}
		}
		throw new DataError(401, 'Invalid session');
	} catch (err) {
		return handleError(err);
	}
}

function handleError(error) {
	return {
		status: error.status,
		body: {
			error: error.message
		}
	};
}
