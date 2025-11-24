import CreateColumn from "@components/table/CreateColumn";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import {Badge} from "reactstrap";

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

const StatusColumn = CreateColumn({
    name: "Status",
    translateKey: "users.table.status",
    cellCustomizationFunction: (row) => {
        const { value, label } = row.status;
        const badgeColor = value === 'REJECTED' ? 'light-danger' : 'light-primary';

        return (
            <Badge color={badgeColor} pill>
                {label}
            </Badge>
        );
    }
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
            StatusColumn,
            BlockColumn,
        ]

    } else if (width <= WindowBreakpoint.md) {
        return [
            FullNameColumn,
            PhoneNumberColumn,
            UserTypeColumn,
            StatusColumn,
            BlockColumn,
        ]
    }
    return [
        FullNameColumn,
        PhoneNumberColumn,
        StatusColumn,
        UserTypeColumn,
        BlockColumn,
    ];
};
