import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import CustomModal from "@components/modal";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledDatePickerField from "@components/controlled-inputs/CustomControlledDatePickerField";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import AffiliatePaymentService from "@src/common/services/AffiliatePaymentService";
import _ from "lodash";
import frormatDateToSend from "@src/utility/helpers/formatDateForSend";

function AddAffiliatePaymentModal({closeModal, isOpen, item, onAddSuccessCb}) {
    const {translate} = useLocaleContext()
    const {id: affiliateId} = useParams()
    const [backendErrors, setBackendErrors] = useState([]);
    const [sumValue, setSumValue] = useState(null);
    const day = new Date()

    const schema = yup.object().shape({
        amount: yup.number().required(translate('forms.field-required')),
        paymentDate: yup.date().required(translate('forms.field-required')),
        details: yup.array().required(translate('forms.field-required'))
    });


    const {
        handleSubmit,
        formState: {errors},
        control,
        watch,
        setValue
    } = useForm({
        defaultValues:{
            amount: 0,
            paymentDate: day.toISOString().slice(0, 10)
        },
        resolver: yupResolver(schema),
    });

    const promiseSaleOrdersOptions = (
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
        SaleOrdersService.getPagination({
            page: page,
            search: search,
            limit: perPage,
            affiliate: affiliateId,
            isPaidForAffiliate: false,
            status: "Completed"
        }).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: `${translate('affiliates.common.order')}: ${item.refNumber} | ${translate('affiliates.common.commission_total')}: ${item.affiliate?.commission ?? "_"}`,
                    value: item.id,
                    total: item.affiliate?.commission
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
        (data) => AffiliatePaymentService.create(affiliateId ,data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const selectedSaleOrderField = watch('details')
    useEffect(() => {

        const valuesOfSelectedOrder = selectedSaleOrderField?.map((or) => or?.total)
        const totalSum = _.sum(valuesOfSelectedOrder).toFixed(2);
        if (valuesOfSelectedOrder?.length > 0) {
            setValue('amount', totalSum);
        }

        setSumValue(totalSum);
    }, [selectedSaleOrderField]);


    const prepareData = (data) => {
        const {amount, paymentDate, details} = data;

        const detailsToSend = details ? details.map(order => ({
            "saleOrder": order.value.toString()
        })) : undefined;

        mutate({
            amount,
            paymentDate: frormatDateToSend(paymentDate),
            details: detailsToSend
        });
    };

    return (
        <>
            <CustomModal translatedHeader={translate("affiliates.common.add-affiliate-payment")} isOpen={isOpen} closeModal={closeModal}>
                <form onSubmit={handleSubmit(prepareData)}>
                    <ErrorAlert isError={isError} errors={backendErrors}/>
                    <div className="d-flex flex-column" style={{gap: "1rem"}}>
                        <div className="col-auto">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate('affiliates.forms.sale-orders')}
                                name={'details'}
                                label={translate('affiliates.forms.sale-orders')}
                                control={control}
                                getOptionsPromise={promiseSaleOrdersOptions}
                                defaultOptions={[]}
                                isMulti={true}
                                errors={errors}
                            />
                        </div>

                        <hr/>
                        <div className="row align-items-center">
                            <div className="col-6">
                                <p className='mb-0 mt-1'>{translate('affiliates.common.total-amount')}: </p>
                            </div>
                            <div className="col-6">
                                <strong className='mb-0 mt-1'>{sumValue}</strong>
                            </div>
                        </div>
                        <hr style={{marginBottom: 0}}/>

                        <div className="row align-items-center">
                            <div className="col-6">
                                <p className='mb-0 mt-1'>{translate('affiliates.common.amount-to-paid')}: </p>
                            </div>
                            <div className="col-6">
                                <CustomControlledInputField
                                    name="amount"
                                    placeholder={translate('affiliates.forms.amount')}
                                    control={control}
                                    errors={errors}
                                    type="number"
                                    disabled={true}
                                    minValue={sumValue}
                                    acceptsDecimals={true}
                                />
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-6">
                                <p className='mb-0 mt-1'>{translate('affiliates.common.payment-date')}: </p>
                            </div>
                            <div className="col-6">
                                <CustomControlledDatePickerField
                                    name={'paymentDate'}
                                    control={control}
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
        </>
    )
}

export default AddAffiliatePaymentModal
