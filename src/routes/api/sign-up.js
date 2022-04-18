import { createSession, registerUser } from '../../lib/data/_auth_db';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import DataError from '$lib/util/DataError';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body: { email, password } }) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const registeredUser = await registerUser({
			email,
			password: hashedPassword,
			avatar: ''
		});

		if (registeredUser.error) throw new DataError(registeredUser.status, registeredUser.error);

		const session = await createSession(registeredUser);
		if (session.error) throw new DataError(session.status, session.error);

		return {
			status: 200,
			headers: {
				'Set-Cookie': serialize('session_id', session.id, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
					maxAge: 60 * 60 * 24 * 7 // one week
				})
			},
			body: {
				user: {
					email
				}
			}
		};
	} catch (error) {
		return {
			status: error.status || 500,
			body: {
				error: error.message
			}
		};
	}
}
