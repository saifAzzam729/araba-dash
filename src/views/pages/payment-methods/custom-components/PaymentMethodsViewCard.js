import {UncontrolledTooltip} from "reactstrap";
import {CheckCircle, Circle} from "react-feather";
import CustomViewCardMinimal from "../../../../@core/components/crud-card-minimal/CustomViewCardMinimal";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const CustomChildren = ({item}) => {
    const {translate} = useLocaleContext()
    return (
        <>
            <UncontrolledTooltip target={`item-${item.id}`}>
                {item.publish ? translate('action-buttons.active') : translate('action-buttons.in-active')}
            </UncontrolledTooltip>
            {item.publish ? <CheckCircle
                        id={`item-${item.id}`}
                        className={"text-success"}
                /> : <Circle
                    id={`item-${item.id}`}
                    className={"text-warning"}
                />
            }

        </>
    )
}
export default function PaymentMethodsViewCard({item, onEdit = null, onDelete = null, onDuplicate = null, permissionObject={}}) {
    const {translate} = useLocaleContext()
    return (
        <CustomViewCardMinimal
            item={{...item, name: `${item.translations.en.name} - ${item.translations.ar.name}`}}
            withIconChild={false}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            editBtnText={translate('action-buttons.edit-payment-method')}
            deleteBtnText={translate('action-buttons.delete-payment-method')}
            duplicateTooltipText={translate('action-buttons.duplicate-payment-method')}
            topRightChildren={<CustomChildren item={item}/>}
            permissionObject={permissionObject}
        />
    )
}
