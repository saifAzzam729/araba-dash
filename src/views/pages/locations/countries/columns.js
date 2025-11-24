import CreateColumn from "@components/table/CreateColumn";
import {handleTogglePublish} from "@src/views/pages/locations/countries/data";
import SwitchBtnForTable from "@components/table/SwitchBtnForTable";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";

const NameColumn = CreateColumn({
	name: "Name",
	translateKey: 'countries.table.name',
	cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const PhoneNumberCodeColumn = CreateColumn({
	name: "Phone Number Code",
	translateKey: 'countries.table.phone-number-code',
	cellCustomizationFunction: (row) => <span>{row.phoneNumberCode}</span>,
});
const ISOColumn = CreateColumn({
	name: "ISO",
	translateKey: 'countries.table.iso',
	cellCustomizationFunction: (row) => <span>{row.iso2}</span>,
});
const ISO3Column = CreateColumn({
	name: "ISO3",
	// translateKey: 'iso3',
	cellCustomizationFunction: (row) => <span>{row.iso3 ?? '_'}</span>,
});
const StatusColumn = CreateColumn({
	name: "Status",
	translateKey: 'countries.table.published',
	cellCustomizationFunction: (row) => {
		return (
			<SwitchBtnForTable
				item={row}
				initalValue={row.active}
				confirmPromise={handleTogglePublish}
			/>
		);
	},
});

const columns = [NameColumn, PhoneNumberCodeColumn, ISOColumn, StatusColumn];

export const createColumns = (mutatuion, isLoading) => {
    return [
		NameColumn,
		PhoneNumberCodeColumn,
		ISOColumn,
		ISO3Column,
		CreateColumn({
			name: "Published To Website",
			translateKey: 'countries.table.published',
			cellCustomizationFunction: (row) => <ToggleBtnWithMutation
			item={row} mutation={mutatuion}
			isLoading={isLoading} booleanKey={'active'}/>,
		})
	]
}

export default columns;
