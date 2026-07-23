<script lang="ts">
	import ModelsPage from './ModelsPage.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Models — catalog</title>
	<meta
		name="description"
		content="A fast, searchable catalog of AI model specifications, pricing, limits, and capabilities powered by models.dev."
	/>
</svelte:head>

<ModelsPage rows={data.rows} />
