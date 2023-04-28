import {
	SESSION_COOKIE_NAME,
	SESSION_COOKIE_NAME_LEGACY,
	deleteSession
} from '$lib/appwrite/client';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, locals }) => {
		if (!locals.account) throw redirect(301, '/');

		await deleteSession(locals.client);

		cookies.delete(SESSION_COOKIE_NAME);
		cookies.delete(SESSION_COOKIE_NAME_LEGACY);

		throw redirect(301, '/');
	}
};
