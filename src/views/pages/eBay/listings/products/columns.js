import CreateColumn from "@components/table/CreateColumn";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import {Badge, Button, Tooltip} from "reactstrap";
import {Link} from "react-router-dom";
import CustomCan from "@components/Authorize/CustomCan";
import {Eye, Upload, XOctagon} from "react-feather";
import React, {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import Avatar from "@mui/material/Avatar";


const AvatarColumn = CreateColumn({
    name: "Image",
    translateKey: 'product.table.product-image',
    maxWidth: '130px',
    cellCustomizationFunction: (row) => (
        <Link
            to={row.productVariant.product?.imageFileUrl ? ParseImageUrl(row.productVariant?.product?.imageFileUrl) : "#"}
            target={row.productVariant.product?.imageFileUrl ? "_blank" : undefined}
            className="my-2 gap-sm-1"
        >
            <Avatar
                alt={`${row.name} avatar`}
                sx={{width: 56, height: 56}}
                src={ParseImageUrl(row.productVariant.product?.imageFileUrl)}
            />
        </Link>
    ),
});

const objPublishStatus = {
    INACTIVE: 'warning', ACTIVE: 'success', ENDED: 'dark',

}

const objSyncStatus = {
    IN_QUEUE: 'warning', IN_PROGRESS: 'info', SYNCED: 'success', FAILED: 'danger',

}

const ProductsColumn = CreateColumn({
    name: "Name",
    translateKey: 'ebay-listing.products.table.product',
    cellCustomizationFunction: (row) => <span>{row.productVariant?.product?.name}</span>,
});

const PublishColumn = CreateColumn({
    name: "publish",
    translateKey: 'ebay-listing.products.table.publishStatus',
    cellCustomizationFunction: (row) => <Badge className='text-capitalize'
                                               color={objPublishStatus[row.ebayListingStatus]} pill>
        {row.ebayListingStatus}
    </Badge>,
});

const SyncStatusColumn = CreateColumn({
    name: "syncStatus",
    translateKey: 'ebay-listing.products.table.syncStatus',
    cellCustomizationFunction: (row) => <Badge className='text-capitalize' color={objSyncStatus[row.syncStatus]} pill>
        {row.syncStatus}
    </Badge>,
});

const CategoryColumn = CreateColumn({
    name: "publish",
    translateKey: 'ebay-listing.products.table.category',
    cellCustomizationFunction: (row) => <span>{row.ebayCategory?.name} </span>,
});

const EbayReferenceColumn = CreateColumn({
    name: "Reference", translateKey: 'ebay-listing.products.table.reference', cellCustomizationFunction: (row) => {
        if (row.ebayReferenceListingId) {
            return (<Link
                className={"cursor-pointer text-decoration-underline"}
                to={`https://www.ebay.de/itm/${row.ebayReferenceListingId}`}
                target="_blank"
            >
                {row.ebayReferenceListingId}
            </Link>);
        } else {
            return <span>-</span>;
        }
    },
});

const columns = [AvatarColumn, ProductsColumn, PublishColumn, EbayReferenceColumn, CategoryColumn, SyncStatusColumn];

export const createColumns = (width, permissionObject, onEndStatus, onView, onRepublish, isRepublishLoading) => {
    const [tooltipOpen, setTooltipOpen] = useState(null);
    const [loadingRowId, setLoadingRowId] = useState(null);
    const handleRepublish = async (row) => {
        setLoadingRowId(row.id);
        try {
            await onRepublish(row);
        } finally {
            setLoadingRowId(null);
        }
    };


    const toggleTooltip = (id) => {
        setTooltipOpen((prevId) => (prevId === id ? null : id));
    };

    const ActionColumn = CreateColumn({
        name: "Action", translateKey: 'ebay-listing.products.table.actions', cellCustomizationFunction: (row) => {
            const endStatusId = `endStatus-${row.id}`;
            const rePublishId = `rePublish-${row.id}`;

            return (<>
                <CustomCan permissionName={permissionObject?.view}>
                        <span
                            className='cursor-pointer mx-1 text-primary me-1'
                            onClick={() => onView(row)}>
                            <Eye size={17}/>
                        </span>
                </CustomCan>
                <>

                    <Button
                        disabled={row.ebayListingStatus !== 'ACTIVE'}
                        id={endStatusId}
                        color={'link'}
                        className={`${row.ebayListingStatus !== 'ACTIVE' ? 'text-muted' : 'text-danger cursor-pointer'} mx-1  me-1`}
                        onClick={() => onEndStatus(row)}>


                        <XOctagon size={17}/>
                    </Button>
                    <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen === endStatusId}
                        target={endStatusId}
                        toggle={() => toggleTooltip(endStatusId)}
                    >
                        End List
                    </Tooltip>
                </>
                {loadingRowId === row.id ? (
                    <Stack className="d-flex align-items-center justify-content-center"
                           sx={{color: 'grey.500', margin: 'auto'}} direction="row">
                        <CircularProgress size={20} sx={{color: '#B0B0B0'}}/>
                    </Stack>
                ) : (
                    <>
                        <Button
                            disabled={row.syncStatus !== 'FAILED'}
                            color={'link'}
                            id={rePublishId}
                            className={`${row.syncStatus !== 'FAILED' ? 'text-muted' : 'cursor-pointer text-success'} `}
                            onClick={() => handleRepublish(row)}
                        >
                            <Upload size={17}/>
                        </Button>
                        <Tooltip
                            placement={'bottom'}
                            isOpen={tooltipOpen === rePublishId}
                            target={rePublishId}
                            toggle={() => toggleTooltip(rePublishId)}
                        >
                            Republish Product
                        </Tooltip>
                    </>
                )}
            </>);
        },
    });

    if (width <= WindowBreakpoint.md) {
        return [ProductsColumn, PublishColumn, ActionColumn];
    } else {
        return [...columns, ActionColumn];
    }
};

export default columns;
