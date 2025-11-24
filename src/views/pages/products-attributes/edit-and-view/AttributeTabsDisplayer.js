import {Button, Card, TabContent} from "reactstrap";
import NoDataYet from "@components/NoDataYet";
import {createTabIndex} from "@src/views/pages/products-attributes/add/data";
import {Plus} from "react-feather";
import {useEffect, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import AttributeTabs from "@src/views/pages/products-attributes/edit-and-view/partials/tabs-wrapper/AttributeTabs";
import AttributeTabPanes from "@src/views/pages/products-attributes/edit-and-view/partials/tabs-wrapper/AttributeTabPanes";
import CustomCan from "@components/Authorize/CustomCan";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import useWindowSize from "@hooks/useWindowSize";
import Spinner from "@components/spinner/Fallback-spinner";


export default function AttributeTabsDisplayer({attributes, attributesIsLoading, onAddClicked, refetchingAllAttributes, permissionObject= {}}) {

    const [activeTabIndex, setActiveTabIndex] = useState() // open first tab as default
    const {width} = useWindowSize()

    useEffect(() => {
        if (attributes.length > 0) {
            setActiveTabIndex(createTabIndex(attributes[0].id))
        }
    }, [attributes]);

    if (attributesIsLoading){
        return <><Spinner/></>
    }

    if (attributes.length === 0) {
        return (
            <ContentWrapper permissionName={permissionObject?.add} onAddClicked={onAddClicked} activeTabIndex={activeTabIndex}>
                <NoDataYet/>
            </ContentWrapper>
        )
    }

    return (
        <ContentWrapper onAddClicked={onAddClicked} permissionName={permissionObject?.add}>
            <div className={width > WindowBreakpoint.lg && 'nav-vertical'}>
                <AttributeTabs
                    attributesList={attributes}
                    activeTabIndex={activeTabIndex}
                    setActiveTabIndex={setActiveTabIndex}
                />

                <AttributeTabPanes
                    activeTabIndex={activeTabIndex}
                    attributesList={attributes}
                    setActiveTabIndex={setActiveTabIndex}
                    refetchingAllAttributes={refetchingAllAttributes}
                    permissionObject={permissionObject}
                />
            </div>
        </ContentWrapper>
    )
}

function ContentWrapper({children, onAddClicked, permissionName}) {

    const {translate} = useLocaleContext();

    return (
        <Card className='p-2 bg-white'>
            <CustomCan permissionName={permissionName}>
                <div className='d-flex justify-content-end'>
                        <Button className='btn-icon mb-1' color='primary' onClick={() => onAddClicked()}
                        >
                            <span className='align-middle mx-25'>{translate('product-attribute.common.add-attribute')}</span>
                            <Plus size={14}/>
                        </Button>
                </div>

            </CustomCan>
            {children}
        </Card>
    )
}
