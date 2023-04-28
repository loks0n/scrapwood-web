<h1>Register</h1>
<form method="post">
	<label for="email">Email</label>
	<input type="email" name="email" id="email" />

	<label for="name">Name</label>
	<input type="text" name="name" id="name" />

	<label for="password">Password</label>
	<input type="password" name="password" id="password" />

	<button type="submit">Register</button>
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
