// ** React Imports
import { NavLink } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { useTranslation } from "react-i18next";

// ** Reactstrap Imports
import { Badge } from "reactstrap";
import { useLocaleContext } from "@src/providers/LocaleProvider";
import { Can } from "../../../../../utility/context/PermissionProvider";

const VerticalNavMenuLink = ({ item, activeItem, showText }) => {
    // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
    const LinkTag = item.externalLink ? "a" : NavLink;

    const { translate, makeLocaleUrl } = useLocaleContext();

    return (
        <li
            className={classnames({
                "nav-item": !item.children,
                disabled: item.disabled,
                active: item.navLink === activeItem,
            })}
        >
            <Can I={item.permission}>
                <LinkTag
                    className="d-flex align-items-center text-white text-nowrap"
                    target={item.newTab ? "_blank" : undefined}
                    /*eslint-disable */
                    {...(item.externalLink === true
                        ? {
                            href: makeLocaleUrl(item.navLink || "/"),
                        }
                        : {
                            to: makeLocaleUrl(item.navLink || "/"),
                            className: ({ isActive }) => {
                                if (isActive && !item.disabled) {
                                    return "d-flex align-items-center active";
                                }
                            },
                        })}
                    onClick={(e) => {
                        if (
                            item.navLink.length === 0 ||
                            item.navLink === "#" ||
                            item.disabled === true
                        ) {
                            e.preventDefault();
                        }
                    }}
                >
                    {item.icon}
                    {showText && (
                        <span className="menu-item text-truncate   " >
                      {translate(`sidebar.${item.id}`)}
                       </span>
                    )}

                    {item.badge && item.badgeText ? (
                        <Badge className="ms-auto me-1 text-white" color={item.badge} pill>
                            {item.badgeText}
                        </Badge>
                    ) : null}
                </LinkTag>
            </Can>
        </li>
    );
};

export default VerticalNavMenuLink;
