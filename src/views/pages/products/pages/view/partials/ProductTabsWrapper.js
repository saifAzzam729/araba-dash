import {Nav, NavItem, NavLink} from "reactstrap";
import {AlignLeft, Image, Info, Layout, Plus, PlusCircle, Slack, Box} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {VIEW_PAGE_TABS_IDS} from "@src/views/pages/products/pages/view/data";
import CustomCan from "@components/Authorize/CustomCan";

function ProductTabsWrapper({activeTab, setActiveTab, productImagePermissionObject,
                                productAttributePermissionObject,
                                productPermissionObject, productVariantsPermissionObject}) {

    const {translate} = useLocaleContext();

    return (
        <Nav tabs className="mb-2">
            {/* INFO TAB */}
                <CustomCan permissionName={productPermissionObject}>
                    <NavItem>
                        <NavLink
                            active={activeTab === VIEW_PAGE_TABS_IDS.INFO}
                            onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.INFO)}
                        >
                            <Info className="font-medium-3 me-50"/>
                            <span className="fw-bold">{translate('product.common.info')}</span>
                        </NavLink>
                    </NavItem>
                </CustomCan>

            {/* PRODUCT IMAGES TAB */}
            {/*<CustomCan permissionName={productImagePermissionObject}>*/}
            {/*    <NavItem>*/}
            {/*        <NavLink*/}
            {/*            active={activeTab === VIEW_PAGE_TABS_IDS.IMAGES}*/}
            {/*            onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.IMAGES)}*/}
            {/*        >*/}
            {/*            <Image className="font-medium-3 me-50"/>*/}
            {/*            <span className="fw-bold">{translate('product.common.images')}</span>*/}
            {/*        </NavLink>*/}
            {/*    </NavItem>*/}
            {/*</CustomCan>*/}

            {/* ATTRIBUTES TAB */}
            <CustomCan permissionName={productAttributePermissionObject}>
                <NavItem>
                    <NavLink
                        active={activeTab === VIEW_PAGE_TABS_IDS.ATTRIBUTES}
                        onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.ATTRIBUTES)}
                    >
                        <Slack className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('product.common.attributes')}</span>
                    </NavLink>
                </NavItem>
            </CustomCan>

            {/* EXTRA INFO TAB */}
                <CustomCan permissionName={productPermissionObject}>
                    <NavItem>
                        <NavLink
                            active={activeTab === VIEW_PAGE_TABS_IDS.EXTRA_INFO}
                            onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.EXTRA_INFO)}
                        >
                            <PlusCircle className="font-medium-3 me-50"/>
                            <span className="fw-bold">{translate('product.common.extra-info')}</span>
                        </NavLink>
                    </NavItem>
                </CustomCan>

            {/* META TAB */}
            <CustomCan permissionName={productPermissionObject}>
                <NavItem>
                    <NavLink
                        active={activeTab === VIEW_PAGE_TABS_IDS.META}
                        onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.META)}
                    >
                        <Layout className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('product.common.meta')}</span>
                    </NavLink>
                </NavItem>
            </CustomCan>
            {/* META TAB */}

            <CustomCan permissionName={productPermissionObject}>
                <NavItem>
                    <NavLink
                        active={activeTab === VIEW_PAGE_TABS_IDS.SORT_OPTIONS}
                        onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.SORT_OPTIONS)}
                    >
                        <AlignLeft className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('product.common.sort-options')}</span>
                    </NavLink>
                </NavItem>
            </CustomCan>
            {/*VARIANTS TAB*/}
            <CustomCan permissionName={productVariantsPermissionObject}>
                <NavItem>
                    <NavLink
                        active={activeTab === VIEW_PAGE_TABS_IDS.PRODUCT_VARIANT}
                        onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.PRODUCT_VARIANT)}
                    >
                        <Box className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('product.common.product-variants')}</span>
                    </NavLink>
                </NavItem>
            </CustomCan>

            {/*OPTIONS IMAGES TAB*/}

            <CustomCan permissionName={productPermissionObject}>
                <NavItem>
                    <NavLink
                        active={activeTab === VIEW_PAGE_TABS_IDS.OPTIONS_IMAGES}
                        onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.OPTIONS_IMAGES)}
                    >
                        <Box className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('product.common.options-images')}</span>
                    </NavLink>
                </NavItem>
            </CustomCan>
        </Nav>
    )
}

export default ProductTabsWrapper;
