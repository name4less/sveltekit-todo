const AUTH_URL = 'https://github.com/login/oauth/authorize';
const CALLBACK_URL = 'http://localhost:3000/oauth/github-callback/';
const CLIENT_ID =
    import.meta.env.VITE_GITHUB_CLIENT_ID;

export async function get(request) {
    const state = 'Loremipsumdolorsitamet123';

    return {
        status: 302,
        headers: {
            Location: `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&state=${state}&scope=user:email`
        }
    };
}