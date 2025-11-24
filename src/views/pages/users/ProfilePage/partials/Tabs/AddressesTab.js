import React from "react";
import NoPagingTableBase from "../../../../../../@core/components/table/NoPagingTableBase";
import addressesColumns from "../tabsColumns/addressesColumns";
import {Card} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";


export default function AddressesTab ({addresses}) {
    const{translate} = useLocaleContext()

    return (
        <Card color="white" className="p-1">
            <NoPagingTableBase
                columns={addressesColumns}
                data={addresses}
                defaultActionButtons={false}
                noDataComponent ={<div className='mt-3'>{translate('common.no-data-table')}</div>}
            />
        </Card>
    )
}
