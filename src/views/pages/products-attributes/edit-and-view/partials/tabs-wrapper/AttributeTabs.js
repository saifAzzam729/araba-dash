import {Nav, NavItem, NavLink} from "reactstrap";
import {createTabIndex} from "@src/views/pages/products-attributes/add/data";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import useWindowSize from "@hooks/useWindowSize";


function AttributeTabs({attributesList, activeTabIndex, setActiveTabIndex}) {
    const {width} = useWindowSize()

    return (
        <Nav tabs className={width > WindowBreakpoint.lg && 'nav-left'}>
            {attributesList.map((attrItem) => {
                return (
                    <NavItem>
                        <NavLink
                            active={activeTabIndex === createTabIndex(attrItem.id)}
                            onClick={() => {
                                setActiveTabIndex(createTabIndex(attrItem.id))
                            }}
                        >
                            {attrItem.name}
                        </NavLink>
                    </NavItem>
                )
            })}
        </Nav>
    )
}

export default AttributeTabs;


