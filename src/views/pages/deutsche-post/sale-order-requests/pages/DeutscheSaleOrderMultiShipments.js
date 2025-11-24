import React, {useState} from 'react';
import {Card, Col, Row} from 'reactstrap';
import useSaleOrdersStore from '@src/store/SaleOrderStore';
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import {useMutation} from "react-query";
import SaleOrdersShipmentsService from "@src/common/services/SaleOrdersShipmentsService";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";
import ShipmentShippersService from "@src/common/services/ShipmentShippersService";
import SaleOrderBadge from "@src/views/pages/dhl/sale-orders-requests/partials/SaleOrderBadge";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import ShipmentsBoxes from "@src/views/pages/dhl/sale-orders-requests/partials/ShipmentsBoxes";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    deutscheMultiShipSchema
} from "@src/views/pages/deutsche-post/sale-order-requests/schemas/deutscheMultiShipSchema";
import DeutscheOrdersLogger from "@src/views/pages/deutsche-post/sale-order-requests/partials/DeutscheOrdersLogger";

export default function () {
    const {saleOrders, clearSaleOrders} = useSaleOrdersStore();


    const [shipmentsLog, setShipmentsLog] = useState([]);


    const [shipments, setShipments] = useState([{id: 1, name: 'Shipment ', orders: []},]);


    const {translate, isRtl} = useLocaleContext()


    const {
        handleSubmit, formState: {errors}, control,
    } = useForm({
        defaultValues: {
            checkShipmentsValidation: false
        }, resolver: yupResolver(deutscheMultiShipSchema(translate, shipments))
    });


    const [backendErrors, setBackendErrors] = useState([]);


    const {mutate, isError, isLoading} = useMutation((data) => SaleOrdersShipmentsService.create(data),

        {
            onSuccess: (res) => {
                console.log(res, 'res')

                const items = res.items || [];
                const shipmentsLogs = items.map((item) => ({
                    shipStatus: item.status, shipId: item.shipmentId, saleOrderRefNumber: item.saleOrderRefNumber,labelUrl:item.shipmentLabel
                }));
                setShipmentsLog(shipmentsLogs)
                clearSaleOrders()
            }, onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        });


    const promiseShipmentsProductsOptions = (searchValue, prevOptions, additional,) => new Promise((resolve) => {
        const prevPage = additional?.prevPage ?? 0;

        const params = {
            search: searchValue, page: prevPage + 1,

        };
        const page = params.page;
        const perPage = 10;
        const search = params.search;
        ShipmentProductsService.getPagination({
            page: page, search: search, limit: perPage, shipping: SHIPPING_METHODS.DEUTSCHE_POST
        }).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: item.name, value: item.id,
                })), hasMore: currentPage < pages, additional: {
                    prevPage: currentPage, prevSearchValue: searchValue,
                },
            });
        });
    });

    const promiseShipmentsShippersOptions = (searchValue, prevOptions, additional,) => new Promise((resolve) => {
        const prevPage = additional?.prevPage ?? 0;

        const params = {
            search: searchValue, page: prevPage + 1,
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
                    label: item.name, value: item.id,
                })), hasMore: currentPage < pages, additional: {
                    prevPage: currentPage, prevSearchValue: searchValue,
                },
            });
        });
    });


    const handleShipmentsDefaultOrders = () => {

        return shipments.map((item) => {
            if (item.selectedOrderId) {

                const defaultOrder = item.orders.find(order => order.id === item.selectedOrderId);
                const restOrders = item.orders.filter(order => order.id !== item.selectedOrderId);
                return {...item, orders: [defaultOrder, ...restOrders]};
            } else if (item.orders.length > 0) {
                return {...item, orders: item.orders};
            } else {

                throw new Error('error')

            }
        });
    };
    const prepareData = (data) => {
        const reorderedShipments = handleShipmentsDefaultOrders();
        const {
            shipmentProduct, shipmentShipper
        } = data;

        const shipmentsToSend = reorderedShipments.map(ship => ({
            saleOrders: ship.orders.map(order => order.id),
        }));

        const shipmentDetails = {
            shipping: SHIPPING_METHODS.DEUTSCHE_POST,
            shipmentProduct: shipmentProduct.value,
            shipmentShipper: shipmentShipper.value,
            shipments: shipmentsToSend
        };


        mutate(shipmentDetails);
    };

    const addOrderToShipment = (item, shipmentId) => {
        setShipments((prevShipments) => {
            const updatedShipments = prevShipments.map((shipment) => ({
                ...shipment, orders: shipment.orders.filter((order) => order.id !== item.id),
            }));

            return updatedShipments.map((shipment) => shipment.id === shipmentId ? {
                ...shipment,
                orders: [...shipment.orders, item]
            } : shipment);
        });
    };


    return (<DndProvider backend={HTML5Backend}>
        <Card className={'p-2'}>
            <h4>{translate('common.multi-ship-request')}</h4>

            <DeutscheOrdersLogger shipmentsLog={shipmentsLog}/>

            <ShipmentsBoxes
                shipments={shipments}
                setShipments={setShipments}
                addOrderToShipment={addOrderToShipment}
            />
            <p className={'text-danger'}>
                {errors['checkShipmentsValidation'] ? errors['checkShipmentsValidation']?.message : null}
            </p>
            <hr/>
            {!!saleOrders.length && <>
                <h6>{translate('sale-orders-shipments.forms.your-orders')}</h6>
                <div className="d-flex flex-wrap ">
                    {saleOrders.map((order) => (<SaleOrderBadge
                        key={order.id}
                        order={order}
                    />))}
                </div>

            </>

            }


            <hr/>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column " style={{gap: "1rem"}}>
                    <Row>
                        <Controller
                            name="checkShipmentsValidation"
                            control={control}
                            render={({field}) => (<input type="hidden" {...field} />)}
                        />
                        <Col sm={12} md={6} className="mb-2">
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
                        <Col sm={12} md={6} className="mb-2">
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

                    <Row>
                        <Col xs={12} md={6} className="d-flex align-items-center">
                            <LoadingButton
                                size="medium"
                                type="submit"
                                className={`text-success border-success rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                startIcon={<Edit size={14}/>}
                                loadingPosition="start"
                                loading={isLoading}
                                variant="outlined"
                            >
                                {translate('forms.save')}
                            </LoadingButton>
                        </Col>
                    </Row>
                </div>
            </form>

        </Card>
    </DndProvider>);
};

