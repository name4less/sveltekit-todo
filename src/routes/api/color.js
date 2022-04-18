import { getAllColors } from '$lib/data/_color_db';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(req) {
	try {
		const colors = await getAllColors();
		return {
			status: 200,
			body: colors
		};
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
