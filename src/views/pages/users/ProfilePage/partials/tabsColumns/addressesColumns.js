import CreateColumn from "../../../../../../@core/components/table/CreateColumn";


const cityColumn = CreateColumn({
    name: "Location",
    translateKey: 'users.profile.addresses.table.location',
    cellCustomizationFunction: (row) => {

        const country = row.country?.name ?? '-';
        const state = row.state?.name ?? '-';
        const city = row.city?.name ?? '-';

        return (
            <div className={"d-flex flex-column gap-1 py-2"}>
                <span>{`${country} / ${state} / ${city}`}</span>
                <span>{row.streetAddress}</span>
            </div>
        )
    },
});

const notes = CreateColumn({
    name: "Notes",
    translateKey: 'users.profile.addresses.table.notes',
    cellCustomizationFunction: (row) => <span>{row.notes}</span>,
});
const isPrimaryColumn = CreateColumn({
    name: "Is Primary",
    translateKey: 'users.profile.addresses.table.primary',
    cellCustomizationFunction: (row) => <div>{row.primary ? 'Primary Address' : '-'}</div>,
});


const addressesColumns = [
    cityColumn,
    notes,
    isPrimaryColumn,
];

export default addressesColumns;
