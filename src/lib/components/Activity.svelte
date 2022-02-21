<script lang="ts">
	import DurationUnitFormat from 'intl-unofficial-duration-unit-format';
	const duration = new DurationUnitFormat(undefined, {
		style: DurationUnitFormat.styles.LONG,
		format: '{days} {hours} {minutes} {seconds}'
	});
	import type { Activity } from '$lib/utils/tasks';
	import {
		selectedActivity,
		commentModalOpen,
		removeActivityModalOpen,
		now
	} from '$lib/stores/app';

	/// Components
	import { Card, Label, H3, Button } from 'attractions';
	import IconPencil from '~icons/mdi/Pencil';
	import IconTrash from '~icons/mdi/trash';

	/// State
	export let act: Activity;
	$: _duration = act.end
		? duration.format((act.end - act.start) / 1000)
		: duration.format(Math.max($now - act.start, 0) / 1000);
	$: from_date = new Date(act.start).toLocaleString(undefined, {
		timeStyle: 'medium',
		dateStyle: 'long'
	});
	$: to_date = act.end
		? new Date(act.end).toLocaleString(undefined, {
				timeStyle: 'medium',
				dateStyle: 'long'
		  })
		: new Date($now).toLocaleString(undefined, {
				timeStyle: 'medium',
				dateStyle: 'long'
		  });

	function comment() {
		$selectedActivity = act;
		$commentModalOpen = true;
	}

	function remove() {
		$selectedActivity = act;
		$removeActivityModalOpen = true;
	}
</script>

<Card class="act">
	<span>
		<Label>ID</Label>
		<H3>{act.id}</H3>
	</span>
	<span>
		<Label>From</Label>
		<H3>{from_date}</H3>
	</span>
	<span>
		<Label>To</Label>
		<H3>{to_date}</H3>
	</span>
	<span>
		<Label>Duration</Label>
		<H3>{_duration}</H3>
	</span>
	<span>
		<Label>Done</Label>
		<H3>{act.done ? 'Yes' : 'No'}</H3>
	</span>
	<span>
		<Label>Comment</Label>
		<H3>{act.comment || 'None'}</H3>
	</span>
	<span class="actions">
		<Button outline class="edit--icon" on:click={comment}>
			<IconPencil /> Comment
		</Button>
		<Button round outline danger class="edit--icon" on:click={remove}>
			<IconTrash />
		</Button>
	</span>
</Card>

<style lang="scss">
	.actions {
		justify-content: end;
		display: flex;
		gap: 1rem;
	}
	:global(.act) {
		display: grid;
		grid-template-rows: auto auto auto;
		gap: 1rem;
	}
	:global(.edit--icon) {
		justify-self: end;
	}
</style>
