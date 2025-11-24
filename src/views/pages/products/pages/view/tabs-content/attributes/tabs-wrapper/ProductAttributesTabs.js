import {Nav, NavItem, NavLink} from "reactstrap";
import {createTabIndex} from "@src/views/pages/products/pages/view/data";
import {useFormContext} from "react-hook-form";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

function ProductAttributesTabs({attributesTabs, activeTabIndex, setActiveTabIndex}) {
    const FormMethods = useFormContext();
    const {width} = useWindowSize()
    const handleClickedTab = async (id) => {
        const number = activeTabIndex.replace('tab-index-', "");
        const result = await FormMethods.trigger(`${number}.options`);
        if (result) {
            setActiveTabIndex(createTabIndex(id));
        }
    }

    return (<Nav tabs className={width > WindowBreakpoint.lg && 'nav-left'}>
            {attributesTabs.map((attr) => {
                return (<NavItem key={`attt-${attr.attribute}`}>
                    <NavLink
                        active={activeTabIndex === createTabIndex(attr.attribute)}
                        onClick={() => handleClickedTab(attr.attribute)}
                    >
                        {attr.name}
                    </NavLink>
                </NavItem>)
            })}
        </Nav>


    )
}

export default ProductAttributesTabs;


