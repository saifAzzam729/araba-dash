import CreateColumn from "@components/table/CreateColumn";
import GenderDisplayer from "@components/gender-displayer/GenderDisplayer";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

const EmailColumn = CreateColumn({
    name: "email",
    translateKey: 'affiliates.table.email',
    cellCustomizationFunction: (row) => <span>{row.email}</span>,
});

const FullNameColumn = CreateColumn({
    name: "Full Name",
    translateKey: "users.table.full-name",
    minWidth: "120px",
    cellCustomizationFunction: (row) => <span>{row.fullName}</span>,
});

const PhoneNumberColumn = CreateColumn({
    name: "Phone Number",
    translateKey: "users.table.phone-number",
    cellCustomizationFunction: (row) => <span>{row.phoneNumber}</span>,
});

const UserTypeColumn = CreateColumn({
    name: "User Type",
    translateKey: "users.table.user-type",
    minWidth: "120px",
    cellCustomizationFunction: (row) => {
        return <span>{row.rolesGroups[0].name}</span>;
    },
});

export const createColumns = (width) => {
    return [
        FullNameColumn,
        EmailColumn,
        PhoneNumberColumn,
        UserTypeColumn,
    ];
};

