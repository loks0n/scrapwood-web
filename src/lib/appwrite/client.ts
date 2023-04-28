import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';
import { Account, Client } from 'appwrite';

const client = new Client();
client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT);
export { client };

export const APPWRITE_FALLBACK_HEADER = 'X-Fallback-Cookies';

export const SESSION_COOKIE_NAME = `a_session_${PUBLIC_APPWRITE_PROJECT}`;
export const SESSION_COOKIE_NAME_LEGACY = `a_session_${PUBLIC_APPWRITE_PROJECT}_legacy`;

export function setSession(client: Client, cookies: Cookies) {
	const sessionToken =
		cookies.get(SESSION_COOKIE_NAME) ?? cookies.get(SESSION_COOKIE_NAME_LEGACY) ?? '';
	if (!sessionToken) {
		client.headers[APPWRITE_FALLBACK_HEADER] = '';
		return;
	}

	client.headers[APPWRITE_FALLBACK_HEADER] = JSON.stringify({
		[SESSION_COOKIE_NAME]: sessionToken
	});
}

export function hasSession(client: Client) {
	return client.headers[APPWRITE_FALLBACK_HEADER] !== '';
}

export async function deleteSession(client: Client) {
	const accounts = new Account(client);
	await accounts.deleteSession('current');
	client.headers[APPWRITE_FALLBACK_HEADER] = '';
}
