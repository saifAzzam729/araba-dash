import {Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import React, {useEffect, useMemo, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import SaleOrdersShipmentsService from "@src/common/services/SaleOrdersShipmentsService";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";
import ShipmentShippersService from "@src/common/services/ShipmentShippersService";
import ShipmentPackagesService from "@src/common/services/ShipmentPackagesService";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import useSaleOrdersStore from "@src/store/SaleOrderStore";
import OrdersLogger from "@src/views/pages/dhl/sale-orders-requests/partials/OrdersLogger";
import {shippingSchemaFactory} from "@src/views/pages/eBay/orders/sale-orders-shipments/schemas/shippingSchemaFactory";
import {yupResolver} from "@hookform/resolvers/yup";

export default function ({refetchOrders, expandAll}) {

    const {translate, isRtl} = useLocaleContext()
    const [shipmentsLog, setShipmentsLog] = useState([]);

    const {saleOrders, clearSaleOrders} = useSaleOrdersStore()

    const [packageFieldDisabled, setIsPackageFieldDisabled] = useState(false)
    const {
        handleSubmit,
        formState: {errors},
        control,
        watch,
        setValue
    } = useForm({
        defaultValues: {},
        resolver: yupResolver(shippingSchemaFactory(translate, saleOrders)),
    });

    const [backendErrors, setBackendErrors] = useState([]);
    const productOpValue = watch('shipmentProduct') ?? ''

    useMemo(() => {
        if (productOpValue.productType === SHIPPING_METHODS.DEUTSCHE_POST) {
            setIsPackageFieldDisabled(true)
            setValue('shipmentPackage', '')
        } else {
            setIsPackageFieldDisabled(false)
        }
    }, [productOpValue]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => SaleOrdersShipmentsService.create(data),

        {
            onSuccess: (res) => {
                const items = res.items || [];
                const shipmentsLogs = items.map((item) => (
                    {
                        shipStatus: item.status,
                        shipId: item.shipmentId,
                        saleOrderRefNumber: item.saleOrderRefNumber,
                        labelUrl: item.shipmentLabel
                    }
                ));
                setShipmentsLog(shipmentsLogs)
                clearSaleOrders()

            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
            onSettled: async () => {

                await refetchOrders()
                setTimeout(() => {
                    expandAll();
                }, 1000);

            }
        }
    );


    const promiseShipmentsPackageOptions = (
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
        ShipmentPackagesService.getPagination({
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
                    label: `${item.name} - ${item.price ?? ''}`,
                    value: item.id,
                    productType: item?.shipping?.id,
                    defaultProduct: item?.defaultProduct
                })),
                hasMore: currentPage < pages,
                additional: {
                    prevPage: currentPage,
                    prevSearchValue: searchValue,
                },
            });
        });
    });


    useEffect(() => {
        promiseShipmentsPackageOptions("", [], {}).then((result) => {
            if (result.options.length > 0) {
                setValue("shipmentPackage", result.options[0]);
            }
        });

        promiseShipmentsShippersOptions("", [], {}).then((result) => {
            if (result.options.length > 0) {
                setValue("shipmentShipper", result.options[0]);
            }
        });

        promiseShipmentsProductsOptions("", [], {}).then((result) => {
            if (result.options.length > 0) {
                const defaultProduct = result.options.find((option) => {
                    return option.defaultProduct == true;
                })
                if (defaultProduct) {
                    setValue("shipmentProduct", defaultProduct);
                }
            }
        });


    }, []);


    const prepareData = (data) => {
        const {

            shipmentProduct,
            shipmentShipper,
            shipmentPackage,
            shipTogether
        } = data;
        const shipmentDetails = {
            shipmentProduct: shipmentProduct.value,
            shipmentShipper: shipmentShipper.value,
            shipments: shipTogether ? [{saleOrders: saleOrders.map((item) => item.id)}]
                : saleOrders.map((item) => ({saleOrders: [item.id]}))
        }
        if (shipmentPackage) {
            shipmentDetails.shipmentPackage = shipmentPackage.value
        }
        mutate(shipmentDetails);
    };
    return (
        <>
            <Card className=' bg-white'>
                <CardHeader className={'d-flex flex-column gap-2 align-items-start'}>
                    <CardTitle tag='h4'>
                        {translate('common.create-ship')}
                    </CardTitle>
                    <CardSubtitle>
                        <h6 className={'text-danger  d-block'}>
                            {errors['checkShipmentsValidation'] ? errors['checkShipmentsValidation']?.message : null}
                        </h6>
                    </CardSubtitle>


                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(prepareData)}>
                        <ErrorAlert isError={isError} errors={backendErrors}/>
                        <div className="d-flex flex-column " style={{gap: "1rem"}}>
                            <Row>
                                <Col sm={12} md={12} className="mb-2">
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
                                <Col sm={12} md={12} className="mb-2">
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
                                <Col sm={12} md={12} className="mb-2">
                                    <CustomControlledAsyncSelectPaginate
                                        placeholder={translate("sale-orders-shipments.forms.shipmentPackage")}
                                        name={'shipmentPackage'}
                                        label={translate("sale-orders-shipments.forms.shipmentPackage")}
                                        control={control}
                                        getOptionsPromise={promiseShipmentsPackageOptions}
                                        defaultOptions={[]}
                                        errors={errors}
                                        isDisabled={packageFieldDisabled}
                                    />
                                </Col>
                                <Col sm={12} className="mb-2">
                                    <CustomControlledCheckboxInput
                                        name="shipTogether"
                                        label={translate("sale-orders-shipments.forms.shipTogether")}
                                        control={control}
                                        styles={'pt-50'}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12} className="d-flex align-items-center">
                                    <LoadingButton
                                        size="medium"
                                        type="submit"
                                        className={`text-success border-success rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                        startIcon={<Edit size={14}/>}
                                        loadingPosition="start"
                                        loading={isLoading}
                                        variant="outlined"
                                    >
                                        {translate('forms.create-ship')}
                                    </LoadingButton>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <OrdersLogger shipmentsLog={shipmentsLog}/>
        </>
    )
}