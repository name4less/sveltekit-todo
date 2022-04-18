import { createSession, getUserByEmail } from '../../lib/data/_auth_db';
import { serialize } from 'cookie';
import { normalizeEmail } from 'validator';
import bcrypt from 'bcrypt';

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function post({ body: { email, password } }) {
	try {
		const user = await attemptLogin(email, password);
		if (!user.error) {
			const { id } = await createSession(user);
			return {
				status: 200,
				headers: {
					'Set-Cookie': serialize('session_id', id, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: process.env.NODE_ENV === 'production',
						maxAge: 60 * 60 * 24 * 7 // one week
					})
				},
				body: {
					user: {
						email: user.email
					}
				}
			};
		}
		throw new Error('Invalid username or password');
	} catch (error) {
		return {
			status: 200,
			body: {
				error: error.message
			}
		};
	}
}

async function attemptLogin(email, password) {
	try {
		const normalizedEmail = normalizeEmail(email, { gmail_remove_dots: false });
		const user = await getUserByEmail(normalizedEmail);
		const valid = await bcrypt.compare(password, user.password);
		return valid ? user : { error: 'Invalid username or password' };
	} catch (err) {
		throw new Error('Server error while logging in');
	}
}
