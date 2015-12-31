<template>
	<main role="main" class="library">
		<div id="scene">
			<article v-for="book in books" class="layer" data-depth="{{ $index / 10 }}">
				<div>
					<header>
						<h2><a href="#" v-on:click.prevent="showBook">{{book.title}}</a></h2>
					</header>
					<div class="content">
						{{book.content}}
					</div>
				</div>
			</article>
		</div>
	</main>
</template>

<script>
var parallax;

export default {
	data() {
		return {
			books: [
				{
					title: 'About Alandia',
					content: 'Placeholder'
				},
				{
					title: 'La Fée Verte',
					content: 'Placeholder'
				},
				{
					title: 'The Ritual',
					content: 'Placeholder'
				},
				{
					title: 'History of Absinthe',
					content: 'Placeholder'
				},
				{
					title: 'What is Absinthe?',
					content: 'Placeholder'
				}
			]
		}
	},
	methods: {
		showBook(evt) {
			console.log('show', evt);
		}
	},
	ready() {
		var scene = document.getElementById('scene');
		parallax = new Parallax(scene);
	},
	beforeDestroy() {
		parallax.disable();
	}
}
</script>