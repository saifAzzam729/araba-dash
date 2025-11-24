import CustomViewCard from "@components/crud-card/CustomViewCard";
import {UncontrolledTooltip} from "reactstrap";
import {Star} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const CustomChildren = ({item}) => {
    const {translate} = useLocaleContext()

    return (
        <>
            <UncontrolledTooltip target={`role-${item.id}`}>
                {item.standard ? translate('action-buttons.standard') : translate('action-buttons.added-by-admins')}
            </UncontrolledTooltip>
            <Star
                id={`role-${item.id}`}
                className={item.standard ? "text-success" : "text-warning"}
            />
        </>
    )
}
export default function RoleViewCard({item, onEdit = null, onDelete = null, onDuplicate = null, permissionObject={}}) {
    const {translate} = useLocaleContext()
    return (
        <CustomViewCard
            item={item}
            headingText={`${translate('roles.card-header')} ${item.roles.length}`}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            editBtnText={translate('action-buttons.edit-role')}
            deleteBtnText={translate('action-buttons.delete-role')}
            duplicateTooltipText={translate('action-buttons.duplicate-role')}
            topRightChildren={<CustomChildren item={item}/>}
            permissionObject={permissionObject}
        />
    )
}
