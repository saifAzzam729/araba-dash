import CreateColumn from "@components/table/CreateColumn";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";

const NameColumn = CreateColumn({
	name: "name",
	translateKey: 'states.table.name',
	cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const CountryColumn = CreateColumn({
	name: "name",
	translateKey: 'states.table.country',
	cellCustomizationFunction: (row) => <span>{row.country.name}</span>,
});


const columns = [NameColumn];

export const createColumns = (mutation, isLoading) => {
	return [
		NameColumn,
		CountryColumn,
		CreateColumn({
			name: "Published",
			translateKey: 'states.table.published',
			cellCustomizationFunction: (row) =>
				<ToggleBtnWithMutation
				item={row}
				mutation={mutation}
				isLoading={isLoading}
				/>,
		})
	]
}

export default columns;
