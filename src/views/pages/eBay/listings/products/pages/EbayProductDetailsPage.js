import {useMutation, useQuery} from "react-query";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {Badge, Button, Card, Col, Row, Tooltip} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EbayListingProductsService from "@src/common/services/EbayListingProductsService";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import {Upload} from "react-feather";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import {Link} from "react-router-dom";

export default function () {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {translate} = useLocaleContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState('')
    const {id} = useParams();
    const [tooltipOpen, setTooltipOpen] = useState(null);

    const toggleTooltip = (id) => {
        setTooltipOpen((prevId) => (prevId === id ? null : id));
    };

    const {
        data,
        refetch
    } = useQuery(['product-details', id], () => EbayListingProductsService.getById(id, {locale: preferredTableContentLocale}), {});


    const {
        mutate: republishMutation,
        isLoading: isRepublishLoading
    } = useMutation((data) => EbayListingProductsService.republish(data.id), {
        onSuccess: () => {
            refetch();
            showSuccessAlert({});
        }, onError: () => {
            showErrorAlert({});
        },
    });

    const productDetails = data?.data ?? {};

    const disabled = productDetails?.syncStatus !== 'FAILED'
    const goBack = () => {
        navigate(-1);
    };

    const objPublishStatus = {
        INACTIVE: 'warning', ACTIVE: 'success', ENDED: 'dark',
    
    }
    
    const objSyncStatus = {
        IN_QUEUE: 'warning', IN_PROGRESS: 'info', SYNCED: 'success', FAILED: 'danger',
    
    }
    


    return (<Card className={'p-3'}>

        <Row className={'justify-content-between'}>
            <Col md={6}>
                <h2>{translate('ebay-listing.products.view.header')}</h2>
                <p>{translate('ebay-listing.products.view.sub-header')}</p>
            </Col>
            <Col md={6} className={'text-center'}>
                {isRepublishLoading ? <Stack
                        className="d-flex align-items-center justify-content-center"
                        sx={{color: 'grey.500', margin: 'auto'}}
                        direction="row"
                    >
                        <CircularProgress
                            size={20}
                            sx={{color: '#B0B0B0'}}
                        />
                    </Stack> :
                    <>
                        <Button
                            disabled={disabled}
                            color={'link'}
                            id={`republish-btn-${productDetails?.id}`}
                            className={`${disabled ? 'text-muted' : 'cursor-pointer text-success'} mx-1 me-1 text-end`}
                            onClick={() => republishMutation(productDetails)}
                        >
                            <Upload size={20}/>
                        </Button>
                        <Tooltip
                            placement={'bottom'}
                            isOpen={tooltipOpen === productDetails?.id}
                            target={`republish-btn-${productDetails?.id}`}
                            toggle={() => toggleTooltip(productDetails?.id)}
                        >
                            Republish Product
                        </Tooltip>
                    </>
                }
            </Col>
        </Row>
        <hr/>

        <Row className={'gap-1'}>
        <Col sm={12} md={6} className=' mb-lg-0'>
                <ViewTextItem label={translate("ebay-listing.products.table.publishStatus")}
                              value={
                              <Badge className='text-capitalize' color={objPublishStatus[productDetails?.ebayListingStatus]} >
                                {productDetails.ebayListingStatus}
                            </Badge>}   
                />
        </Col>  
        <Col sm={12} md={6} className=' mb-lg-0'>
        <Col sm={12} md={6} className=' mb-lg-0'>
                <ViewTextItem label={translate("ebay-listing.products.table.reference")}
                              value={
                                <Link
                                className={"cursor-pointer text-decoration-underline"}
                                to={`https://www.ebay.de/itm/${productDetails.ebayReferenceListingId}`}
                                target="_blank"
                                >
                                    {productDetails.ebayReferenceListingId}
                                </Link>}   
                />
        </Col>
            
          
        </Col>

            <Col sm={12} md={8} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("ebay-listing.products.forms.treeName")}
                              value={(productDetails && productDetails.ebayCategory?.categoryTreeName)}/>
            </Col>
            <div className="divider d-none d-md-block"></div>
            <hr/>
         
            <Col sm={12} md={6} className=' mb-lg-0'>
                <ViewTextItem label={translate("ebay-listing.products.table.syncStatus")}
                              value={
                              <Badge className='text-capitalize' color={objSyncStatus[productDetails?.syncStatus]} >
                                {productDetails.syncStatus}
                            </Badge>}   
                />
            </Col>
            <Col sm={12} md={6} className=' mb-lg-0'>
                <ViewTextItem label={translate("ebay-listing.products.forms.listing")}
                              value={(productDetails && productDetails.ebayListing?.name)}/>
            </Col>
            <Col sm={12} md={6} className=' mb-lg-0'>
                <ViewTextItem label={translate("ebay-listing.products.forms.productVariant")}
                              value={(productDetails && productDetails.productVariant?.product?.name)}/>
            </Col>
            <hr/>
            
            {productDetails.syncErrorMessage &&

                <Col sm={12} md={11} className=' mb-lg-0'>
                    <ViewTextItem label={translate("ebay-listing.products.forms.syncErrors")}
                                  value={
                                      productDetails?.syncErrorMessage.map((err) => `${err}  `)
                                  }/>
                </Col>} 
            {productDetails.lastSyncedToEbayAt &&

                <Col sm={12} md={11} className=' mb-lg-0'>
                    <ViewTextItem label={translate("ebay-listing.products.forms.lastSyncedToEbayAt")}
                                  value={
                                      productDetails?.lastSyncedToEbayAt
                                  }/>
                </Col>} 
            {productDetails.publishedToEbayAt &&

                <Col sm={12} md={11} className=' mb-lg-0'>
                    <ViewTextItem label={translate("ebay-listing.products.forms.publishedToEbayAt")}
                                  value={
                                      productDetails?.publishedToEbayAt
                                  }/>
                </Col>}  
            {productDetails.endedAt &&

                <Col sm={12} md={11} className=' mb-lg-0'>
                    <ViewTextItem label={translate("ebay-listing.products.forms.endedAt")}
                                  value={
                                      productDetails?.endedAt
                                  }/>
                </Col>}

                

        </Row>
        <Row>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <Button
                    type="button"
                    color="secondary"
                    outline
                    onClick={goBack}
                    className="mb-3">
                    {translate('common.back')}
                </Button>
            </Col>
        </Row>
    </Card>);
}
