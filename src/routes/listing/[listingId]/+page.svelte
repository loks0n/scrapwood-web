<script>
	export let data;
</script>

<article>
	<h1>
		{data.listing.title}
	</h1>

	<div>
		{#each data.listing.images as image}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src={image} />
		{/each}
	</div>

	<p>
		{data.listing.description}
	</p>

	{#if data.account}
		<a href="/listing/{data.listing.$id}/edit">Edit</a>
	{/if}
</article>

<style>
	img {
		border-radius: 0.5em;
	}

	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}
</style>
