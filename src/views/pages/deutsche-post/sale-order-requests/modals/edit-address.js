import {useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "react-query";
import CustomModal from "@components/modal";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import CustomControlledAsyncSelectPaginate
from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {yupResolver} from "@hookform/resolvers/yup";
import {editAddressSchema} from "@src/views/pages/dhl/sale-orders-requests/schemas/editAddressSchema";
import ShippingService from "@src/common/services/ShippingService";

export default function EditSaleOrderAddress({closeModal, isOpen, item, onEditSuccessCb}) {
    const [backendErrors, setBackendErrors] = useState([]);
    const {translate, locale} = useLocaleContext();


    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm({
        defaultValues: {
            ...item
        },
        resolver: yupResolver(editAddressSchema(translate)),
    });
    useQuery(
        ['sale-order-address', item.id],
        () => SaleOrdersService.getById(item.id, {locale}),
        {
            onSuccess: (res) => {
                const {data} = res;
                if (data.customShippingToAddress) {
                    for (const [key, value] of Object.entries(data.customShippingToAddress)) {
                        setValue(key, value)
                    }
                }

                setValue("shipping", {label: data.shipping.name, value: data.shipping.id});
            }
        }
    )
 
        
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

    const {mutate, isError, isLoading} = useMutation(
        (data) => SaleOrdersService.updateAddress(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );


    const onSubmit = ({
                        fullName,   
                        companyName,
                        phoneNumber,   
                        email,   
                        addressLine1,
                        addressLine2,
                        postalCode,
                        city,
                        countryIso3,
                        shipping,

                      }) => {
        const preparedData = {
            customShippingToAddress: {
                fullName,   
                companyName,
                phoneNumber,   
                email,   
                addressLine1,
                addressLine2,
                postalCode,
                city,
                countryIso3,
                shipping,

            },
            shipping: shipping?.value
        }
        mutate(preparedData)
    };

    return (
        <CustomModal translatedHeader={translate("sale-orders-shipments.update-address")} isOpen={isOpen}
                     closeModal={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('sale-orders-shipments.forms.companyName')}
                                name="companyName"
                                control={control}
                                placeholder={translate('sale-orders-shipments.forms.companyName')}
                                errors={errors}
                            />
                        </Col>

                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('sale-orders-shipments.forms.userFullName')}
                                name="fullName"
                                control={control}
                                placeholder={translate('sale-orders-shipments.forms.userFullName')}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('users.forms.email')}
                                name="email"
                                control={control}
                                placeholder={translate('users.forms.email')}
                                errors={errors}
                            />
                           
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('users.forms.phoneNumber')}
                                name="phoneNumber"
                                control={control}
                                placeholder={translate('users.forms.phoneNumber')}
                                errors={errors}
                            />
                           
                        </Col>

                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('sale-orders-shipments.forms.addressLine1')}
                                name="addressLine1"
                                control={control}
                                placeholder={translate('sale-orders-shipments.forms.addressLine1')}
                                errors={errors}
                            />
                           
                        </Col>

                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('sale-orders-shipments.forms.addressLine2')}
                                name="addressLine2"
                                control={control}
                                placeholder={translate('sale-orders-shipments.forms.addressLine2')}
                                errors={errors}
                            />
                           
                        </Col>

                       

                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('sale-orders-shipments.forms.postalCode')}
                                name="postalCode"
                                control={control}
                                placeholder={translate('sale-orders-shipments.forms.postalCode')}
                                errors={errors}
                            />
                        </Col>
                      
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('sale-orders-shipments.forms.city')}
                                name="city"
                                control={control}
                                placeholder={translate('sale-orders-shipments.forms.city')}
                                errors={errors}
                            />
                        </Col>  

                         <Col xs={12} md={6} className="mb-2">

                            <CustomControlledInputField
                                label={translate('sale-orders-shipments.forms.country')}
                                name="countryIso3"
                                control={control}
                                placeholder={translate('sale-orders-shipments.forms.country')}
                                errors={errors}
                            />
                           
                        </Col>
                        
                        

                        <Col sm={12} md={6} className="mb-2 ">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate("shipment-products.forms.shipping")}
                                name={'shipping'}
                                label={translate("sale-orders-shipments.forms.shipping")}
                                control={control}
                                getOptionsPromise={promiseShippingsOptions}
                                defaultOptions={[]}
                                errors={errors}
                            />
                            <p className={'text-danger'}>{translate('common.note')}</p>

                        </Col>

                        <Row>
                            <Col>
                                <SubmitLoadingBtn isLoading={isLoading}/>
                            </Col>


                        </Row>
                    </Row>
                </div>
            </form>
        </CustomModal>
    )
}