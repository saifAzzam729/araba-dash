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
import {DownloadLabelIcon, ManifestIcon} from "@src/views/pages/eBay/orders/sale-orders-shipments/columns";
import showErrorAlert from "@components/alert/showErrorAlert";

import SaleOrderTable from "@src/views/pages/deutsche-post/sale-order-shipments/partials/SaleOrderTable";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";

export default function EditSaleOrdersShipmentsPage() {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {translate, isRtl} = useLocaleContext();
    const {id} = useParams();
    const {width} = useWindowSize()
    const {preferredTableContentLocale} = useSettingsUiContext();
    const [openValidationMsg, setOpenValidationMsg] = useState(false);
    const [validationMessages, setValidationMessages] = useState([]);
    const [shippingMethod, setShippingMethod] = useState(null);


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
            dimUom: "",
            height: "",
            length: "",
            width: "",
            weightUom: "",
            weight: "",
            shipmentProduct: null,
            shipmentShipper: null
        },
    });

    const {data, refetch} = useQuery(
        ['sale-order-shipment', id],
        () => SaleOrdersShipmentsService.getById(id, {locale: preferredTableContentLocale}),
        {
            onSuccess: (res) => {
                const {data} = res;
                if (data.validationMessage && data.validationMessage.length > 0) {
                    setValidationMessages(data.validationMessage);
                    setOpenValidationMsg(true);
                }
                setShippingMethod(data?.Shipping?.id)
                setValue('shipmentProduct', {label: data.shipmentProduct.name, value: data.shipmentProduct.id})
                setValue('shipmentShipper', {label: data.shipmentShipper.name, value: data.shipmentShipper.id})
                setValue('consigneeName', data.consigneeName)
                setValue('consigneeName2', data.consigneeName2)
                setValue('consigneeName3', data.consigneeName3)
                setValue('consigneeCountry', data.consigneeCountry)
                setValue('consigneeCity', data.consigneeCity)
                setValue('consigneeAddressStreet', data.consigneeAddressStreet)
                setValue('consigneePostCode', data.consigneePostCode)
                if (data.Shipping?.id === SHIPPING_METHODS.DHL) {
                    setValue('consigneePhone', data.consigneePhone)
                    setValue('consigneeEmail', data.consigneeEmail)
                    setValue('consigneeAdditionalAddressInformation', data.consigneeAdditionalAddressInformation)
                    setValue('dimUom', data.dimUom)
                    setValue('height', data.height)
                    setValue('length', data.length)
                    setValue('width', data.width)
                    setValue('weightUom', data.weightUom)
                    setValue('weight', data.weight)

                }

            }
        }
    )

    const [backendErrors, setBackendErrors] = useState(null);

    const {mutate, isError, isLoading} = useMutation(
        (data) => SaleOrdersShipmentsService.update(id, data),
        {
            onSuccess: () => {
                refetch()
                showSuccessAlert({});
            },
            onError: (error) => {
                console.log('errr', error)
                setBackendErrors(error.response.data.error);
            },
        }
    );

    const {mutate: manifestMutate} = useMutation(
        (data) => SaleOrdersShipmentsService.createManifest(data),
        {
            onSuccess: () => {
                refetch();
                showSuccessAlert({});
            },
            onError: () => {
                showErrorAlert({})
            }
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
            consigneeName2,
            consigneeName3,
            consigneeEmail,
            consigneePhone,
            consigneeCountry,
            consigneeCity,
            consigneeAddressStreet,
            consigneeAdditionalAddressInformation,
            consigneePostCode,
            dimUom,
            height,
            length,
            width,
            weightUom,
            weight,
            shipmentProduct,
            shipmentShipper,
        } = data;


        const baseFields = {
            consigneeName,
            consigneeName2,
            consigneeName3,
            consigneeCountry,
            consigneeCity,
            consigneeAddressStreet,
            consigneePostCode,
            shipmentProduct: shipmentProduct?.value,
            shipmentShipper: shipmentShipper?.value,
        };


        const dhlFields = {
            consigneeAdditionalAddressInformation,
            consigneePhone,
            consigneeEmail,
            dimUom,
            height,
            length,
            width,
            weightUom,
            weight,
        };


        const filteredData = {
            ...baseFields,
            ...(shippingMethod === SHIPPING_METHODS.DHL ? dhlFields : {}),
        };
        mutate(filteredData);
    };

    const goBack = () => {
        navigate(makeLocaleUrl("/sale-orders-shipments"));
    };

    let badgeColor = 'light-success';
    if (data?.data?.status === 'UN_COMPLETED') {
        badgeColor = 'light-danger';
    } else if (data?.data?.status === 'COMPLETED_NEED_MANIFEST') {
        badgeColor = 'light-warning';
    }

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


                        <DownloadLabelIcon labelUrl={data?.data?.labelUrl}
                                           disabled={data?.data?.status === 'VALID' || data?.data?.status === 'UN_COMPLETED'}/>
                    </div>
                </div>

                {openValidationMsg && (
                    <div key={validationMessages} className="validation-messages position-relative mb-2">
                        {validationMessages.map((msg, index) => {
                            let severity;
                            if (msg.validationState === 'Warning') {
                                severity = 'warning';
                            } else if (msg.validationState === 'Error') {
                                severity = 'error';
                            } else {
                                severity = 'success';
                            }

                            return (
                                <Alert key={index} severity={severity}>
                                    {msg.validationMessage}
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
                                            label={translate('sale-orders-shipments.forms.consigneeName2')}
                                            name="consigneeName2"
                                            control={control}
                                            placeholder={translate('sale-orders-shipments.forms.consigneeName2')}
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            label={translate('sale-orders-shipments.forms.consigneeName3')}
                                            name="consigneeName3"
                                            control={control}
                                            placeholder={translate('sale-orders-shipments.forms.consigneeName3')}
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
                                    {
                                        shippingMethod === SHIPPING_METHODS.DHL && <>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.consigneeEmail')}
                                                    name="consigneeEmail"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.consigneeEmail')}
                                                    errors={errors}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.consigneePhone')}
                                                    name="consigneePhone"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.consigneePhone')}
                                                    errors={errors}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.consigneeAdditionalAddressInformation')}
                                                    name="consigneeAdditionalAddressInformation"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.consigneeAdditionalAddressInformation')}
                                                    errors={errors}
                                                />
                                            </Col>

                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.dimensionUom')}
                                                    name="dimUom"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.dimensionUom')}
                                                    errors={errors}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.height')}
                                                    name="height"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.height')}
                                                    errors={errors}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.length')}
                                                    name="length"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.length')}
                                                    errors={errors}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.width')}
                                                    name="width"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.width')}
                                                    errors={errors}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.weightUom')}
                                                    name="weightUom"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.weightUom')}
                                                    errors={errors}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="mb-2">
                                                <CustomControlledInputField
                                                    label={translate('sale-orders-shipments.forms.weight')}
                                                    name="weight"
                                                    control={control}
                                                    placeholder={translate('sale-orders-shipments.forms.weight')}
                                                    errors={errors}
                                                />
                                            </Col>
                                        </>
                                    }
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
                                <SaleOrderTable saleOrders={data?.data?.saleOrder ?? []}/>
                                <hr/>

                                <div className="d-flex align-items-center justify-content-start gap-1">
                                    <LoadingButton
                                        size="medium"
                                        type="submit"
                                        className={`text-warning border-warning rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                        startIcon={<Edit size={14}/>}
                                        loadingPosition="start"
                                        loading={isLoading}
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