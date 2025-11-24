function formatDateForSend(dateString) {
	const date = new Date(dateString);
	return date
		.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			timeZone: "UTC"
		})
		.replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
}

export default formatDateForSend;