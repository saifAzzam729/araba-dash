function formatDescription(description) {
	if (description?.length > 100) {
		return `${description.slice(0, 80)}..`;
	} else {
		return description
	}
	
}

export default formatDescription;

