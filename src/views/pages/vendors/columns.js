import CreateColumn from "@components/table/CreateColumn";
import GenderDisplayer from "@components/gender-displayer/GenderDisplayer";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

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
const GenderColumn = CreateColumn({
    name: "Gender",
    translateKey: "users.table.gender",
    cellCustomizationFunction: (row) => (
        <div>
            <GenderDisplayer gender={row.gender.value}/>
        </div>
    ),
});

const UserTypeColumn = CreateColumn({
    name: "User Type",
    translateKey: "users.table.user-type",
    minWidth: "120px",
    cellCustomizationFunction: (row) => {
        return <span>{row.rolesGroups[0].name}</span>;
    },
});

export const createColumns = (mutation, isLoading, width) => {
    const BlockColumn = CreateColumn({
        name: "blocked user",
        translateKey: "users.table.blocked",
        cellCustomizationFunction: (row) => (
            <ToggleBtnWithMutation
                item={row}
                mutation={mutation}
                isLoading={isLoading}
                booleanKey={"blocked"}
            />
        ),
    });

    if (width <= WindowBreakpoint.sm) {
        return [
            FullNameColumn,
            UserTypeColumn,
            BlockColumn,
        ]

    } else if (width <= WindowBreakpoint.md) {
        return [
            FullNameColumn,
            PhoneNumberColumn,
            UserTypeColumn,
            BlockColumn,
        ]
    }
    return [
        FullNameColumn,
        PhoneNumberColumn,
        GenderColumn,
        UserTypeColumn,
        BlockColumn,
    ];
};

