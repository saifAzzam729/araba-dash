import CustomViewCardMinimal from "../../../../@core/components/crud-card-minimal/CustomViewCardMinimal";
import {useLocaleContext} from "@src/providers/LocaleProvider";


export default function VisualSettingsViewCard({item, onEdit = null, onDelete = null, onDuplicate = null, onView = null, permissionObject={}}) {
    const {translate} = useLocaleContext()

    return (
        <CustomViewCardMinimal
            item={{...item, name: item.settingKey.replace('_', ' ')}}
            // iconChild={visual_settings_info?.[item.settingKey]?.icon ?? 'layout'}
            // iconChild={item.imageFileUrl ? item.imageFileUrl : 'layout'}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onView={onView}
            editBtnText={translate('action-buttons.edit-visual-setting')}
            deleteBtnText={translate('action-buttons.delete-visual-setting')}
            duplicateTooltipText={translate('action-buttons.duplicate-visual-setting')}
            viewBtnText={translate('action-buttons.view-visual-setting')}
            topRightChildren={null}
            permissionObject={permissionObject}
        />
    )
}
