<script>
	import account from '$lib/stores/account';
</script>

<div>
	<nav>
		<ul>
			<li>
				<a href="/">Listings</a>
			</li>
			<li>
				<a href="/listing/new">New Listing</a>
			</li>
		</ul>

		<ul>
			{#if $account}
				<li>Logged in as {$account.name}</li>
				<li>
					<form method="post" action="/logout">
						<button type="submit">Logout</button>
					</form>
				</li>
			{:else}
				<li>
					<a href="/login">Login</a>
				</li>
				<li>
					<a href="/register">Register</a>
				</li>
			{/if}
		</ul>
	</nav>
</div>

<style>
	div {
		max-width: 40em;
		margin: 0 auto;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5em;
		gap: 0.5em;
		border-bottom: 1px solid grey;
	}

	ul {
		display: flex;
		align-items: center;
		gap: 1em;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		font-size: 1.25rem;
	}
</style>
