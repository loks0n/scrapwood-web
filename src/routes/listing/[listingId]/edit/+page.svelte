<script lang="ts">
	import ImageUpload from '$lib/components/ImageUpload.svelte';

	export let data;

	let uploadedImages: { id: string; href: string }[] = data.listing.images;
	$: imageIds = uploadedImages.map((image) => image.id).join(',');
</script>

<h1>Edit Listing</h1>

<ImageUpload bind:images={uploadedImages} />

<form method="post">
	<label for="title">Title</label>
	<input type="text" name="title" id="title" value={data.listing.title} />

	<label for="description">Description</label>
	<textarea name="description" id="description">{data.listing.description}</textarea>

	<input type="hidden" id="images" name="images" value={imageIds} />

	<button type="submit">Update</button>
</form>
