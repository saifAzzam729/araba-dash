import CreateColumn from "@components/table/CreateColumn";
import {Badge, Button} from "reactstrap";
import React from "react";
import {Download, FileText} from "react-feather";
import {downloadLabel} from "@src/utility/helpers/downloadLabel";
import Urls from "@src/common/urls";
import {formatDate} from "@utils";

export const DownloadLabelIcon = ({labelUrl, disabled}) => {
    if (labelUrl === "NULL") {
        return (
            <span className={`mx-1 text-muted`}>
            <Download size={20}/></span>
        )
    }

    return (
        <Button
            className={`mx-1 ${disabled ? 'text-muted' : "text-primary "} cursor-pointer `}
            onClick={() => downloadLabel(`${Urls.BASE_BACKEND_URL}${labelUrl}`)}
            disabled={disabled}
            color='link'
        >
            <Download size={20}/>
        </Button>
    );
};
export const DownloadManifestIcon = ({labelUrl, disabled}) => {
    if (labelUrl === "NULL") {
        return (
            <span className={`mx-1 text-muted`}>
            <FileText size={20}/>
            </span>
        )
    }

    return (
        <Button
            className={`mx-1 ${disabled ? 'text-muted' : "text-info "} cursor-pointer `}
            onClick={() => downloadLabel(`${Urls.BASE_BACKEND_URL}${labelUrl}`)}
            disabled={disabled}
            color='link'
        >
            <FileText size={20}/>
        </Button>
    );
};


const ShipmentStatusColumn = CreateColumn({
    name: "description",
    translateKey: 'sale-orders-shipments.table.description',
    cellCustomizationFunction: (row) => {
        let badgeColor = 'light-success';
        if (row.status === 'UN_COMPLETED') {
            badgeColor = 'light-danger';
        } else if (row.status === 'COMPLETED_NEED_MANIFEST') {
            badgeColor = 'light-warning';
        }

        return (
            <Badge className={`cursor-pointer`} color={badgeColor}>
                {row.status}
            </Badge>
        );
    },
});

const ShipmentNumberColumn = CreateColumn({
    name: "shipmentNumber",
    translateKey: 'sale-orders-shipments.table.shipmentNumber',
    cellCustomizationFunction: (row) => <span>{row.shipmentNo ?? '_'}</span>,
});

const ShipmentRefNumberColumn = CreateColumn({
    name: "shipmentRefNumber",
    translateKey: 'sale-orders-shipments.table.shipmentRefNumber',
    cellCustomizationFunction: (row) => <span>{row.shipmentRefNo ?? "_"}</span>,
});

const DownloadLabelColumn = CreateColumn({
    name: "downloadLabel",
    translateKey: 'sale-orders-shipments.table.label',
    maxWidth: '100px',
    cellCustomizationFunction: (row) => <DownloadLabelIcon labelUrl={row.labelUrl} disabled={!row.labelUrl}/>
});


const DownloadManifestColumn = CreateColumn({
    name: "downloadManifest",
    translateKey: 'sale-orders-shipments.table.manifest',
    maxWidth: '100px',
    cellCustomizationFunction: (row) => <DownloadManifestIcon labelUrl={row.manifestLink}
                                                              disabled={!row.manifestLink}/>
});

const CreatedAtColumn = CreateColumn({
    name: "createdAt",
    translateKey: 'sale-order.table.created-at',
    cellCustomizationFunction: (row) => <span>{formatDate(row.createdAt)}</span>,
});

const consigneeNameColumn = CreateColumn({
    name: "createdAt",
    translateKey: 'sale-orders-shipments.table.consignee-name',
    cellCustomizationFunction: (row) => <span>{row.consigneeName}</span>,
});

export const createColumns = (manifestMutation) => {

    // const ManifestColumn = CreateColumn({
    //     name: "Manifest",
    //     translateKey: 'sale-orders-shipments.table.manifest',
    //     maxWidth: '100px',
    //     cellCustomizationFunction: (row) => (
    //         <ManifestIcon row={row} manifestMutation={manifestMutation} disabled={row?.status === 'VALID'}/>
    //     )
    // });

    return [
        consigneeNameColumn,
       
        ShipmentNumberColumn,
        ShipmentRefNumberColumn,
        DownloadLabelColumn,
        DownloadManifestColumn,
        CreatedAtColumn,
        // ManifestColumn,
        ShipmentStatusColumn,
    ]
}

