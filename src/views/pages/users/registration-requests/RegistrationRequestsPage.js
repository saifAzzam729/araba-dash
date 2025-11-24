import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import translateColumns from "@src/utility/helpers/translateColumns";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import CreateColumn from "@components/table/CreateColumn";
import EditStatusColumn from "@src/views/pages/users/partials/EditStatusColumn";
import {useQuery} from "react-query";
import OptionsService from "@src/common/services/OptionsService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import UsersService from "@src/common/services/UsersService";
import useTable from "@components/table/useTable";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useContext} from "react";
import {AbilityContext} from "@src/utility/context/PermissionProvider";
import useWindowSize from "@hooks/useWindowSize";
import {createColumns} from "@src/views/pages/users/registration-requests/columns";
import useModal from "@components/modal/useModal";
import ViewUserModal from "@src/views/pages/users/modals/view";

export default function RegistrationRequestsPage() {
    const {translate} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();
    const ability = useContext(AbilityContext);
    const {width} = useWindowSize();

    const {
        isOpen: isViewModalOpen,
        closeModal: closeViewModal,
        openModal: openViewModal,
        item: viewItem,
    } = useModal();

    const {
        items,
        totalItemsCount,
        currentPage,
        searchTerm,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
        updateSearch,
    } = useTable();

    const {isError, isLoading, refetch} = useQuery(
        ["users", currentPage, searchTerm],
        () =>
            UsersService.getPagination({
                page: currentPage,
                search: searchTerm,
                locale: preferredTableContentLocale,
                type: 'COMPANY',
                status: 'ACCOUNT_AWAITING_APPROVAL'
            }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    );

    const {data: statusOptions} = useQuery(
        ['user-option-service', preferredTableContentLocale],
        () => OptionsService.getUserStatus({
            locale: preferredTableContentLocale
        }),
    );
    const onEditSuccess = () => {
        refetch();
        showSuccessAlert({});
    };


    const COLUMNS = createColumns(width)

    const hasPermissionToUpdateStatus = ability.can(PERMISSIONS_NAMES.ROLE_USER_UPDATE)

    const customColumns = hasPermissionToUpdateStatus
        ? [...COLUMNS,
            CreateColumn({
                name: "Status",
                translateKey: "users.table.status",
                minWidth: "200px",
                cellCustomizationFunction: (row) => (
                    <div>
                        <EditStatusColumn
                            row={row}
                            statusOptions={statusOptions ? statusOptions.data : []}
                            onEditSuccess={onEditSuccess}
                        />
                    </div>
                ),
            }),
        ]
        : COLUMNS;

    return (
        <>
            <BreadCrumbs title={"company"} data={[]}/>
            <TableBase
                columns={translateColumns(customColumns, translate)}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onSearch={updateSearch}
                isLoading={isLoading}
                defaultActionButtons={true}
                onView={openViewModal}
            />

            {isViewModalOpen &&
                <ViewUserModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            }
        </>
    )
}