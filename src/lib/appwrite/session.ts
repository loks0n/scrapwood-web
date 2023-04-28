import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import { type Cookie, splitCookiesString, parseString } from 'set-cookie-parser';

const APPWRITE_PROJECT_HEADER = 'X-Appwrite-Project';
const APPWRITE_DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
	[APPWRITE_PROJECT_HEADER]: PUBLIC_APPWRITE_PROJECT
};

async function postEmailPasswordSession(email: string, password: string): Promise<Response> {
	const body = JSON.stringify({
		email,
		password
	});

	const reponse = await fetch(`${PUBLIC_APPWRITE_ENDPOINT}/account/sessions/email`, {
		body,
		method: 'POST',
		headers: APPWRITE_DEFAULT_HEADERS
	});

	if (reponse.status >= 400) {
		return Promise.reject({ reason: 'email_password_session_request_failed' });
	}

	return reponse;
}

function parseCookiesFromSetCookie(setCookie: string): Cookie[] {
	const cookiesStringArray = splitCookiesString(setCookie);
	return cookiesStringArray.map((cookie) => parseString(cookie));
}

export async function createEmailPasswordSession(
	email: string,
	password: string
): Promise<Cookie[]> {
	const response = await postEmailPasswordSession(email, password);

	const setCookie = response.headers.get('set-cookie');
	if (!setCookie) return Promise.reject({ reason: 'email_password_session_request_no_setcookie' });

	const cookies = parseCookiesFromSetCookie(setCookie);
	if (!cookies) return Promise.reject({ reason: 'email_password_session_request_no_cookie' });

	return cookies;
}
