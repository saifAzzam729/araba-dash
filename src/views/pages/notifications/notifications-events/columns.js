import CreateColumn from "@components/table/CreateColumn";
import {Badge} from "reactstrap";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

const EventColumn = CreateColumn({
    name: "Event",
    translateKey: 'notifications.common.event',
    cellCustomizationFunction: (row) => <span>{row.event}</span>,
});

const TargetColumn = CreateColumn({
    name: "target",
    translateKey: 'notifications.common.target',
    cellCustomizationFunction: (row) => {
        if (row.target) {
            return (
                <Badge className='text-capitalize' color='light-success' pill>
                    {row.target}
                </Badge>
            );
        }
        return <span>_</span>;
    }
});

export const createColumns = (activeToggleMutation, isActiveToggleLoading, width) => {
    const ActiveToggleColumn = CreateColumn({
        name: "Active",
        translateKey: 'notifications.common.active',
        cellCustomizationFunction: (row) => (
            <ToggleBtnWithMutation
                item={row}
                mutation={activeToggleMutation}
                isLoading={isActiveToggleLoading}
                booleanKey={'active'}
            />
        ),
    });

    if (width <= WindowBreakpoint.sm) {
        return [
            EventColumn,
            ActiveToggleColumn
        ]

    }

    return [
        EventColumn,
        TargetColumn,
        ActiveToggleColumn
    ]
}
