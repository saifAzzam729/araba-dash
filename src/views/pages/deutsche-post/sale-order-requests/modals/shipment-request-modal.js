import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import React, {useState} from "react";
import {Col, Row} from "reactstrap";
import CustomModal from "@components/modal";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import SaleOrdersShipmentsService from "@src/common/services/SaleOrdersShipmentsService";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import ShipmentShippersService from "@src/common/services/ShipmentShippersService";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";

export default function ShipmentRequestModal({closeModal, isOpen, item, onShipmentRequestSuccessCb}) {
    if (!item) {
        return null
    }

    const {translate, isRtl} = useLocaleContext()

    const {
        handleSubmit,
        formState: {errors},
        control,
        watch
    } = useForm({
        defaultValues: {},
        // resolver: yupResolver(addShipmentPackagesSchema(translate)),
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => SaleOrdersShipmentsService.create(data),

        {

            onSuccess: (res) => {
                const items = res.items || [];
                console.log('item validation', items)

                const validationMessages = items
                    .flatMap(itemArray => itemArray)  // Flatten the top-level array
                    .flatMap(item => item.validation_message || []);


                const shipmentId = items.flatMap(itemArray => itemArray)
                    .flatMap(item => item.shipmentId || []);
                const shipmentLabel = items.flatMap(itemArray => itemArray)
                    .flatMap(item => item.shipmentLabel);

                if (validationMessages.length > 0) {
                    onShipmentRequestSuccessCb(shipmentId, validationMessages, shipmentLabel);
                } else {
                    onShipmentRequestSuccessCb(shipmentId, [], shipmentLabel);
                }
            },


            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
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
            page: page, search: search, limit: perPage, shipping: SHIPPING_METHODS.DEUTSCHE_POST
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
            shipmentProduct,
            shipmentShipper
        } = data;

        const shipmentDetails = {
            shipping: SHIPPING_METHODS.DEUTSCHE_POST,
            shipmentProduct: shipmentProduct.value,
            shipmentShipper: shipmentShipper.value,
            shipments: [{
                saleOrders: [item.id]
            }]
        };



        mutate(shipmentDetails);
    };

    return (
        <CustomModal translatedHeader={translate("sale-orders-shipments.create-shipment-request")}
                     isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
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
        </CustomModal>
    )

}