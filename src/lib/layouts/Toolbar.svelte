<script lang="ts">
	import { addModalOpen, tasks } from '$lib/stores/app';
	import { exportToJsonFile } from '$lib/utils';
	import { Button } from 'attractions';

	function add() {
		$addModalOpen = true;
	}

	function exportTasks() {
		exportToJsonFile($tasks);
	}

	function importTasks() {
		const c = confirm('This will overwrite all your tasks.');
		if (c) {
			async function handleFiles() {
				const file = this.files[0];
				const data = await file.text();
				$tasks = JSON.parse(data);
				input.removeEventListener('change', handleFiles);
			}
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.addEventListener('change', handleFiles);
			input.click();
		}
	}
</script>

<nav aria-label="toolbar">
	<Button filled on:click={add}>Create Task</Button>
	<Button on:click={exportTasks}>Export All Tasks</Button>
	<Button on:click={importTasks}>Import Tasks</Button>
</nav>

<style lang="scss">
	nav {
		display: flex;
		gap: 1rem;
	}
</style>
