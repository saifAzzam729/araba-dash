import CreateColumn from "@components/table/CreateColumn";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";


const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'ebay-locations.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});
const EBayAccountColumn = CreateColumn({
    name: "account",
    translateKey: 'ebay-locations.table.account',
    cellCustomizationFunction: (row) => <span>{row.ebayAccount?.title}</span>
});
const CountryColumn = CreateColumn({
    name: "country",
    translateKey: 'ebay-locations.table.country',
    cellCustomizationFunction: (row) => <span>{row.country}</span>,
});
const CityColumn = CreateColumn({
    name: "city",
    translateKey: 'ebay-locations.table.city',
    cellCustomizationFunction: (row) => <span>{row.city}</span>,
});
const PostalCodeColumn = CreateColumn({
    name: "postalCode",
    translateKey: 'ebay-locations.table.postalCode',
    cellCustomizationFunction: (row) => <span>{row.postalCode}</span>,
});

const columns = [NameColumn, EBayAccountColumn, CountryColumn, CityColumn, PostalCodeColumn];

export const createColumns = (width) => {

    if (width <= WindowBreakpoint.md) {
        return [NameColumn, EBayAccountColumn, CountryColumn, CityColumn, PostalCodeColumn]

    } else {
        return columns
    }

}

export default columns;
