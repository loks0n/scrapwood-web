import { client } from '$lib/appwrite/client';
import type { Client } from 'appwrite';
import { writable } from 'svelte/store';

const store = writable<Client>(client);

export default store;
