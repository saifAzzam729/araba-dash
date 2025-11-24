import BreadCrumbs from "../../../@core/components/breadcrumbs";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import {useMutation, useQuery} from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import ProductGroupViewCard from "@src/views/pages/product-group/partials/ProductGroupViewCard";
import {Button, Col, Row} from "reactstrap";
import CustomAddCardMinimal from "@components/crud-card-minimal/CustomAddCardMinimal";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ProductGroupService from "@src/common/services/ProductGroupService";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import CustomCan from "@components/Authorize/CustomCan";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {PlusCircle} from "react-feather";

export default function () {
    const {translate} = useLocaleContext();
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();


    const [groupItemsList, setGroupItemsList] = useState([])
    const [searchTerm, setSearchTerm] = useState("");


    const {isError, isLoading, refetch} = useQuery(
        ['product-groups', searchTerm, preferredTableContentLocale],
        () => ProductGroupService.getPagination({
            page: 1, limit: 50, search: searchTerm, locale: preferredTableContentLocale
        }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                setGroupItemsList(items);
            }
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => ProductGroupService.deleteObject(data.id),
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

    const openAddPage = () => {
        navigate(makeLocaleUrl("/product-group/add"));
    };

    const openEditPage = (item) => {
        navigate(makeLocaleUrl(`/product-group/edit/${item.id}`));
    };

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row)
    }

    if (isError) {
        return (
            <ErrorPage title={"product-group"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_GROUP_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_GROUP_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_GROUP_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_GROUP_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_GROUP_LIST,
    )

    return (
        <>
            <BreadCrumbs title={"product-group"} data={[]}/>
            <Row className="justify-content-between mb-2">
                <Col lg="4" className="d-flex align-items-start px-0 px-lg-1 mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={translate('common.search')}
                        onKeyDown={(e) => {
                            if (e.keyCode == 13) {
                                setSearchTerm(e.target.value);
                            }
                        }}
                        defaultValue={searchTerm}
                        ref={(input) => {
                            if (input) {
                                input.value = searchTerm;
                            }
                        }}
                    />

                    <button className="btn btn-light mx-1" onClick={() => {
                        setSearchTerm('');
                    }}>
                        {translate('table.clear')}
                    </button>
                </Col>
                <Col md={6} lg={4} className="d-flex justify-content-end align-items-center">
                    <CustomCan permissionName={permissionObject?.add}>
                        <Button
                            onClick={openAddPage}
                            color="primary"
                            className=" d-flex align-items-center "
                            style={{gap: "0.5rem"}}
                        >
                            <PlusCircle size={20}/>
                            {translate('table.add-btn')}
                        </Button>
                    </CustomCan>

                </Col>
            </Row>



            <Row className="mb-2" style={{gap: '20px 0px'}}>
                {groupItemsList.map((item) => {
                    return (
                        <Col md={6} lg={4} key={item.id}>
                            <ProductGroupViewCard
                                item={item}
                                onEdit={openEditPage}
                                onDelete={onDelete}
                                permissionObject={permissionObject}
                            />
                        </Col>
                    );
                })}

            </Row>

        </>
    );
}
