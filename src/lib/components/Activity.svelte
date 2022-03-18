<script lang="ts">
	import DurationUnitFormat from 'intl-unofficial-duration-unit-format';
	const duration = new DurationUnitFormat(undefined, {
		style: DurationUnitFormat.styles.LONG,
		format: '{days} {hours} {minutes} {seconds}'
	});
	import type { Activity } from '$lib/utils/tasks';
	import { selectedActivity, now } from '$lib/stores/app';

	/// Components
	import { Card, Badge, Spacer, Button, Text } from '@kahi-ui/framework';

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
</script>

<Card.Container class="card-preview" palette="auto">
	<Card.Header>
		{act.id}
		<Spacer />
		{#if act.done}
			<Badge shape="pill" palette="affirmative">Done</Badge>
		{:else}
			<Badge shape="pill" palette="negative">Ongoing</Badge>
		{/if}
	</Card.Header>

	<Card.Section>
		<Text>From: <strong>{from_date}</strong></Text>
		<Text>To: <strong>{to_date}</strong></Text>
		<Text>Duration: <strong>{_duration}</strong></Text>
		<Text>Comment: <strong>{act.comment || 'None'}</strong></Text>
	</Card.Section>

	<Card.Footer>
		<Button
			is="label"
			palette="accent"
			on:click={() => ($selectedActivity = act)}
			for="comment-activity-overlay">Comment</Button
		>
		<Button
			is="label"
			palette="negative"
			for="activity-delete-overlay"
			on:click={() => ($selectedActivity = act)}>Delete</Button
		>
	</Card.Footer>
</Card.Container>
