import { Buckets, CORE_DB, Collections, type Listing } from '$lib/appwrite/databases';
import { AppwriteException, Databases, Storage } from 'appwrite';

export const load = async ({ locals }) => {
	const databases = new Databases(locals.client);
	const storage = new Storage(locals.client);

	try {
		const response = await databases.listDocuments(CORE_DB, Collections.LISTINGS);
		const listings = response.documents as Listing[];

		const listingsWithThumbnail = listings.map(async (listing) => {
			const { href } = await storage.getFilePreview(
				Buckets.LISTING_IMAGES,
				listing.images[0],
				200,
				200
			);
			return { ...listing, thumbnail: href };
		});

		return {
			listings: Promise.all(listingsWithThumbnail)
		};
	} catch (error) {
		const appwriteError = error as AppwriteException;
		return {
			error: appwriteError.message
		};
	}
};
