/* eslint-disable no-unreachable */
import DataError from '$lib/util/DataError';
import { postReq, getReq, putReq, deleteReq } from '$lib/util/WebRequest';
import { getUserByEmail } from './_auth_db';

const API_URL = 'http://localhost:3004/projects';

export const createProject = async (email, project) => {
	try {
		const { id } = await getUserByEmail(email);
		const created = await postReq(API_URL, {
			title: project.title,
			color: project.color,
			user_id: id
		});
		return created;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const getAllProjects = async (email) => {
	try {
		const { id } = await getUserByEmail(email);
		const projects = await getReq(`${API_URL}?user_id=${id}`);
		return projects;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const getProject = async (email, projectId) => {
	try {
		const { id } = await getUserByEmail(email);
		const projects = await getReq(`${API_URL}?user_id=${id}&id=${projectId}`);

		if (projects.length > 0) {
			return projects[0];
		} else {
			throw new DataError(401, 'Invalid data');
		}
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const updateProject = async (project) => {
	try {
		const taskNew = await putReq(`${API_URL}/${project.id}`, {
			title: project.title,
			color: project.color,
			user_id: project.user_id
		});
		return taskNew;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};

export const deleteProject = async (projectId) => {
	try {
		const project = await deleteReq(`${API_URL}/${projectId}`);
		return project;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};
