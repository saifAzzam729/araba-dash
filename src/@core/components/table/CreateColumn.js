export default function ({
	name,
	cellCustomizationFunction,
	minWidth = "100px",
	...rest
}) {
	return {
		name,
		minWidth,
		cell: cellCustomizationFunction,
		...rest,
	};
}
