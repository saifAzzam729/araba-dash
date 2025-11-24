import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EBayService from "@src/common/services/EBayService";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import EBayLocationService from "@src/common/services/EBayLocationService";
import EBayPoliciesService from "@src/common/services/EBayPoliciesService";
import {marketPlaceOptions, PoliciesTypes} from "@src/views/pages/eBay/constants/PoliciesType";
import EbayListingService from "@src/common/services/EbayListingsService";
import {ebayListingFormSchema} from "@src/views/pages/eBay/listings/data";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";

const AddEBayListingModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {

    let defaultValues = undefined;
    const {translate, makeLocaleUrl, locale, preferredTableContentLocale} = useLocaleContext()


    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        watch
    } = useForm({
        resolver: yupResolver(ebayListingFormSchema(translate)),
    });

    const [backendErrors, setBackendErrors] = useState([]);
    const accountId = watch('ebayAccount');
    const marketVal = watch('marketPlace')?.value;
    const dependenciesKey = JSON.stringify([accountId?.value, marketVal])

    const promiseAccountsOptions = (searchValue) => new Promise((resolve) => {
        EBayService.getPagination({
            search: searchValue,
            locale: preferredTableContentLocale
        }).then((res) => {
            resolve(res.pagination.items.map((item) => {
                    return {
                        label: item.title,
                        value: item.id
                    }
                })
            )
        })
    });

    const promiseAccountLocationOptions = (searchValue) => {
        return (accountId?.value || marketVal)
            ? EBayLocationService.getPagination({
                search: searchValue,
                locale: preferredTableContentLocale,
                accountId: accountId.value,
                marketPlace: marketVal
            }).then((res) =>
                res.pagination.items.map((item) => ({
                    label: item.name,
                    value: item.id
                }))
            )
            : Promise.resolve([]);
    };
    const promiseAccountReturnOptions = (searchValue) => {
        return (accountId?.value || marketVal)
            ? EBayPoliciesService.getPagination({
                search: searchValue,
                locale: preferredTableContentLocale,
                id: accountId.value,
                type: PoliciesTypes.returnPolicy,
                marketPlace: marketVal
            }).then((res) =>
                res.pagination.items.map((item) => ({
                    label: item.name,
                    value: item.id
                }))
            )
            : Promise.resolve([]);
    };
    const promiseAccountShippingOptions = (searchValue) => {
        return (accountId?.value || marketVal)
            ? EBayPoliciesService.getPagination({
                search: searchValue,
                locale: preferredTableContentLocale,
                id: accountId.value,
                type: PoliciesTypes.shippingPolicy,
                marketPlace: marketVal

            }).then((res) =>
                res.pagination.items.map((item) => ({
                    label: item.name,
                    value: item.id
                }))
            )
            : Promise.resolve([]);
    };
    const promiseAccountSellingOptions = (searchValue) => {
        return (accountId?.value || marketVal)
            ? EBayPoliciesService.getPagination({
                search: searchValue,
                locale: preferredTableContentLocale,
                id: accountId.value,
                type: PoliciesTypes.sellingPolicy,
                marketPlace: marketVal

            }).then((res) =>
                res.pagination.items.map((item) => ({
                    label: item.name,
                    value: item.id
                }))
            )
            : Promise.resolve([]);
    };

    const {mutate, isError, isLoading} = useMutation(
        (data) => EbayListingService.create(data, locale),
        {
            onSuccess: onAddSuccessCb,

            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {
            name,
            ebayAccountSellingPolicy,
            ebayAccountShippingPolicy,
            ebayAccountLocation,
            ebayAccount,
            ebayAccountReturnPolicy,
            marketPlace
        } = data;
        const objectToSend = {
            marketplaceId: marketPlace?.value,
            name,
            ebayAccountSellingPolicy: ebayAccountSellingPolicy?.value,
            ebayAccountShippingPolicy: ebayAccountShippingPolicy?.value,
            ebayAccountLocation: ebayAccountLocation?.value,
            ebayAccount: ebayAccount?.value,
            ebayAccountReturnPolicy: ebayAccountReturnPolicy?.value,
        }
        mutate(objectToSend);

    };


    return (
        <CustomModal translatedHeader={translate("ebay-listing.common.add-list")} isOpen={isOpen}
                     closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row justify-content-center align-items-center">
                        <div className="col-6 mt-1">
                            <UncontrolledTextInput
                                name="name"
                                label={translate("ebay-listing.forms.name")}
                                register={register}
                                errorMessage={errors && errors.name?.message}
                                control={control}
                            />
                        </div>
                        <div className="col-6 ">
                            <CustomControlledAsyncSelectField
                                label={translate("ebay-listing.forms.account")}
                                name={"ebayAccount"}
                                control={control}
                                getOptionsPromise={promiseAccountsOptions}
                                errors={errors}
                            />
                        </div>

                        <div className="col-6 ">
                            <CustomControlledDropdownField
                                label={translate('ebay-listing.forms.marketPlace')}
                                name={"marketPlace"}
                                control={control}
                                options={marketPlaceOptions}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6 ">
                            <CustomControlledAsyncSelectField
                                label={translate("ebay-listing.forms.location")}
                                name={"ebayAccountLocation"}
                                control={control}
                                key={dependenciesKey}
                                getOptionsPromise={promiseAccountLocationOptions}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6 ">
                            <CustomControlledAsyncSelectField
                                label={translate("ebay-listing.forms.return")}
                                name={"ebayAccountReturnPolicy"}
                                control={control}
                                key={dependenciesKey}
                                getOptionsPromise={promiseAccountReturnOptions}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6 ">
                            <CustomControlledAsyncSelectField
                                label={translate("ebay-listing.forms.shipping")}
                                name={"ebayAccountShippingPolicy"}
                                control={control}
                                key={dependenciesKey}

                                getOptionsPromise={promiseAccountShippingOptions}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6 ">
                            <CustomControlledAsyncSelectField
                                label={translate("ebay-listing.forms.selling")}
                                name={"ebayAccountSellingPolicy"}
                                control={control}
                                key={dependenciesKey}
                                getOptionsPromise={promiseAccountSellingOptions}
                                errors={errors}
                            />
                        </div>

                    </div>

                    <hr/>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default AddEBayListingModal;
