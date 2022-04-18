import { writable } from 'svelte/store';

export const list = writable([]);

// set colors from db
export const setColors = (colors) => {
	list.set(colors);
};
