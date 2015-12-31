<template>
	<main role="main" class="library">
		<div id="scene">
			<article v-for="book in books" class="layer" data-depth="{{ $index / 10 }}">
				<header>
					<h2>{{book.title}}</h2>
				</header>
				<div class="content">
					{{book.content}}
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