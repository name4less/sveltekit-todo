import { setProjects } from '$lib/stores/projects';

export const fetchProjects = async () => {
	const response = await fetch('http://localhost:3000/api/project', {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
	setProjects(response);
};
