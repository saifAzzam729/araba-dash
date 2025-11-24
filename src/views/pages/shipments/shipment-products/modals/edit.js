import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import React, {useState} from "react";
import {useMutation} from "react-query";
import ShippingService from "@src/common/services/ShippingService";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Col, Row} from "reactstrap";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import {yupResolver} from "@hookform/resolvers/yup";
import {editShipmentProductSchema} from "@src/views/pages/shipments/shipment-products/schemas/Edit";
import CheckShippingValue from "@src/views/pages/shipments/shipment-products/CheckShippingValue";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";

const EditShipmentProductsModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }

    const {translate, isRtl} = useLocaleContext()

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        defaultValues: {
            ...item,
            shipping: {label: item.shipping.name, value: item.shipping.id},
            total: item.price
        },
        resolver: yupResolver(editShipmentProductSchema(translate)),
    });
    const shippingVal = watch('shipping')?.value

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => ShipmentProductsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const promiseShippingsOptions = (
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
        ShippingService.getPagination({
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
        const {name, description, code, billingNumber, shipping, total} = data;

        const objToSend = {
            name,
            description,
            code,
            billingNumber,
            shipping: shipping?.value,

        }
        if (shippingVal === SHIPPING_METHODS.DEUTSCHE_POST) {
            objToSend['price'] = total
        }
        mutate(objToSend)
    };

    return (
        <CustomModal translatedHeader={translate("shipment-products.common.edit-shipment-product")} isOpen={isOpen}
                     closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col sm={12} className="mb-2">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate("shipment-products.forms.shipping")}
                                name={'shipping'}
                                label={translate("shipment-products.forms.shipping")}
                                control={control}
                                getOptionsPromise={promiseShippingsOptions}
                                defaultOptions={[]}
                                errors={errors}
                            />
                        </Col>

                        <CheckShippingValue hasValue={shippingVal}>

                            <Col sm={12} md={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate("shipment-products.forms.name")}
                                    name="name"
                                    control={control}
                                    placeholder={translate("shipment-products.forms.name")}
                                    errors={errors}
                                />
                            </Col>
                            <Col sm={12} md={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate("shipment-products.forms.description")}
                                    name="description"
                                    control={control}
                                    placeholder={translate("shipment-products.forms.description")}
                                    errors={errors}
                                />
                            </Col>
                            <Col sm={12} md={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate("shipment-products.forms.code")}
                                    name="code"
                                    control={control}
                                    placeholder={translate("shipment-products.forms.code")}
                                    errors={errors}
                                />
                            </Col>
                            {
                                shippingVal === SHIPPING_METHODS.DHL &&

                                <Col sm={12} md={6} className="mb-2">
                                    <CustomControlledInputField
                                        label={translate("shipment-products.forms.billingNumber")}
                                        name="billingNumber"
                                        control={control}
                                        placeholder={translate("shipment-products.forms.billingNumber")}
                                        errors={errors}
                                    />
                                </Col>
                            }


                            {
                                shippingVal === SHIPPING_METHODS.DEUTSCHE_POST &&
                                <Col sm={12} md={6} className="mb-2">

                                    <CustomControlledInputField
                                        label={translate("shipment-products.forms.price")}
                                        name="total"
                                        control={control}
                                        placeholder={translate("shipment-products.forms.price")}
                                        errors={errors}
                                    />
                                </Col>
                            }
                        </CheckShippingValue>
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
    );
};

export default EditShipmentProductsModal;
