<template>
	<main role="main" class="library">
		<article v-for="book in books">
			<header>
				<h2>{{book.title}}</h2>
			</header>
			<div class="content">
				{{book.content}}
			</div>
		</article>
	</main>
</template>

<script>
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
	}
}
</script>