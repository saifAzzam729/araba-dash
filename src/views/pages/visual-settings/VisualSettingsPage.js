import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useTable from "../../../@core/components/table/useTable";
import {Col, Row} from "reactstrap";
import VisualSettingsService from "../../../common/services/VisualSettingsService";
import VisualSettingsViewCard from "./custom-components/VisualSettingsViewCard";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";

export default function () {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();

    const {
        items,
        currentPage,
        searchTerm,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
    } = useTable();

    const {translate} = useLocaleContext()

    useQuery(
        ['visual-settings', currentPage, searchTerm,],
        () => VisualSettingsService.getPagination({page: currentPage, search: searchTerm, limit: 50}),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const openEditPage = (item) => {
        navigate(makeLocaleUrl(`/visual-settings/edit/${item.settingKey}`));
    };

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_VISUAL_SETTING_ADD,
        PERMISSIONS_NAMES.ROLE_VISUAL_SETTING_UPDATE,
        PERMISSIONS_NAMES.ROLE_VISUAL_SETTING_DELETE,
        PERMISSIONS_NAMES.ROLE_VISUAL_SETTING_SHOW,
        PERMISSIONS_NAMES.ROLE_VISUAL_SETTING_LIST,
    )


    return (
        <>
            <BreadCrumbs title={"visual-settings"} data={[]}/>
            <p className="mb-2">
                {translate('visual-settings.sub-header')}
            </p>
            <Row>
                {items.map((item) => {
                    { /* console.log(item) */
                    }
                    return (
                        <Col xs={12} md={6} lg={4} key={item.settingKey}>
                            <VisualSettingsViewCard
                                item={item}
                                onEdit={openEditPage}
                                onDelete={null}
                                onDuplicate={null}
                                permissionObject={permissionObject}
                            />
                        </Col>
                    );
                })}
            </Row>


        </>
    );
}
