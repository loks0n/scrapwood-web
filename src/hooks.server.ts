import { client, hasSession, setSession } from '$lib/appwrite/client';
import type { Handle } from '@sveltejs/kit';
import { Account } from 'appwrite';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.client = client;
	await setSession(client, event.cookies);

	if (hasSession(client)) {
		const accounts = new Account(client);
		event.locals.account = await accounts.get();
	}

	return await resolve(event);
};
