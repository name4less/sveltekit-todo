import { writable } from 'svelte/store';

export const list = writable([]);

// set tasks from db
export const setTodos = (todos) => {
	list.set(todos);
};

export const insertTodo = (task) => {
	list.update((l) => {
		return [...l, task];
	});
};

export const insertTasksFromDB = (tasks) => {
	list.update((l) => {
		const newList = [...l];
		tasks.forEach((task) => {
			newList.push(task);
		});
		return newList;
	});
};

export const removeTodo = (index) => {
	list.update((l) => {
		const newList = [...l];
		let taskId;
		newList.forEach((task, i) => {
			if (task.id === index) {
				taskId = i;
			}
		});

		newList.splice(taskId, 1);
		return newList;
	});
};

// toggle completed status of index
export const toggleTodo = (index) => {
	list.update((l) => {
		const newList = [...l];
		let taskId;
		newList.forEach((task, i) => {
			if (task.id === index) {
				taskId = i;
			}
		});
		newList[taskId].completed = !newList[taskId].completed;
		return newList;
	});
};
