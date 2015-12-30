<template>
	<nav role="navigation">
		<ul>
			<li><a v-link="'home'">Home</a></li>
			<li><a v-link="'library'">Library</a></li>
			<li><a v-link="'shop'">Shop</a></li>
			<li><a v-link="'collection'">Collection</a></li>
		</ul>
	</nav>
	<div class="container">
		<router-view transition="slide"></router-view>
	</div>
</template>

<script>
import auth from '../auth';
export default {
	data() {
		return {
			user: auth.user
		}
	},
	methods: {
		logout() {
			auth.logout();
		}
	}
}
</script>