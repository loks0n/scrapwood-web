import { Buckets, CORE_DB, Collections, type Listing } from '$lib/appwrite/databases';
import { error, fail, redirect } from '@sveltejs/kit';
import { AppwriteException, Databases, Storage } from 'appwrite';

export async function load({ params, locals }) {
	const databases = new Databases(locals.client);
	const storage = new Storage(locals.client);

	const listing = (await databases.getDocument(
		CORE_DB,
		Collections.LISTINGS,
		params.listingId
	)) as Listing;

	const imagePromises = listing.images.map(async (id) => {
		const { href } = await storage.getFilePreview(Buckets.LISTING_IMAGES, id, 300, 300);
		return { id, href };
	});

	const images = await Promise.all(imagePromises);

	if (!listing) throw error(404, 'Not found');

	return {
		listing: { ...listing, images }
	};
}

export const actions = {
	default: async ({ request, locals, params }) => {
		const data = await request.formData();

		const title = data.get('title') as string;
		const description = data.get('description') as string;
		const imagesString = data.get('images') as string;

		const images = imagesString.split(',');

		const databases = new Databases(locals.client);

		try {
			await databases.updateDocument(CORE_DB, Collections.LISTINGS, params.listingId, {
				title,
				description,
				images
			});
		} catch (error) {
			const appwriteError = error as AppwriteException;
			return fail(500, { error: appwriteError.type });
		}

		throw redirect(301, `/listing/${params.listingId}`);
	}
};
