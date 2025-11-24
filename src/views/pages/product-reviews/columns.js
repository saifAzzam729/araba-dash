import CreateColumn from "../../../@core/components/table/CreateColumn";
import formatDescription from "@src/utility/helpers/formatDescription";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import StarIcon from "@components/start-icon/star-icon";


const userNameColumn = CreateColumn({
    name: "User Name",
    translateKey: 'product-review.table.userName',
    cellCustomizationFunction: (row) => <span>{row.userFullName}</span>,
});

const TitleColumn = CreateColumn({
    name: "Title",
    translateKey: 'product-review.table.title',
    cellCustomizationFunction: (row) => <span>{row.title}</span>,
});

const MessageColumn = CreateColumn({
    name: "Message",
    translateKey: 'product-review.table.message',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.message)}</span>,
});

const RateColumn = CreateColumn({
    name: "Rate",
    translateKey: 'product-review.table.rate',
    cellCustomizationFunction: (row) => {
 return [...Array(5)].map((_, idx) => (
        <StarIcon
            key={idx}
            color={idx < row.rate ? '#F3B81F' : '#DFE6ED'}
        />
    ))
},
});

const columns = [userNameColumn, TitleColumn, MessageColumn, RateColumn];

export const createColumns = (mutatuion, isLoading, width) => {
    if (width <= WindowBreakpoint.md) {
        return [
            userNameColumn,
            TitleColumn,
            RateColumn

        ]

    } else {
        return [
            userNameColumn,
            TitleColumn,
            MessageColumn,
            RateColumn
        ]
    }

}

export default columns;
