import { tasks } from '$lib/stores/app';
type Timestamp = number;

export interface Activity {
	id: number;
	comment: string;
	start: Timestamp;
	end: Timestamp;
	done: boolean;
}

export interface Task {
	id: number;
	paid: boolean;
	rate: number;
	currency: string;
	label: string;
	description: string;
	activities: Activity[];
}

export function getId(ids: number[]): number {
	let id = 0;
	while (id === 0 || ids.includes(id)) {
		id = Math.floor(Math.random() * 10000);
	}
	return id;
}

export function createTask({
	label = '',
	description = '',
	paid = false,
	rate = 0,
	currency = 'USD'
} = {}) {
	if (!label) return;
	tasks.update((val) => {
		const id = getId(val.map((task) => task.id));
		const task = {
			id,
			label,
			description,
			paid,
			rate,
			currency,
			activities: []
		};
		val.push(task);
		return val;
	});
}

export function removeTask(id: number) {
	tasks.update((val) => {
		return val.filter((task) => task.id != id);
	});
}

export function startActivity(task: Task) {
	const id = getId(task.activities.map((activity) => activity.id));
	const activity = {
		id,
		comment: '',
		start: Date.now(),
		end: 0,
		done: false
	};
	task.activities.push(activity);
	tasks.update((val) => val);
	return activity;
}

export function endActivity(activity: Activity) {
	activity.end = Date.now();
	activity.done = true;
	tasks.update((val) => val);
	return activity;
}
