import Vue from 'vue';
import App from './components/App.vue';
import Home from './components/Home.vue';
import Library from './components/Library.vue';
import Shop from './components/Shop.vue';
import Collection from './components/Collection.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Parallax from 'parallax-js';

Vue.use(VueResource);
Vue.use(VueRouter);

//const AUTH0_CLIENT_ID = 'F7aeZfiPqoL7Q6Z7c9P0qE87GVXZIJGf';
//const AUTH0_DOMAIN = 'mottokrosh.eu.auth0.com';

export var router = new VueRouter();

import auth from './auth';

// Check the users auth status when the app starts
//auth.checkAuth();

// Instantiate a Lock
//export var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

// Set up routing and match routes to components
router.map({
	'/home': {
		component: Home
	},
	'/library': {
		component: Library
	},
	'/shop': {
		component: Shop
	},
	'/collection': {
		component: Collection
	},
	'/login': {
		component: Login
	},
	'/signup': {
		component: Signup
	}
});

// Redirect to the home route if any routes are unmatched
router.redirect({
	'*': '/home'
});

// Start the app on the #app div
router.start(App, '#app');