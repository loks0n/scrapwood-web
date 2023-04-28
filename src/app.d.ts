// See https://kit.svelte.dev/docs/types#app

import type { Client, Models } from 'appwrite';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			client: Client;
			account: Models.User<Models.Preferences> | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
