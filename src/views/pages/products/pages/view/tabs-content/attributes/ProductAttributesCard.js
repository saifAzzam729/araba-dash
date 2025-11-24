import {Card} from "reactstrap";
import {useEffect, useState} from "react";
import {createTabIndex} from "@src/views/pages/products/pages/view/data";
import useModal from "@components/modal/useModal";
import AddAttributeModal from './modals/add'
import ProductAttributesTabPanes
    from "@src/views/pages/products/pages/view/tabs-content/attributes/tabs-wrapper/ProductAttributesTabPanes";
import ProductAttributesTabs
    from "@src/views/pages/products/pages/view/tabs-content/attributes/tabs-wrapper/ProductAttributesTabs";
import {createAttributeEntity} from "@src/views/pages/products/pages/view/tabs-content/attributes/data";
import {FormProvider} from "react-hook-form";
import useFormDataManager from "@src/views/pages/products/pages/view/tabs-content/attributes/form/useFormDataManager";
import {useParams} from "react-router-dom";
import ProductAttributeHeader
    from "@src/views/pages/products/pages/view/tabs-content/attributes/tabs-wrapper/ProductAttributeHeader";
import NoDataYet from "@components/NoDataYet";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

function ProductAttributesCard({product}) {
    const {id: productId} = useParams()
    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();
    const {width} = useWindowSize()


    const [activeTabIndex, setActiveTabIndex] = useState(null)
    const [attributesArray, setAttributesArray] = useState([])
    const excludedAttributesArray = attributesArray.map((attribute) => attribute.attribute)
    const {
        FormMethods,
        prepareDataAndSubmit,
        ProductAttributeLoading
    } = useFormDataManager({productId});

    useEffect(() => {
        if (product) {
            const extractedAttrs = product.attributes.map((att) => {
                return createAttributeEntity(
                    att.attribute,
                    att.name,
                    att.attributeOptions,
                    att.id,
                    att.required
                )
            })
            if (product.attributes.length > 0) {
                setActiveTabIndex(createTabIndex(product.attributes[0].attribute))
            }
            setAttributesArray(extractedAttrs)
        }
    }, [product]);
    
    const onAddSuccess = (selectedAttributeItem) => {
        const {label, value} = selectedAttributeItem;
        const defaultOptions = [
            {option: {}},
        ];
        const objectToAdd = createAttributeEntity(value, label, defaultOptions);
        setAttributesArray(prevState => [...prevState, objectToAdd])
        closeAddModal()
        setActiveTabIndex(createTabIndex(value))
    }

    const handleDeleteAttribute = (attributeId) => {
        setAttributesArray(prevState => [...prevState.filter(item => item.attribute !== attributeId)])
        setActiveTabIndex(createTabIndex(attributesArray[0].attribute))
    };

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_LIST,
    )

    return (
        <>
            <FormProvider {...FormMethods}>
                <form id={'add-attribute'} onSubmit={FormMethods.handleSubmit(prepareDataAndSubmit)}>
                    <Card className='p-2 bg-white' style={{minHeight: '500px'}}>
                        <ProductAttributeHeader openAddModal={openAddModal} isLoading={ProductAttributeLoading} permissionName={permissionObject?.add}/>

                        {
                            attributesArray.length > 0 ?
                                <div className={width > WindowBreakpoint.lg && 'nav-vertical'}>
                                    <ProductAttributesTabs
                                        attributesTabs={attributesArray}
                                        activeTabIndex={activeTabIndex}
                                        setActiveTabIndex={setActiveTabIndex}
                                    />

                                    <ProductAttributesTabPanes
                                        activeTabIndex={activeTabIndex}
                                        attributesList={attributesArray}
                                        handleDeleteAttribute={handleDeleteAttribute}
                                        permissionObject={permissionObject}
                                    />
                                </div>
                                :
                                <NoDataYet/>
                        }
                    </Card>
                </form>
            </FormProvider>

            {isAddModalOpen &&
                <AddAttributeModal
                    excludedAttributesArray={excludedAttributesArray}
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            }

        </>
    )
}

export default ProductAttributesCard
