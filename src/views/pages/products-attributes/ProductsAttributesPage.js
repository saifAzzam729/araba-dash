import BreadCrumbs from "@components/breadcrumbs";
import {useState} from 'react'
import {useQuery} from "react-query";
import ProductAttributesService from "@src/common/services/ProductAttributesService";
import AttributeTabsDisplayer from "@src/views/pages/products-attributes/edit-and-view/AttributeTabsDisplayer";
import AddForm from "@src/views/pages/products-attributes/add/AddForm";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

function ProductsAttributesPage() {

    const [isAddOpen, setIsAddOpen] = useState(false);
    const {preferredTableContentLocale} = useSettingsUiContext()

    const {refetch: refetchingAllAttributes, isLoading: attributesIsLoading,  data} = useQuery(
        ['products-attributes', preferredTableContentLocale],
        () => ProductAttributesService.getPagination({
            sort: 'a.id', limit: 50, locale: preferredTableContentLocale
        }),
    );


    const attributes = data?.pagination.items ?? []

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_LIST,
    )

    return (
        <>
            <BreadCrumbs title={"product-attributes"} data={[]}/>

            {isAddOpen ?
                <AddForm
                    onAddSuccessCb={() => setIsAddOpen(false)}
                    onBackClickedCb={() => setIsAddOpen(false)}
                />
                :
                <AttributeTabsDisplayer
                    attributes={attributes}
                    attributesIsLoading={attributesIsLoading}
                    refetchingAllAttributes={refetchingAllAttributes}
                    onAddClicked={() => setIsAddOpen(true)}
                    permissionObject={permissionObject}
                />}
        </>
    )
}

export default ProductsAttributesPage;
