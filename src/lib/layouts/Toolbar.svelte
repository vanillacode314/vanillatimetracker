<script lang="ts">
	import { tasks } from '$lib/stores/app';
	import { exportToJsonFile } from '$lib/utils';
	import { getId } from '$lib/utils/tasks';
	import { Button } from '@kahi-ui/framework';

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

	function importSingleTask() {
		async function handleFiles() {
			const file = this.files[0];
			const data = await file.text();
			const task = JSON.parse(data);
			const alreadyHasID = $tasks.some((t) => t.id === task.id);
			if (alreadyHasID) {
				alert(
					'The ID of the imported task conflicts with an existing task. Assigning new ID to the imported task.'
				);
				task.id = getId($tasks.map((t) => t.id));
			}
			$tasks.push(task);
			$tasks = $tasks;
			input.removeEventListener('change', handleFiles);
		}
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.addEventListener('change', handleFiles);
		input.click();
	}
</script>

<nav aria-label="toolbar">
	<Button for="create-task-overlay" palette="accent">Create Task</Button>
	<Button on:click={exportTasks}>Export All Tasks</Button>
	<Button on:click={importTasks}>Import Tasks</Button>
	<Button on:click={importSingleTask}>Import Single Task</Button>
</nav>

<style lang="scss">
	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
</style>
