<script lang="ts">
	import '../fonts.css';
	import '../app.scss';
	import '../reset.css';
	import 'normalize.css';
	import EditModal from '$lib/components/EditModal.svelte';
	import AddModal from '$lib/components/AddModal.svelte';
	import CommentModal from '$lib/components/CommentModal.svelte';

	import { addModalOpen, commentModalOpen, editModalOpen } from '$lib/stores/app';
</script>

<svelte:head>
	<title>VanillaTimeTracker</title>
</svelte:head>
<main>
	<slot />
</main>

<EditModal bind:open={$editModalOpen} />
<CommentModal bind:open={$commentModalOpen} />
<AddModal bind:open={$addModalOpen} />

<style lang="scss">
	main {
		padding: 0.5rem;
		max-width: 1080px;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}
</style>
