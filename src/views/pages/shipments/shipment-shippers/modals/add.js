import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import ShippingService from "@src/common/services/ShippingService";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import {Col, Row} from "reactstrap";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import {yupResolver} from "@hookform/resolvers/yup";
import {addShipmentProductSchema} from "@src/views/pages/shipments/shipment-products/schemas/Add";
import ShipmentShippersService from "@src/common/services/ShipmentShippersService";
import CountriesService from "@src/common/services/CountriesService";
import CitiesService from "@src/common/services/CitiesService";
import {addShipmentShipperSchema} from "@src/views/pages/shipments/shipment-shippers/schemas/Add";

const AddShipmentShipperModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {
    const {translate, isRtl} = useLocaleContext()
    const {
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            addressStreet: '',
            additionalAddressInformation: '',
            email: '',
            phone: undefined,
            country: undefined,
            city: undefined,
            postalCode: ''
        },
        resolver: yupResolver(addShipmentShipperSchema(translate)),
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => ShipmentShippersService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const promiseCountriesOptions = (
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
        CountriesService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
            const { pages, page: currentPage, items } = res.pagination;
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

    const promiseCitiesOptions = (
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
        CitiesService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
            const { pages, page: currentPage, items } = res.pagination;
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
            name,
            description,
            addressStreet,
            additionalAddressInformation,
            email,
            phone,
            country,
            city,
            postalCode,
        } = data;
        mutate({
            name,
            description,
            addressStreet,
            additionalAddressInformation,
            email,
            phone,
            country: country.value,
            city: city.value,
            postalCode,
        });
    };


    return (
        <CustomModal translatedHeader={translate("shipment-shippers.common.add-shipment-shipper")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-shippers.forms.name")}
                                name="name"
                                control={control}
                                placeholder={translate("shipment-shippers.forms.name")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-shippers.forms.description")}
                                name="description"
                                control={control}
                                placeholder={translate("shipment-shippers.forms.description")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-shippers.forms.email")}
                                name="email"
                                control={control}
                                placeholder={translate("shipment-shippers.forms.email")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-shippers.forms.phone")}
                                name="phone"
                                control={control}
                                placeholder="3972945153"
                                errors={errors}
                                type="tel"
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-shippers.forms.addressStreet")}
                                name="addressStreet"
                                control={control}
                                placeholder={translate("shipment-shippers.forms.addressStreet")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-shippers.forms.additionalAddressInformation")}
                                name="additionalAddressInformation"
                                control={control}
                                placeholder={translate("shipment-shippers.forms.additionalAddressInformation")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-shippers.forms.postalCode")}
                                name="postalCode"
                                control={control}
                                placeholder={translate("shipment-shippers.forms.postalCode")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate("shipment-shippers.forms.country")}
                                name={'country'}
                                label={translate("shipment-shippers.forms.country")}
                                control={control}
                                getOptionsPromise={promiseCountriesOptions}
                                defaultOptions={[]}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate("shipment-shippers.forms.city")}
                                name={'city'}
                                label={translate("shipment-shippers.forms.city")}
                                control={control}
                                getOptionsPromise={promiseCitiesOptions}
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
    );
};

export default AddShipmentShipperModal;
