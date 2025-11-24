import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import {useMutation, useQuery} from "react-query";
import AffiliatePaymentService from "@src/common/services/AffiliatePaymentService";
import _ from "lodash";
import frormatDateToSend from "@src/utility/helpers/formatDateForSend";
import CustomModal from "@components/modal";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledDatePickerField from "@components/controlled-inputs/CustomControlledDatePickerField";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {X} from "react-feather";
import {Badge} from "reactstrap";

function EditAffiliatePaymentModal({closeModal, isOpen, item, onEditSuccessCb}) {
    const {translate} = useLocaleContext()
    const {id: affiliateId} = useParams()
    const [backendErrors, setBackendErrors] = useState([]);
    const [sumValue, setSumValue] = useState(0);
    const [removedValues, setRemovedValues] = useState([]);

    const schema = yup.object().shape({
        amount: yup.number().required(translate('forms.field-required')),
        paymentDate: yup.date().required(translate('forms.field-required')),
        details: yup.array().required(translate('forms.field-required'))
    });

    const defaultValues = {
        ...item,
        details: item.details.map(det => {
            return {
                total: det.saleOrder.commission,
                value: det.saleOrder.id,
                label: `${translate('affiliates.common.order')}: ${det.saleOrder.refNumber} | ${translate('affiliates.common.commission_total')}: ${det.saleOrder.commission}`
            }
        })
    }
    const {
        handleSubmit,
        formState: {errors},
        control,
        watch,
        setValue,
        getValues,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });


    const handleOnChange = (newValue, oldValues, selectAction) => {
        if (selectAction.action === "remove-value") {
            const existsInDetailsArray = item.details.some(item => (
                item.saleOrder.id === selectAction.removedValue.value &&
                item.saleOrder.commission === selectAction.removedValue.total
            ));

            if (existsInDetailsArray) {
                setRemovedValues(prevState => [...prevState, selectAction.removedValue]);
            }
        }
    };


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


    useQuery(
        ['affiliate-payment', item.id],
        () => AffiliatePaymentService.getById(affiliateId, item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("amount", data.amount);
                const saleOrders = data.details.map((order) => {
                    console.log('order', order)
                    return {
                        value: order.saleOrder.id,
                        label: `${translate('affiliates.common.order')}: ${order.saleOrder.refNumber} | ${translate('affiliates.common.commission_total')}: ${order.saleOrder.commission}`,
                        total: order.saleOrder.commission,
                    }
                })
                setValue("details", saleOrders);
            }
        }
    )

    const {mutate, isError, isLoading} = useMutation(
        (data) => AffiliatePaymentService.update(affiliateId, item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const selectedSaleOrderField = watch('details')

    useEffect(() => {
        const valuesOfSelectedOrder = selectedSaleOrderField?.map((or) => or?.total)
        const totalSum = _.sum(valuesOfSelectedOrder).toFixed(2);
        setSumValue(totalSum);
    }, [selectedSaleOrderField]);


    const prepareData = (data) => {
        const {amount, paymentDate, details} = data;
        const detailsToSend = details ? details.map(order => ({
            "saleOrder": order.value.toString()
        })) : undefined;

        mutate({
            payment_id: item.id,
            amount,
            paymentDate: frormatDateToSend(paymentDate),
            details: detailsToSend
        });
    };

    function handleRemoveButtonClick(obj) {
        const filterRemovedOptions = removedValues.filter((item) => item !== obj);
        setRemovedValues(filterRemovedOptions);
        const detailsValues = getValues('details')
        detailsValues.push(obj)
        setValue('details', detailsValues)
    }

    return (
        <>
            <CustomModal translatedHeader={translate("affiliates.common.edit-affiliate-payment")} isOpen={isOpen}
                         closeModal={closeModal}>
                <form onSubmit={handleSubmit(prepareData)}>
                    <ErrorAlert isError={isError} errors={backendErrors}/>
                    <div className="d-flex flex-column" style={{gap: "1rem"}}>
                        <div className="col-auto">
                            <CustomControlledAsyncSelectPaginate
                                isClearable={false}
                                placeholder={translate('affiliates.forms.sale-orders')}
                                name={'details'}
                                label={translate('affiliates.forms.sale-orders')}
                                control={control}
                                getOptionsPromise={promiseSaleOrdersOptions}
                                defaultOptions={[]}
                                isMulti={true}
                                errors={errors}
                                handelOnchange={handleOnChange}
                            />

                            {removedValues && removedValues.length > 0 && (
                                <div className='d-flex align-items-center mt-1'>
                                    <span className='text-danger' style={{fontSize: '13px'}}>
                                        {translate('affiliates.common.removed-option')}
                                    </span>
                                    {removedValues.map((val) =>
                                        <Badge className={'mx-25'} color='light-danger' pill>
                                            <span className='align-middle'>{val?.label}</span>
                                            <X
                                                size={12}
                                                className='align-middle mx-25 cursor-pointer'
                                                onClick={() => handleRemoveButtonClick(val)}
                                            />
                                        </Badge>
                                    )}
                                </div>
                            )}

                        </div>

                        <hr/>
                        <div className="row align-items-center">
                            <div className="col-6">
                                <p className='mb-0 mt-1'>{translate('affiliates.common.total-amount')}: </p>
                            </div>
                            <div className="col-6 mt-1">
                                <strong>{sumValue}</strong>
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

export default EditAffiliatePaymentModal