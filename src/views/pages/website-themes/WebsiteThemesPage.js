import BreadCrumbs from "@components/breadcrumbs";
import {useQuery} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import ErrorPage from "@components/ErrorPage/ErrorPage";

// ** Reactstrap Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'
import useModal from "@components/modal/useModal";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditWebsiteThemesModal from "@src/views/pages/website-themes/modals/edit";
import WebsiteThemeCard from "@src/views/pages/website-themes/partials/WebsiteThemeCard";
import {useState} from "react";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";

function WebsiteThemesPage() {

    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
        item: editItem,
    } = useModal();

    const [themes , setThemes] = useState([]);

    const {isError, isLoading,  refetch} = useQuery(
        ['themes'],
        () => MultiTypeSettingsService.getPagination({type : "THEME"}),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                setThemes(items);
            }
        }
    );

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    if (isError) {
        return (
            <ErrorPage title={"website-themes"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_ADD,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_UPDATE,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_DELETE,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_SHOW,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_LIST,
    )

    return (
        <>
            <BreadCrumbs title={"website-themes"} data={[]}/>
                <div className='website-themes'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {themes?.map((theme)=>{
                                return (
                                    <Grid xs={12} md={6} lg={4}>
                                        <WebsiteThemeCard theme={theme} openEditModal={openEditModal} permissionObject={permissionObject} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </div>

            {isEditModalOpen && (
                <EditWebsiteThemesModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

        </>
    )
}

export default WebsiteThemesPage