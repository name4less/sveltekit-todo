import { writable } from 'svelte/store';

export const list = writable([]);

// set projects from db
export const setProjects = (projects) => {
	list.set(projects);
};
