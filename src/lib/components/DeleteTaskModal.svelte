<script lang="ts">
	import { goto } from '$app/navigation';

	import { selectedTask } from '$lib/stores/app';

	import { removeTask } from '$lib/utils/tasks';

	import { Modal, Dialog, Button } from 'attractions';
	import IconAlert from '~icons/mdi/alert';

	export let open: boolean = true;

	async function remove() {
		await goto('/');
		removeTask($selectedTask.id);
		open = false;
	}
</script>

<Modal bind:open>
	<Dialog title="Delete Task" closeCallback={() => (open = false)} danger>
		<div slot="title-icon">
			<IconAlert />
		</div>
		<p>Are you sure you want to delete this task?</p>
		<span class="actions">
			<Button danger filled on:click={remove}>Yes</Button>
		</span>
	</Dialog>
</Modal>

<style lang="scss">
	.actions {
		margin-top: 1rem;
		display: flex;
		gap: 1rem;
	}
</style>
