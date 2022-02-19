import { writable as localWritable } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

import type { Task, Activity } from '$lib/utils/tasks';
export const tasks = localWritable<Task[]>('tasks', []);
export const selectedTask = writable<Task>(null);
export const selectedActivity = writable<Activity>(null);
export const editModalOpen = writable<boolean>(false);
export const addModalOpen = writable<boolean>(false);
export const commentModalOpen = writable<boolean>(false);
