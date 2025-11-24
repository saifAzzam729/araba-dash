import {Col, Row} from "reactstrap";
import React from "react";
import {Alert} from "@mui/material";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import Urls from "@src/common/urls";

export default function ({shipmentsLog}) {

    const {makeLocaleUrl} = useLocaleContext()

    const alertSeverity = {
        WARNING: 'warning',
        FAILED: 'error',
        SUCCESS: 'success'
    }
    if (!shipmentsLog.length > 0) {
        return null
    }

    const handleShipClick = (ship) => {
        let url = '';
        if(ship.shipStatus == 'SUCCESS'){
             url = `${Urls.BASE_BACKEND_URL}${ship.labelUrl}`;
        }else{

            url = makeLocaleUrl(`/sale-orders-shipments/edit/${ship?.shipId}`);
        }
        
        window.open(url, '_blank');
    }

    return (
        <div>
            {
                shipmentsLog.map((ship) => (
                    <Row>
                        <Col md={12}>
                            <Alert
                                className='cursor-pointer my-1'
                                key={ship.shipId}
                                severity={alertSeverity[ship.shipStatus]}
                                onClick={() => handleShipClick(ship)}>
                                {ship.saleOrderRefNumber} | {ship.shipStatus}
                            </Alert>
                        </Col>


                    </Row>

                ))
            }

        </div>
    )
}