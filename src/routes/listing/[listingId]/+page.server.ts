import { Buckets, CORE_DB, Collections, type Listing } from '$lib/appwrite/databases';
import { error } from '@sveltejs/kit';
import { Databases, Storage } from 'appwrite';

export async function load({ params, locals }) {
	const databases = new Databases(locals.client);
	const storage = new Storage(locals.client);

	const listing = (await databases.getDocument(
		CORE_DB,
		Collections.LISTINGS,
		params.listingId
	)) as Listing;

	const imageUrlPromises = listing.images.map(async (image) => {
		const file = await storage.getFilePreview(Buckets.LISTING_IMAGES, image, 300, 300);
		return file.href;
	});

	const imageUrls = await Promise.all(imageUrlPromises);

	if (!listing) throw error(404, 'Not found');

	return {
		listing: { ...listing, images: imageUrls }
	};
}
