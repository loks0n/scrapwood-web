import { writable } from 'svelte/store';
import type { Models } from 'appwrite';

const store = writable<Models.User<Models.Preferences> | undefined>(undefined);

export default store;
