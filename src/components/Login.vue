<template>
	<div>
		<h2>Log In</h2>
		<p>Log in to your account to get some great quotes.</p>
		<div class="error" v-if="error">
			<p>{{ error }}</p>
		</div>
		<div class="form-group">
			<input
				type="text"
				class="form-control"
				placeholder="Enter your username"
				v-model="credentials.username"
			>
		</div>
		<div class="form-group">
			<input
				type="password"
				class="form-control"
				placeholder="Enter your password"
				v-model="credentials.password"
			>
		</div>
		<button @click="submit()">Log In</button>
		<button @click="login()">Log In With Lock</button>
	</div>
</template>

<script>
import auth from '../auth';

// Import the Lock instance
import {lock} from '../index';

export default {
	data() {
		return {
			// We need to initialize the component with any
			// properties that will be used in it
			credentials: {
				username: '',
				password: ''
			},
			error: ''
		}
	},
	methods: {
		submit() {
			var credentials = {
				username: this.credentials.username,
				password: this.credentials.password
			}
			// We need to pass the component's this context
			// to properly make use of http in the auth service
			auth.login(this, credentials, 'secretquote')
		},
		login() {
			// Show the Lock Widget and save the user's JWT on a successful login
			lock.show((err, profile, id_token) => {
				localStorage.setItem('profile', JSON.stringify(profile));
				localStorage.setItem('id_token', id_token);
			})
		},
		logout() {
			// Remove the profile and token from localStorage
			localStorage.removeItem('profile');
			localStorage.removeItem('id_token');
		}
	}
}
</script>