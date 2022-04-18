import { parse } from 'cookie';
import { getSession as getSessionFromApi } from './lib/data/_auth_db';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	// console.log(`Hook page request: ${request.url.pathname}`);
	const cookies = parse(request.headers.cookie || '');
	// console.log(`Parsed Cookie: ${JSON.stringify(cookies)}`);
	request.locals.user = null; // always destroy the user
	if (cookies.session_id && cookies.session_id.length > 0 && cookies.session_id != 'undefined') {
		// check if there is a session cookie
		const session = await getSessionFromApi(cookies.session_id); // validate with db
		// console.log(session);
		if (!session.error && session.id && session.email) {
			request.locals.user = { email: session.email, avatar: session.avatar };
			if (request.url.pathname === '/login' || request.url.pathname === '/register') request.url.pathname = '/'; // prevent logged in users from nav to login page
			return resolve(request);
		}
	}
	return resolve(request);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return request.locals.user
		? {
				user: {
					email: request.locals.user.email,
					avatar: request.locals.user.avatar
				}
		  }
		: {};
}
