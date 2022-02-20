<script lang="ts">
	import '../fonts.css';
	import '../app.scss';
	import '../reset.css';
	import 'normalize.css';
	import EditModal from '$lib/components/EditModal.svelte';
	import AddModal from '$lib/components/AddModal.svelte';
	import CommentModal from '$lib/components/CommentModal.svelte';

	import {
		addModalOpen,
		commentModalOpen,
		editModalOpen,
		removeTaskModalOpen,
		removeActivityModalOpen
	} from '$lib/stores/app';
	import DeleteTaskModal from '$lib/components/DeleteTaskModal.svelte';
	import DeleteActivityModal from '$lib/components/DeleteActivityModal.svelte';
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
<DeleteActivityModal bind:open={$removeActivityModalOpen} />
<DeleteTaskModal bind:open={$removeTaskModalOpen} />

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
