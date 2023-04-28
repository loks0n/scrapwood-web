<script>
	export let data;
</script>

<h1>Listings</h1>

{#if data.error}
	<p>{data.error}</p>
{/if}

{#if data.listings}
	<ul>
		{#each data.listings as listing}
			<li>
				<a href="/listing/{listing.$id}"
					>{#if listing.images.length}
						<!-- svelte-ignore a11y-missing-attribute -->
						<img src={listing.thumbnail} />
					{/if}
					<p>
						{listing.title}
					</p>
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1em;
		flex-wrap: wrap;
	}

	li {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		border: 1px solid grey;
		border-radius: 0.5em;
		overflow: hidden;
	}

	p {
		margin: 0;
		padding: 0.5em;
	}
</style>
