import CreateColumn from "@components/table/CreateColumn";
import {formatDate} from "@utils";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import formatDateToISO from "@src/utility/helpers/formatDateToISO";

const NameColumn = CreateColumn({
    name: "Name",
    translateKey:'discount.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const CouponCodeColumn = CreateColumn({
    name: "CouponCode",
    translateKey:'discount.table.couponCode',
    cellCustomizationFunction: (row) => <span>{row.couponCode}</span>,
});

const ValueColumn = CreateColumn({
    name: "Value",
    translateKey:'discount.table.value',
    cellCustomizationFunction: (row) => {
        if (row.type === 'PERCENTAGE') {
            return <span>{row.value} %</span>;
        } else {
            return <span>{row.value}</span>;
        }
    },
});

const StartDateColumn = CreateColumn({
    name: "startDate",
    translateKey:'discount.table.start-date',
    cellCustomizationFunction: (row) => <span>{formatDateToISO(row.startDate)}</span>,
});

const ExpiryDateColumn = CreateColumn({
    name: "expiryDate",
    translateKey:'discount.table.expiry-date',
    cellCustomizationFunction: (row) => <>
        <span>{formatDateToISO(row.expiryDate)}</span>
    </>,
});

export const createColumns = (mutatuion, isLoading, width) => {

    if (width <= WindowBreakpoint.sm) {
        return [
            NameColumn,
            CouponCodeColumn,
            ExpiryDateColumn,
        ]
    } else if (width <= WindowBreakpoint.md) {
        return [
            NameColumn,
            CouponCodeColumn,
            ExpiryDateColumn,
            CreateColumn({
                name: "Active",
                translateKey:'discount.table.active',
                cellCustomizationFunction: (row) => <ToggleBtnWithMutation
                    item={row}
                    mutation={mutatuion}
                    isLoading={isLoading}
                    booleanKey={'active'}
                />,
            })
        ]
    } else {
        return [
            NameColumn,
            CouponCodeColumn,
            ValueColumn,
            StartDateColumn,
            ExpiryDateColumn,
            CreateColumn({
                name: "Active",
                translateKey:'discount.table.active',
                cellCustomizationFunction: (row) => <ToggleBtnWithMutation
                    item={row}
                    mutation={mutatuion}
                    isLoading={isLoading}
                    booleanKey={'active'}
                />,
            })
        ]
    }

}
