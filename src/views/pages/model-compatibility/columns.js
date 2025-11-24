import CreateColumn from "../../../@core/components/table/CreateColumn";
import {Badge} from "reactstrap";
import {formatDate} from "@utils";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";

const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'model-compatibility.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const BrandColumn = CreateColumn({
    name: "Brand",
    translateKey: 'model-compatibility.table.brand',
    cellCustomizationFunction: (row) => {
        const brandName = row.brand?.name;
        return (
            <>
                {!brandName && <span>_</span>}
                {brandName && (
                    <Badge color="primary" pill>
                        {brandName}
                    </Badge>
                )}
            </>
        );
    },
});

const DateOfCreationColumn = CreateColumn({
    name: "Created At",
    translateKey: "model-compatibility.table.created-at",
    cellCustomizationFunction: (row) => <div>
        {formatDate(row.createdAt)}
    </div>,
});

export const createColumns = (publishToggleMutation, isPublishToggleLoading) => {
    const PublishToggleColumn = CreateColumn({
        name: "Published To Website",
        translateKey: 'common.publish-to-website',
        cellCustomizationFunction: (row) => (
            <ToggleBtnWithMutation item={row} mutation={publishToggleMutation} isLoading={isPublishToggleLoading}
                                   booleanKey={'publish'}/>
        ),
    });

    return [
        NameColumn,
        BrandColumn,
        DateOfCreationColumn,
        PublishToggleColumn,
    ]
}
