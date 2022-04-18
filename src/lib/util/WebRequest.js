import DataError from './DataError';

export const getReq = async (url) => {
	try {
		const request = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (request.status >= 200 && request.status < 300) {
			return request.json();
		}
		throw new DataError(request.status, 'Error while getting data.');
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Internal server error'
		};
	}
};

export const postReq = async (url, body) => {
	try {
		console.log(url);
		const request = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (request.status >= 200 && request.status < 300) {
			return request.json();
		}
		throw new DataError(request.status, 'Error while posting data.');
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Internal server error'
		};
	}
};

export const deleteReq = async (url) => {
	try {
		const request = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (request.status >= 200 && request.status < 300) {
			return request.json();
		}
		throw new DataError(request.status, 'Error while deleting data.');
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Internal server error'
		};
	}
};

export const putReq = async (url, body) => {
	try {
		const request = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (request.status >= 200 && request.status < 300) {
			return request.json();
		}
		throw new DataError(request.status, 'Error while putting data.');
	} catch (error) {
		return {
			status: error.status || 500,
			error: error instanceof DataError ? error.message : 'Internal server error'
		};
	}
};
