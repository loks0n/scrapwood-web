<script lang="ts">
	import { Buckets } from '$lib/appwrite/databases';
	import client from '$lib/stores/client';
	import { ID, Storage } from 'appwrite';

	export let images: { id: string; href: string }[];

	$: storage = new Storage($client);

	let loading = false;
	let error: string | undefined;

	let imageLoaded: Record<string, boolean> = {};

	const postImage = async (file: File) => {
		const response = await storage.createFile(Buckets.LISTING_IMAGES, ID.unique(), file);
		return response.$id;
	};

	const getImagePreview = async (id: string) => {
		const response = await storage.getFilePreview(Buckets.LISTING_IMAGES, id, 150, 150);
		return response.href;
	};

	const handleImageLoad = (id: string) => {
		imageLoaded[id] = true;
	};

	const handleUpload = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!target.files || !target.files[0]) return;

		loading = true;
		error = undefined;

		try {
			const id = await postImage(target.files[0]);
			const href = await getImagePreview(id);
			images = [...images, { id, href }];
		} catch (err: any) {
			error = err.message;
		}

		loading = false;
		target.files = new DataTransfer().files;
	};
</script>

<div>
	{#if images.length > 0}
		<ul>
			{#each images as image}
				<li>
					<!-- svelte-ignore a11y-missing-attribute -->
					<img src={image.href} on:load={() => handleImageLoad(image.id)} />

					{#if imageLoaded[image.id]}
						<button
							on:click={() => {
								images = images.filter((i) => i.id !== image.id);
							}}
							on:keypress={() => {
								images = images.filter((i) => i.id !== image.id);
							}}>Remove</button
						>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	<label for="images">
		{#if loading}
			Uploading...
		{:else if error}
			{error}
		{:else}
			Upload images
		{/if}
	</label>
	<input id="images" name="images" type="file" disabled={loading} on:change={handleUpload} />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin-bottom: 1em;
	}
	img {
		max-height: 150px;
		border-radius: 0.5em;
		aspect-ratio: 1/1;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	li {
		position: relative;
	}

	button {
		bottom: 0.55em;
		right: 0.2em;
		position: absolute;
		background: red;
		border: none;
		border-radius: 0.5em;
		padding: 0.5em;
		display: grid;
		place-items: center;
		color: white;
		font-weight: 900;
	}

	button:hover {
		cursor: pointer;
		filter: brightness(0.8);
	}
</style>
