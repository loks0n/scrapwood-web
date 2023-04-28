<script lang="ts">
	import ImageUpload from '$lib/components/ImageUpload.svelte';

	export let form;

	let uploadedImages: { id: string; href: string }[] = [];
	$: imageIds = uploadedImages.map((image) => image.id).join(',');
</script>

<h1>Create New Listing</h1>

{#if form && form.error}
	<p>{form.error}</p>
{/if}

<ImageUpload bind:images={uploadedImages} />

<form method="post">
	<label for="title">Title</label>
	<input type="text" name="title" id="title" />

	<label for="description">Description</label>
	<textarea name="description" id="description" />

	<input type="hidden" name="images" value={imageIds} />

	<button type="submit">Create</button>
</form>

<style>
	form {
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr 3fr;
	}

	button {
		grid-column: 1 / 3;
	}
</style>
