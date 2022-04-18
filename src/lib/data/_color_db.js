import DataError from '$lib/util/DataError';
import { getReq } from '$lib/util/WebRequest';

const API_URL = 'http://localhost:3004/colors';

export const getAllColors = async () => {
	try {
		const projects = await getReq(`${API_URL}`);
		return projects;
	} catch (err) {
		throw new DataError(err.status, err.message);
	}
};
