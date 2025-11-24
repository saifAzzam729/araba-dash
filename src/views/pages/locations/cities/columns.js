import CreateColumn from "@components/table/CreateColumn";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";

const NameColumn = CreateColumn({
	name: "name",
	translateKey: 'cities.table.name',
	cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const StateColumn = CreateColumn({
	name: "name",
	translateKey: 'cities.table.state',
	cellCustomizationFunction: (row) => <span>{row.state.name}</span>,
});

export const createColumns = (mutation, isLoading) => {
	return [
		NameColumn,
		StateColumn,
		CreateColumn({
			name: "Published",
			translateKey: 'cities.table.published',
			cellCustomizationFunction: (row) =>
				<ToggleBtnWithMutation
				item={row}
				mutation={mutation}
				isLoading={isLoading}
				/>,
		})
	]
}

