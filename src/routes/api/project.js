import { createProject, deleteProject, getProject, getAllProjects, updateProject } from '$lib/data/_project_db';
import { parse } from 'cookie';
import { isValidSession } from '../../lib/data/_auth_db';
import DataError from '$lib/util/DataError';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(req) {
	try {
		const {
			headers: { cookie },
			body: { project }
		} = req;
		const { session_id } = parse(cookie || '');
		const email = req.locals.user.email;
		const projectObj = JSON.parse(req.body);
		if (isValidSession(session_id, email)) {
			const created = await createProject(email, projectObj);
			return {
				status: 201,
				body: {
					success: true,
					body: created
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
			const projects = await getAllProjects(email);
			return {
				status: 200,
				body: projects
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
			body: { project }
		} = req;

		const projectObj = JSON.parse(req.body);
		const { session_id } = parse(cookie || '');
		const email = req.locals.user.email;

		if (isValidSession(session_id, email)) {
			let projectOld = await getProject(email, projectObj.id);
			if (!projectOld.error) {
				const updated = await updateProject({
					...projectObj,
					user_id: projectOld.user_id
				});
				return {
					status: 200,
					body: {
						task: {
							success: true,
							old: projectOld,
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
		const projectId = req.body;
		if (isValidSession(session_id, email)) {
			const project = await getProject(email, projectId);
			if (project) {
				const deleted = await deleteProject(projectId);
				return {
					status: 200,
					body: {
						success: true,
						deleted
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
