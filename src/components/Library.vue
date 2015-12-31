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
					title: 'Book One',
					content: 'Placeholder'
				},
				{
					title: 'Book Two',
					content: 'Placeholder'
				},
				{
					title: 'Book Three',
					content: 'Placeholder'
				},
				{
					title: 'Book Four',
					content: 'Placeholder'
				},
				{
					title: 'Book Five',
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