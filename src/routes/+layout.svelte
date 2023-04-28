<script>
	import { APPWRITE_FALLBACK_HEADER } from '$lib/appwrite/client';
	import Navigation from '$lib/components/Navigation.svelte';
	import SmallLayout from '$lib/layouts/SmallLayout.svelte';
	import account from '$lib/stores/account';
	import client from '$lib/stores/client';
	import '../app.css';

	export let data;

	$: if (data.fallbackHeader)
		client.update((client) => {
			client.headers[APPWRITE_FALLBACK_HEADER] = data.fallbackHeader;
			return client;
		});
	$: if (data.account) account.set(data.account);
</script>

<Navigation />

<SmallLayout>
	<slot />
</SmallLayout>
