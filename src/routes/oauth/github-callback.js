import { createSession, getUserByEmail, registerUser } from '$lib/data/_auth_db';
import { serialize } from 'cookie';

const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const SECRET = import.meta.env.VITE_GITHUB_CLIENT_SECRET;

export async function get(request) {
	try {
		const code = request.url.searchParams.get('code'); // get code from url
		const token = await getToken(code); // request token from github using code
		const user_data = await getUserData(token); // request user data from github
		const user = await getOrRegisterUser(user_data); // get user from db, or create if not exists
		const session = await createSession(user); // create session in db
		return {
			status: 302,
			headers: {
				location: '/app',
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
					email: user.email,
					avatar: user.avatar
				}
			}
		};
	} catch (error) {
		console.log(error);
		// something wrong, redirect them to sign in, dont set cookies
		return {
			status: 302,
			headers: {
				Location: '/login'
			}
		};
	}
}

async function getOrRegisterUser(user_data) {
	try {
		let user = await getUserByEmail(user_data.email); // request user from db
		if (user.error) {
			// if user does not exist in db, create new user
			user = await registerUser({
				email: user_data.email,
				password: '',
				avatar: user_data.avatar_url
			});
		}
		if (!user.error) return user;
		throw new Error(user.error);
	} catch (err) {
		throw new Error('Could not find or register user.');
	}
}

async function getUserData(token) {
	try {
		const user = await fetch('https://api.github.com/user', {
			method: 'GET',
			headers: {
				Authorization: `token ${token}`
			}
		});
		const { login, name, avatar_url } = await user.json();
		const email = await getEmail(token);
		return { email, avatar_url, github_username: login, name };
	} catch (err) {
		throw new Error('Authentication error has occured');
	}
}

async function getToken(code) {
	try {
		const response = await fetch(TOKEN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				client_id: CLIENT_ID,
				client_secret: SECRET,
				code
			})
		});
		const { access_token } = await response.json();

		return access_token;
	} catch (err) {
		throw new Error('Authentication error has occured.');
	}
}

async function getEmail(access_token) {
	try {
		const user_emails = await fetch('https://api.github.com/user/emails', {
			method: 'GET',
			headers: {
				Authorization: `token ${access_token}`
			}
		});
		const emails = await user_emails.json();
		// filter emails and get email with primary key true
		const filtered_emails = await emails.filter((email) => email.primary === true);
		return filtered_emails[0].email;
	} catch (error) {
		// couldn't extract primary email from github (this shouldnt happen)
		throw new Error('Authentication error has occured.');
	}
}
