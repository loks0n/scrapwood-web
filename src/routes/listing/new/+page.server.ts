import { CORE_DB, Collections } from '$lib/appwrite/databases.js';
import { fail, redirect } from '@sveltejs/kit';
import { AppwriteException, Databases, ID, Permission, Role } from 'appwrite';

export function load({ locals }) {
	if (!locals.account) throw redirect(301, '/login');
}

export const actions = {
	default: async ({ request, locals }) => {
		const { client, account } = locals;
		if (!account) throw redirect(301, '/login');

		const data = await request.formData();

		const title = data.get('title') as string;
		const description = data.get('description') as string;
		const imageString = data.get('images') as string;

		const images = imageString.split(',');

		const databases = new Databases(client);

		let id: string;

		try {
			const listing = await databases.createDocument(
				CORE_DB,
				Collections.LISTINGS,
				ID.unique(),
				{
					title,
					description,
					images
				},
				[
					Permission.read(Role.any()),
					Permission.update(Role.user(account.$id)),
					Permission.delete(Role.user(account.$id))
				]
			);

			id = listing.$id;
		} catch (error) {
			const appwriteError = error as AppwriteException;
			return fail(500, { error: appwriteError.type });
		}

		throw redirect(301, `/listing/${id}`);
	}
};
