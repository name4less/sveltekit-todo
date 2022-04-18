import { writable } from 'svelte/store';

export const attemptingLogin = writable(false);

export const userDetails = writable(null);