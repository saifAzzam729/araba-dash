import CreateColumn from "../../../@core/components/table/CreateColumn";
import formatDescription from "@src/utility/helpers/formatDescription";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

const FirstNameColumn = CreateColumn({
    name: "First Name",
    translateKey:'contact-us.table.first-name',
    cellCustomizationFunction: (row) => <span>{row.firstName}</span>,
});

const LastNameColumn = CreateColumn({
    name: "Last Name",
    translateKey:'contact-us.table.last-name',
    cellCustomizationFunction: (row) => <span>{row.lastName}</span>,
});

const EmailColumn = CreateColumn({
    name: "Email",
    translateKey:'contact-us.table.email',
    cellCustomizationFunction: (row) => <span>{row.email}</span>,
});

const PhoneNumberColumn = CreateColumn({
    name: "Phone Number",
    translateKey:'contact-us.table.phone-number',
    cellCustomizationFunction: (row) => <span>{row.phoneNumber}</span>,
});

const MessageColumn = CreateColumn({
    name: "Message",
    translateKey:'contact-us.table.message',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.message)}</span>,
});

const StatusColumn = CreateColumn({
    name: "Status",
    translateKey:'contact-us.table.status',
    cellCustomizationFunction: (row) => <span>{row.status}</span>,
});


const columns = [FirstNameColumn, LastNameColumn, EmailColumn, PhoneNumberColumn, MessageColumn, StatusColumn];


export const createColumns = (width) => {
    if (width <= WindowBreakpoint.sm) {
        return [
            EmailColumn,
            MessageColumn,
            StatusColumn
        ]

    }
    if (width <= WindowBreakpoint.md) {
        return [
            FirstNameColumn,
            LastNameColumn,
            EmailColumn,
            MessageColumn,
            StatusColumn
        ]

    } else {
        return columns

    }
}

export default columns;
