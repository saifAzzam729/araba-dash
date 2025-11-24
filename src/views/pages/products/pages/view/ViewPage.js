import React, {useState} from "react";
import {useParams} from "react-router-dom";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "@components/breadcrumbs";
import ProductsService from "../../../../../common/services/ProductsService";
import {useQuery} from "react-query";
import ProductTabsWrapper from "@src/views/pages/products/pages/view/partials/ProductTabsWrapper";
import ProductsTabsPanes from "@src/views/pages/products/pages/view/partials/ProductsTabsPanes";
import {VIEW_PAGE_TABS_IDS} from "@src/views/pages/products/pages/view/data";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import Spinner from "@components/spinner/Fallback-spinner";


const ViewPage = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState(VIEW_PAGE_TABS_IDS.INFO);
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {translate} = useLocaleContext()


    const {data, isLoading} = useQuery(['product', id, preferredTableContentLocale], () => ProductsService.getById(id, {
        locale: preferredTableContentLocale
    }))

    const product = data?.data ?? null;

    if (!product) {
        return (
            <><Spinner/></>

        )
    }

    const productImagePermissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_LIST,
    )

    const productAttributePermissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_LIST,
    )

    const productPermissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_LIST,
    )
    const productVariantsPermissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_LIST,
    )

    return (<>
        <BreadCrumbs title={"product-details-page"} data={[{title: translate('common.products'), link: "/products"}]}/>

        <ProductTabsWrapper
            productImagePermissionObject={productImagePermissionObject?.list}
            productAttributePermissionObject={productAttributePermissionObject?.list}
            productPermissionObject={productPermissionObject?.list} activeTab={activeTab} setActiveTab={setActiveTab}
            productVariantsPermissionObject={productVariantsPermissionObject?.list}
        />

        <ProductsTabsPanes activeTab={activeTab} product={product} />
    </>);
};

export default ViewPage;
