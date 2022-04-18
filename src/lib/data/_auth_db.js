// src/routes/api/_db.js
import DataError from '$lib/util/DataError';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3004';

export const getUserByEmail = async (email) => {
	try {
		const request = await fetch(`${API_URL}/users?email=${email}`);
		const data = await request.json();
		if (data.length > 0) {
			return data[0];
		}
		throw new DataError(request.status, 'User not found');
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Inernal server error'
		};
	}
};

export const getUserById = async (id) => {
	try {
		const request = await fetch(`${API_URL}/users/${id}`);
		const data = await request.json();
		if (data) {
			return data;
		} else {
			throw new DataError(request.status, 'User not found');
		}
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Inernal server error'
		};
	}
};

export const getUserId = async (id) => {
	try {
		const request = await fetch(`${API_URL}/users?id=${id}`);
		const data = await request.json();
		if (data.length > 0) {
			return data[0];
		} else {
			throw new DataError(request.status, 'User not found');
		}
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Inernal server error'
		};
	}
};

export const registerUser = async (user) => {
	try {
		const existingUser = await getUserByEmail(user.email);

		if (existingUser.error) {
			// send a post request to api adding new user
			const request = await fetch(`${API_URL}/users`, {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (request.status === 201) {
				return user;
			}
		}
		throw new DataError(200, `User with email already exists`);
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Inernal server error'
		};
	}
};

export const createSession = async (user) => {
	try {
		const session = generateSessionId();
		const request = await fetch(`${API_URL}/users/${user.id}/sessions`, {
			method: 'POST',
			body: JSON.stringify(session),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (request.status >= 200 && request.status < 300) {
			return session;
		}
		throw new DataError(request.status, 'Error while creating session.');
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Inernal server error'
		};
	}
};

export const getSession = async (sessionId) => {
	// send a get request to api to get session
	try {
		const request = await fetch(`${API_URL}/sessions?id=${sessionId}`);
		const data = await request.json();
		const { userId } = data[0];
		if (!userId) throw new DataError(request.status, 'Unable to get userId from session');

		const user = await getUserById(userId);

		const { email, avatar } = user;
		if (!email) throw new DataError(request.status, 'Email and avatar not present');
		return {
			id: sessionId,
			email,
			avatar
		};
	} catch (error) {
		console.log('error getting session');
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Inernal server error'
		};
	}
};

export const removeSession = async (id) => {
	// send a delete request to api to remove session
	try {
		const request = await fetch(`${API_URL}/sessions/${id}`, {
			method: 'DELETE'
		});
		const data = await request.json();

		if (data.status === 200) {
			return { success: true };
		}
		throw new Error('Error while removing session');
	} catch (error) {
		return {
			success: false,
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Inernal server error'
		};
	}
};

export const isValidSession = async (sessionId, email) => {
	const { userId } = await getUserByEmail(email);
	const { id, error } = await getSession(sessionId);
	if (error) return false;
	return id === sessionId;
};

function generateSessionId() {
	return {
		id: uuidv4()
	};
}
