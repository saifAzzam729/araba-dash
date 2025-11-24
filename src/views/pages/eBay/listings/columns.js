import CreateColumn from "@components/table/CreateColumn";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";


const TitleColumn = CreateColumn({
    name: "Name",
    translateKey: 'ebay-listing.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const AccountColumn = CreateColumn({
    name: "Account",
    translateKey: 'ebay-listing.table.accountName',
    cellCustomizationFunction: (row) => <span>{row.ebayAccount?.title}</span>,
});
const ReturnPolicyColumn = CreateColumn({
    name: "ReturnPolicy",
    translateKey: 'ebay-listing.table.returnPolicy',
    cellCustomizationFunction: (row) => <span>{row.ebayAccountReturnPolicy?.name}</span>,
});

const ShippingPolicyColumn = CreateColumn({
    name: "ShippingPolicy",
    translateKey: 'ebay-listing.table.shippingPolicy',
    cellCustomizationFunction: (row) => <span>{row.ebayAccountShippingPolicy?.name}</span>,
});
const SellingPolicyColumn = CreateColumn({
    name: "SellingPolicy",
    translateKey: 'ebay-listing.table.sellingPolicy',
    cellCustomizationFunction: (row) => <span>{row.ebayAccountSellingPolicy?.name}</span>,
});
const LocationPolicyColumn = CreateColumn({
    name: "LocationPolicy",
    translateKey: 'ebay-listing.table.location',
    cellCustomizationFunction: (row) => <span>{row.ebayAccountLocation?.name}</span>,
});

const columns = [TitleColumn, AccountColumn, LocationPolicyColumn, ReturnPolicyColumn, SellingPolicyColumn, ShippingPolicyColumn];

export const createColumns = (width) => {

    if (width <= WindowBreakpoint.md) {
        return [TitleColumn, AccountColumn, LocationPolicyColumn]

    } else {
        return columns
    }

}

export default columns;
