import type { Models } from 'appwrite';

export const CORE_DB = 'scrapwood-core';

export const Collections = {
	LISTINGS: 'listings'
};

export const Buckets = {
	LISTING_IMAGES: 'listing_images'
};

export type Listing = Models.Document & { title: string; description: string; images: string[] };
