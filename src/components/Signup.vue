<template>
	<div>
		<h2>Sign Up</h2>
		<p>Sign up for a free account to get some great quotes.</p>
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
		<button @click="submit()">Sign Up</button>
	</div>
</template>

<script>
import auth from '../auth';
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
			auth.signup(this, credentials, 'secretquote')
		}
	}
}
</script>