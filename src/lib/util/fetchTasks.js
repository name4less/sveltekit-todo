import { setTodos } from '$lib/stores/todos';

export const fetchTasks = async () => {
	const response = await fetch('http://localhost:3000/api/task', {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
	setTodos(response);
};
