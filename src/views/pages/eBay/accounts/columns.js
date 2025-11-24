import CreateColumn from "@components/table/CreateColumn";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import {Badge} from "reactstrap";
import parseDate from "@src/common/helpers/ParseDate";


const TitleColumn = CreateColumn({
    name: "Name",
    translateKey: 'ebay.table.title',
    cellCustomizationFunction: (row) => <span>{row.title}</span>,
});

const EbayUsername = CreateColumn({
    name: "Username",
    translateKey: 'ebay.table.username',
    cellCustomizationFunction: (row) => <span>{row.ebayUsername}</span>,
});
const ActiveColumn = CreateColumn({
    name: "active",
    translateKey: 'ebay.table.active',
    cellCustomizationFunction: (row) => <Badge className='text-capitalize'
                                               color={row?.active === true ? 'light-success' : 'light-warning'} pill>
        {row.active === true ? 'yes' : 'no'}
    </Badge>,
});
const UuidColumn = CreateColumn({
    name: "uuid",
    translateKey: 'ebay.table.uuid',
    cellCustomizationFunction: (row) => <span>{row.uuid}</span>,
});
const ExpiredDateColumn = CreateColumn({
    name: "expireDate",
    translateKey: 'ebay.table.expireDate',
    cellCustomizationFunction: (row) => <span>{parseDate(row.refreshTokenExpirationDate)}</span>,
});

const columns = [TitleColumn,EbayUsername, UuidColumn, ExpiredDateColumn, ActiveColumn,];

export const createColumns = (width) => {

    if (width <= WindowBreakpoint.md) {
        return [TitleColumn, UuidColumn]

    } else {
        return columns
    }

}

export default columns;
