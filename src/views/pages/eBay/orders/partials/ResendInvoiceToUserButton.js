import {Button} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import { ArrowRightCircle, Mail} from "react-feather";
import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import Tooltip from '@mui/material/Tooltip';
import SaleOrdersService from "../../../../../common/services/SaleOrdersService";


// Fake promise function to simulate API call
const ResendFunction = (resend) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({balance: Math.random() * 1000});
        }, 2000);
    });
};

export default function ResendInvoiceToUserButton({saleOrderId,status}) {
    const {translate} = useLocaleContext();
    const [resend, setResend] = useState(false);

    
    const {mutate, isLoading, isError} = useMutation(
        (data) => SaleOrdersService.resendInvoiceToUser(saleOrderId),
        {
            onSuccess: ()=>{
                console.log(status);
                showSuccessAlert({})
            },

        }
    );
    const handleResend = () => {
        setResend(true);
        mutate();
       
    }

    return (
        <div>
            <Tooltip title={translate("common.resend-invoice-to-user")} placement="bottom">
                <Button
                    className="px-1 text-primary cursor-pointer"
                    onClick={handleResend}
                    color="link"
                    disabled={
                          isLoading || status == 'PENDING'
                        }
                >
                    {
                          isLoading ?
                            <CircularProgress size={20} sx={{color: '#B0B0B0'}}/> :
                            <Mail size={30} color="#007bff"/>
                    }
                </Button>
            </Tooltip>
        </div>

    )
}