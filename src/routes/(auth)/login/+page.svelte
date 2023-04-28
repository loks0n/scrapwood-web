<script>
	export let form;
</script>

<h1>Login</h1>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<form method="post">
	<label for="email">Email</label>
	<input type="email" name="email" id="email" />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" />
	<button type="submit">Login</button>
</form>

<style>
	form {
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr 3fr;
		font-size: 1.2rem;
	}

	button {
		grid-column: 1 / 3;
		font: inherit;
	}

	input {
		font: inherit;
	}
</style>
