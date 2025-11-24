import React from "react";
import '../../../../@core/assets/css/slick.css';
import MediaSliderBase from "@components/image-slider-crud/MediaSliderBase";
import {useMutation, useQuery} from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import SlidersServices from "@src/common/services/SliderService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import BreadCrumbs from "@components/breadcrumbs";

export default function () {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {isError, isLoading, refetch, data: sliders} = useQuery(
        ['mobile-sliders', preferredTableContentLocale],
        () => SlidersServices.getAll({
            presentingType: 'MOBILE', locale: preferredTableContentLocale}),
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => SlidersServices.deleteObject(data.id),
        {
            onSuccess: () => {
                refetch();
                showSuccessAlert({});
            },
            onError: () => {
                showErrorAlert({})
            }
        }
    );
    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row)
    };

    if (isError) {
        return (
            <ErrorPage title={"Mobile Sliders"}/>
        )
    }

    const openAddPage = (item) => {
        navigate(makeLocaleUrl(`/mobile-sliders/add`));
    };

    const openEditPage = (item) => {
        navigate(makeLocaleUrl(`/mobile-sliders/edit/${item.id}`));
    };

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/mobile-sliders/view/${item.id}`));
    };

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_SLIDER_ADD,
        PERMISSIONS_NAMES.ROLE_SLIDER_UPDATE,
        PERMISSIONS_NAMES.ROLE_SLIDER_DELETE,
        PERMISSIONS_NAMES.ROLE_SLIDER_SHOW,
        PERMISSIONS_NAMES.ROLE_SLIDER_LIST,
    )

    return (
        <>
            <BreadCrumbs title={"mobile-sliders"} data={[]}/>
            <MediaSliderBase
                sliders={sliders}
                openAddModal={openAddPage}
                onDelete={onDelete}
                openEditPage={openEditPage}
                isLoading={isLoading}
                openViewPage={openViewPage}
                permissionObject={permissionObject}
            />
        </>
    )
};
