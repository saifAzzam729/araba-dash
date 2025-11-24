import BreadCrumbs from "@components/breadcrumbs";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import React, {useState} from "react";
import {Badge, Button, Card, Col, Row} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import useWindowSize from "@hooks/useWindowSize";
import {useMutation, useQuery} from "react-query";
import {useForm} from "react-hook-form";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import SaleOrdersShipmentsService from "@src/common/services/SaleOrdersShipmentsService";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {Edit, X} from "react-feather";
import LoadingButton from "@mui/lab/LoadingButton";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import ShipmentShippersService from "@src/common/services/ShipmentShippersService";
import {Alert, IconButton} from "@mui/material";
// import {DownloadLabelIcon, ManifestIcon} from "@src/views/pages/dhl/sale-orders-shipments/columns";
import {DownloadLabelIcon, DownloadManifestIcon} from "@src/views/pages/deutsche-post/sale-order-shipments/columns";
import SaleOrderTable from "@src/views/pages/deutsche-post/sale-order-shipments/partials/SaleOrderTable";

export default function EditSaleOrdersShipmentsPage() {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {translate, isRtl} = useLocaleContext();
    const {id} = useParams();
    const {width} = useWindowSize()
    const {preferredTableContentLocale} = useSettingsUiContext();
    const [openValidationMsg, setOpenValidationMsg] = useState(false);
    const [validationMessages, setValidationMessages] = useState([]);


    const {
        handleSubmit,
        control,
        setValue,
        formState: {errors}
    } = useForm({
        defaultValues: {
            consigneeName: "",
            consigneeEmail: "",
            consigneePhone: "",
            consigneeCountry: "",
            consigneeCity: "",
            consigneeAddressStreet: "",
            consigneeAdditionalAddressInformation: "",
            consigneePostCode: "",
            shipmentProduct: null,
            shipmentShipper: null
        },
    });

    const {data, refetch} = useQuery(
        ['deutsche-sale-order-shipment', id],
        () => SaleOrdersShipmentsService.getById(id, {locale: preferredTableContentLocale}),
        {
            onSuccess: (res) => {
                const {data} = res;

                if (data?.validationMessage && data?.validationMessage.length > 0) {


                    setValidationMessages(data.validationMessage)
                    setOpenValidationMsg(true);
                } else {
                    setValidationMessages([])
                }


                setValue('consigneeName', data?.consigneeName)
                setValue('consigneeCountry', data?.consigneeCountry)
                setValue('consigneeCity', data?.consigneeCity)
                setValue('consigneeAddressStreet', data.consigneeAddressStreet)
                setValue('consigneePostCode', data?.consigneePostCode)
                setValue('shipmentProduct', {label: data?.shipmentProduct.name, value: data?.shipmentProduct.id})
                setValue('shipmentShipper', {label: data?.shipmentShipper.name, value: data?.shipmentShipper.id})
            }
        }
    )

    const [backendErrors, setBackendErrors] = useState(null);

    const {mutate, isError, isLoading} = useMutation(
        (data) => SaleOrdersShipmentsService.update(id, data),
        {
            onSuccess: (res) => {

                refetch()
                showSuccessAlert({});
            },
            onError: (error) => {
                console.log('errr', error)
                setBackendErrors(error.response.data.error);
            },
        }
    );


    const promiseShipmentsProductsOptions = (
        searchValue,
        prevOptions,
        additional,
    ) => new Promise((resolve) => {
        const prevPage = additional?.prevPage ?? 0;

        const params = {
            search: searchValue,
            page: prevPage + 1,
        };
        const page = params.page;
        const perPage = 10;
        const search = params.search;
        ShipmentProductsService.getPagination({
            page: page, search: search, limit: perPage
        }).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: item.name,
                    value: item.id,
                })),
                hasMore: currentPage < pages,
                additional: {
                    prevPage: currentPage,
                    prevSearchValue: searchValue,
                },
            });
        });
    });

    const promiseShipmentsShippersOptions = (
        searchValue,
        prevOptions,
        additional,
    ) => new Promise((resolve) => {
        const prevPage = additional?.prevPage ?? 0;

        const params = {
            search: searchValue,
            page: prevPage + 1,
        };
        const page = params.page;
        const perPage = 10;
        const search = params.search;
        ShipmentShippersService.getPagination({
            page: page, search: search, limit: perPage
        }).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: item.name,
                    value: item.id,
                })),
                hasMore: currentPage < pages,
                additional: {
                    prevPage: currentPage,
                    prevSearchValue: searchValue,
                },
            });
        });
    });

    const prepareData = (data) => {
        const {
            consigneeName,
            consigneeCountry,
            consigneeCity,
            consigneeAddressStreet,
            consigneePostCode,
            shipmentProduct,
            shipmentShipper,
        } = data;

        mutate({
            consigneeName,
            consigneeCountry,
            consigneeCity,
            consigneeAddressStreet,
            consigneePostCode,
            shipmentProduct: shipmentProduct.value,
            shipmentShipper: shipmentShipper.value,
        })
    };

    const goBack = () => {
        navigate(makeLocaleUrl("/deutsche-sale-orders-shipments"));
    };

    let badgeColor = 'light-success';
    if (data?.data?.status === 'UN_COMPLETED') {
        badgeColor = 'light-danger';
    } else if (data?.data?.status === 'COMPLETED_NEED_MANIFEST') {
        badgeColor = 'light-warning';
    }
    const btnDisabled = data?.data.status === 'COMPLETED'
    const labelUrl = data?.data?.labelUrl
    const manifestLink = data?.data?.manifestLink
    return (
        <>
            <BreadCrumbs
                title={"edit-sale-order-shipment"}
                data={[{title: translate('common.sale-orders-shipments'), link: "/sale-orders-shipments"}]}
            />
            <Card className={width <= WindowBreakpoint.md ? '' : "p-5"}>
                <div className='mb-1 d-flex justify-content-between align-items-center'>
                    <h4>{translate('common.edit-sale-order-shipment')}</h4>
                    <div className="d-flex align-items-center gap-1">
                        <Badge className={`cursor-pointer`} color={badgeColor}>
                            {data?.data?.status}
                        </Badge>
                        <DownloadLabelIcon labelUrl={labelUrl} disabled={!labelUrl}/>
                        <DownloadManifestIcon labelUrl={manifestLink}
                                              disabled={!manifestLink}/>
                    </div>
                </div>

                {openValidationMsg && (
                    <div key={validationMessages} className="validation-messages position-relative mb-2">
                        {validationMessages.map((msg, index) => {


                            return (
                                <Alert key={index} severity={'error'}>
                                    {`${msg.property} : ${msg.validationMessage}`}
                                </Alert>
                            );
                        })}
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenValidationMsg(false);
                            }}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0
                            }}
                        >
                            <X/>
                        </IconButton>
                    </div>
                )}

                <div>
                    <Row className="invoice-add">
                        <Col xl={12}>
                            <form onSubmit={handleSubmit(prepareData)}>
                                {backendErrors &&
                                    <Alert severity="error">
                                        <span>{backendErrors}: </span>
                                    </Alert>
                                }
                                <Row>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            label={translate('sale-orders-shipments.forms.consigneeName')}
                                            name="consigneeName"
                                            control={control}
                                            placeholder={translate('sale-orders-shipments.forms.consigneeName')}
                                            errors={errors}
                                        />
                                    </Col>

                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            label={translate('sale-orders-shipments.forms.consigneeCountry')}
                                            name="consigneeCountry"
                                            control={control}
                                            placeholder={translate('sale-orders-shipments.forms.consigneeCountry')}
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            label={translate('sale-orders-shipments.forms.consigneeCity')}
                                            name="consigneeCity"
                                            control={control}
                                            placeholder={translate('sale-orders-shipments.forms.consigneeCity')}
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            label={translate('sale-orders-shipments.forms.consigneeAddressStreet')}
                                            name="consigneeAddressStreet"
                                            control={control}
                                            placeholder={translate('sale-orders-shipments.forms.consigneeAddressStreet')}
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            label={translate('sale-orders-shipments.forms.consigneePostCode')}
                                            name="consigneePostCode"
                                            control={control}
                                            placeholder={translate('sale-orders-shipments.forms.consigneePostCode')}
                                            errors={errors}
                                        />
                                    </Col>

                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledAsyncSelectPaginate
                                            placeholder={translate("sale-orders-shipments.forms.shipmentProduct")}
                                            name={'shipmentProduct'}
                                            label={translate("sale-orders-shipments.forms.shipmentProduct")}
                                            control={control}
                                            getOptionsPromise={promiseShipmentsProductsOptions}
                                            defaultOptions={[]}
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledAsyncSelectPaginate
                                            placeholder={translate("sale-orders-shipments.forms.shipmentShipper")}
                                            name={'shipmentShipper'}
                                            label={translate("sale-orders-shipments.forms.shipmentShipper")}
                                            control={control}
                                            getOptionsPromise={promiseShipmentsShippersOptions}
                                            defaultOptions={[]}
                                            errors={errors}
                                        />
                                    </Col>
                                </Row>
                                <hr/>
                                <SaleOrderTable saleOrders={data?.data?.saleOrder ?? []}/>
                                <div className="d-flex align-items-center justify-content-start gap-1">
                                    <LoadingButton
                                        size="medium"
                                        type="submit"
                                        className={`${!btnDisabled && 'text-warning border-warning'} rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                        startIcon={<Edit size={14}/>}
                                        loadingPosition="start"
                                        loading={isLoading}
                                        disabled={btnDisabled}
                                        variant="outlined"
                                    >
                                        {translate('forms.Send')}
                                    </LoadingButton>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        outline
                                        onClick={goBack}
                                    >
                                        {translate('common.back')}
                                    </Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
            </Card>
        </>
    )
}