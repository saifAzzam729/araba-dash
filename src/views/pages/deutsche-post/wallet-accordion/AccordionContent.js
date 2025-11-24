import {Button, Col, Row} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {RefreshCw} from "react-feather";
import React, {useState} from "react";
import AccordionWrapper from "@src/views/pages/deutsche-post/wallet-accordion/AccordionWrapper";
import {useQuery} from "react-query";
import StatisticService from "@src/common/services/StatisticService";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

export default function WalletBalance() {
    const {translate} = useLocaleContext();
    const [sync, setSync] = useState(false);

    const {data, refetch, isFetching, isLoading} = useQuery({
        queryKey: ['wallet-balance', sync],
        queryFn: () => StatisticService.getDeutscheWalletBalance({sync}),
    });

    const walletBalance = data?.data?.walletBalance;

    const handleSync = () => {
        setSync(true);
        refetch();
    }

    return (
        // <AccordionWrapper  isOpen={true} header={translate('common.wallet')}>
            <Row className="d-flex justify-content-between align-items-center">
                <Col md="8" className="text-center">
                    <h3 className="text-muted"><span>{translate('common.wallet')} : </span> {walletBalance ?? '-'}</h3>
                </Col>
                <Col md="4" className="d-flex justify-content-end">
                    {isFetching || isLoading ? (
                        <Stack
                            className="d-flex align-items-center"
                            sx={{color: 'grey.500', margin: 'auto'}}
                            direction="row"
                        >
                            <CircularProgress size={20} sx={{color: '#B0B0B0'}}/>
                        </Stack>
                    ) : (
                        <Button
                            className="mx-1 text-primary cursor-pointer"
                            onClick={handleSync}
                            color="link"
                        >
                            <RefreshCw size={20}/>
                        </Button>
                    )}
                </Col>
            </Row>
        // </AccordionWrapper>
    );
}
