import { APPWRITE_FALLBACK_HEADER } from '$lib/appwrite/client';

export async function load({ locals }) {
	return {
		fallbackHeader: locals.client.headers[APPWRITE_FALLBACK_HEADER],
		account: locals.account
	};
}
