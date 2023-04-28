import { SSR_SESSION_COOKIE_DOMAIN } from '$env/static/private';
import { createEmailPasswordSession } from '$lib/appwrite/session';
import { fail, type Cookies, redirect } from '@sveltejs/kit';
import type { AppwriteException } from 'appwrite';
import type { Cookie as SetCookie } from 'set-cookie-parser';

function setSessionCookies(cookies: Cookies, sessionCookies: SetCookie[]) {
	for (const cookie of sessionCookies) {
		cookies.set(cookie.name, cookie.value, {
			domain: SSR_SESSION_COOKIE_DOMAIN,
			secure: cookie.secure,
			sameSite: cookie.sameSite as import('cookie').CookieSerializeOptions['sameSite'],
			path: cookie.path,
			maxAge: cookie.maxAge,
			httpOnly: cookie.httpOnly,
			expires: cookie.expires
		});
	}
}

export const actions = {
	default: async ({ request, cookies, locals }) => {
		if (locals.account) return fail(400, { success: false, message: 'Already logged in' });

		const data = await request.formData();

		const email = data.get('email') as string;
		const password = data.get('password') as string;

		try {
			const sessionCookies = await createEmailPasswordSession(email, password);
			setSessionCookies(cookies, sessionCookies);
		} catch (error) {
			const appwriteError = error as AppwriteException;
			return fail(400, { success: false, message: appwriteError.message });
		}

		throw redirect(301, '/');
	}
};
