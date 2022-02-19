<script lang="ts">
	import { addModalOpen } from '$lib/stores/app';
	import { Button } from 'attractions';

	function add() {
		$addModalOpen = true;
	}
</script>

<nav aria-label="toolbar">
	<Button filled on:click={add}>Create Task</Button>
</nav>
