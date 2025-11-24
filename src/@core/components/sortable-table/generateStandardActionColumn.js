import {Copy, Edit, Eye, MoreVertical, Trash, Truck, User} from "react-feather";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip} from "reactstrap";

import CustomCan from "@components/Authorize/CustomCan";
import useWindowSize from "@hooks/useWindowSize";
import {Link} from "react-router-dom";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {isDev} from "@src/utility/helpers/isDev";

function generateIconElement({
                                 onAction,
                                 api,
                                 colorClass, // primary, secondary, success, danger, ...
                                 tooltipText,
                                 iconName,
                                 permissionName
                             }) {
    const elementTypeId = tooltipText.replace(" ", "_").toLowerCase();
    const {translate} = useLocaleContext()

    return (
        <>
            <CustomCan permissionName={permissionName}>
			<span
                className={`cursor-pointer mx-1 text-${colorClass}`}
                onClick={() => {
                    onAction(api?.node?.data);
                }}
                id={`${elementTypeId}-tooltip-${api?.data?.id}`}
            >
				{iconName === "eye" && <Eye size={17}/>}
                {iconName === "edit" && <Edit size={17}/>}
                {iconName === "trash" && <Trash size={17}/>}
                {iconName === "copy" && <Copy size={17}/>}
                {iconName === "profile" && <User size={17}/>}
                {iconName === "shipment" && <Truck size={17}/>}
			</span>
                <UncontrolledTooltip
                    placement="top"
                    target={`${elementTypeId}-tooltip-${api?.data?.id}`}
                >
                    {translate(`action-buttons.${elementTypeId}`)}
                </UncontrolledTooltip>
            </CustomCan>
        </>
    );
}

export default function generateStandardActionColumn({
                                                         onView = null,
                                                         onEdit = null,
                                                         onDelete = null,
                                                         onAdd = null,
                                                         onGoToProfile = null,
                                                         onShipment = null,
                                                         permissionObject = {},
                                                     }) {
    const hasDublicate = isDev();

    const {width} = useWindowSize()

    const ActionColumn = {
        headerName: "Actions",
        field: "actions",
        // flex: 1,
        maxWidth: 150,
        translateKey: "common.actions",
        cellRenderer: (api) => {
            if (api.node.data.base) {
                return null;
            }
            return (width <= WindowBreakpoint.md ? (
                <UncontrolledDropdown direction="down" tag="li" className="dropdown-actions nav-item me-2"
                                      style={{listStyle: 'none'}}>
                    <DropdownToggle
                        href="/"
                        tag="a"
                        className="nav-link dropdown-actions flex-row-reverse g-1"
                        style={{gap: '5px'}}
                        onClick={(e) => e.preventDefault()}
                    >
                        <MoreVertical size={20} className="me-75"/>
                    </DropdownToggle>
                    <DropdownMenu end positionFixed={true} style={{minWidth: 'auto'}}>
                        {onGoToProfile &&
                            <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
                                {
                                    generateIconElement({
                                        onAction: onGoToProfile,
                                        api,
                                        colorClass: "secondary",
                                        tooltipText: "View Profile",
                                        iconName: "profile",
                                        permissionName: permissionObject?.view
                                    })}
                                <p className='text-center'>Profile</p>
                            </DropdownItem>}
                        {onGoToProfile && <DropdownItem divider/>}
                        {onView &&
                            <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
                                {
                                    generateIconElement({
                                        onAction: onView,
                                        api,
                                        colorClass: "primary",
                                        tooltipText: "View Details",
                                        iconName: "eye",
                                        permissionName: permissionObject?.view
                                    })}
                                <p className='text-center'>Details</p>

                            </DropdownItem>
                        }
                        {onView && <DropdownItem divider/>}
                        {onEdit &&
                            <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
                                {
                                    generateIconElement({
                                        onAction: onEdit,
                                        api,
                                        colorClass: "warning",
                                        tooltipText: "Edit",
                                        iconName: "edit",
                                        permissionName: permissionObject?.edit
                                    })}
                                <p className='text-center'>Edit</p>

                            </DropdownItem>}
                        {onEdit && <DropdownItem divider/>}
                        {onDelete &&
                            <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
                                {
                                    generateIconElement({
                                        onAction: onDelete,
                                        api,
                                        colorClass: "danger",
                                        tooltipText: "Delete",
                                        iconName: "trash",
                                        permissionName: permissionObject?.delete
                                    })}
                                <p className='text-center'>Delete</p>

                            </DropdownItem>}
                        {onDelete && <DropdownItem divider/>}
                        {hasDublicate && onAdd &&
                            <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
                                {
                                    generateIconElement({
                                        onAction: onAdd,
                                        api,
                                        colorClass: "success",
                                        tooltipText: "Duplicate Row",
                                        iconName: "copy",
                                        permissionName: permissionObject?.add
                                    })}
                                <p className='text-center'>Duplicate</p>

                            </DropdownItem>
                        }
                        {onShipment &&
                            <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
                                {
                                    generateIconElement({
                                        onAction: onShipment,
                                        api,
                                        colorClass: "info",
                                        tooltipText: "Shipment Request",
                                        iconName: "shipment",
                                        permissionName: permissionObject?.add
                                    })}
                                <p className='text-center'>Shipment Request</p>

                            </DropdownItem>
                        }

                    </DropdownMenu>
                </UncontrolledDropdown>

            ) : (
                <div className="column-action d-flex align-items-center justify-content-center">
                    {onGoToProfile &&
                        generateIconElement({
                            onAction: onGoToProfile,
                            api,
                            colorClass: "secondary",
                            tooltipText: "View Profile",
                            iconName: "profile",
                            permissionName: permissionObject?.view
                        })}

                    {onView &&
                        generateIconElement({
                            onAction: onView,
                            api,
                            colorClass: "primary",
                            tooltipText: "View Details",
                            iconName: "eye",
                            permissionName: permissionObject?.view
                        })}

                    {onEdit &&
                        generateIconElement({
                            onAction: onEdit,
                            api,
                            colorClass: "warning",
                            tooltipText: "Edit",
                            iconName: "edit",
                            permissionName: permissionObject?.edit
                        })}

                    {onDelete &&
                        generateIconElement({
                            onAction: onDelete,
                            api,
                            colorClass: "danger",
                            tooltipText: "Delete",
                            iconName: "trash",
                            permissionName: permissionObject?.delete
                        })}

                    {hasDublicate &&
                        onAdd &&
                        generateIconElement({
                            onAction: onAdd,
                            api,
                            colorClass: "success",
                            tooltipText: "Duplicate Row",
                            iconName: "copy",
                            permissionName: permissionObject?.add
                        })}
                    {onShipment &&
                        generateIconElement({
                            onAction: onShipment,
                            api,
                            colorClass: "info",
                            tooltipText: "Shipment Request",
                            iconName: "shipment",
                            permissionName: permissionObject?.add
                        })
                    }

                </div>
            ))
        }

    };
    return ActionColumn;
}
