// get an integer from the difference between two dates in days
export function getDaysDifference(date1, date2) {
	let difference = Math.abs(date1 - date2);
	return Math.floor(difference / (1000 * 60 * 60 * 24));
}

// get the current day name
export function getDayName(date) {
	let day = new Date(date).getDay();
	return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
}

export function getDayAbbreviation(date) {
	let day = new Date(date).getDay();
	return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
}

// get month abbreviation for month number
export function getMonthAbbreviation(month) {
	return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
}

// get date as Mon 31 Jan
export function getDateAsString(date) {
	let day = new Date(date).getDay();
	let month = new Date(date).getMonth();
	let dayOfMonth = new Date(date).getDate();
	let year = new Date(date).getFullYear();
	return `${getDayAbbreviation(date)} ${dayOfMonth} ${getMonthAbbreviation(month)}`;
}

// create export function that returns 'today' if date is today, tomorrow if date is tomorrow, and the date if it is anything else
export function getDate(date) {
	let today = new Date();
	let tomorrow = new Date();
	let yesterday = new Date();
	tomorrow.setDate(today.getDate() + 1);
	yesterday.setDate(today.getDate() - 1);
	let day = new Date(date);
	if (day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()) {
		return 'Today';
	} else if (
		day.getDate() === tomorrow.getDate() &&
		day.getMonth() === tomorrow.getMonth() &&
		day.getFullYear() === tomorrow.getFullYear()
	) {
		return 'Tomorrow';
	} else if (
		day.getDate() === yesterday.getDate() &&
		day.getMonth() === yesterday.getMonth() &&
		day.getFullYear() === yesterday.getFullYear()
	) {
		return 'Yesterday';
		// } else if (getDaysDifference(day, date) < 5) {
		// 	return getDayName(date);
	} else {
		return `${day.getDate()} ${day.toLocaleString('default', { month: 'short' })}`;
	}
}

export function getDateQuickList() {
	let today = new Date();
	let tomorrow = new Date();
	let nextWeek = new Date();
	tomorrow.setDate(today.getDate() + 1);
	nextWeek.setDate(today.getDate() + 7);
	const quickList = [
		{ name: 'Today', date: today, abbrev: getDayAbbreviation(today) },
		{ name: 'Tomorrow', date: tomorrow, abbrev: getDayAbbreviation(tomorrow) },
		{ name: 'Next week', date: nextWeek, abbrev: getDateAsString(nextWeek) },
		{ name: 'No Date', date: null, abbrev: '' }
	];
	return quickList;
}

export function setTime(date, dateTime) {
	let newDate = new Date(date);

	const h = dateTime.getHours();
	const m = dateTime.getMinutes();

	newDate.setHours(h, m, 0);

	return newDate;
}

export function setMidnightTime(date) {
	let newDate = new Date(date);

	newDate.setHours(23, 59, 0);

	return newDate;
}

export function getCurrentWeek(date) {
	const taskDate = new Date(date);
	const curr = new Date(); // get current date
	const first = curr.getDate() - curr.getDay(); // First day is the  day of the month - the day of the week

	const firstday = new Date(curr.setDate(first)).toUTCString();
	const lastday = new Date(curr.setDate(curr.getDate() + 6)).toUTCString();

	return (
		new Date(taskDate).getTime() >= new Date(firstday).getTime() && new Date(taskDate).getTime() <= new Date(lastday).getTime()
	);
}
