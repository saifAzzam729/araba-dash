import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import CustomModal from "@components/modal";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import CustomControlledDatePickerField from "@components/controlled-inputs/CustomControlledDatePickerField";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import ProductsService from "@src/common/services/ProductsService";
import CategoriesService from "@src/common/services/CategoriesService";
import {useMutation, useQuery} from "react-query";
import DiscountsService from "@src/common/services/DiscountsService";
import formatDateToSend from "@src/utility/helpers/formatDateForSend";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import OptionsService from "@src/common/services/OptionsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import UserGroupsService from "@src/common/services/UserGroupsService";
import TagsService from "@src/common/services/TagsService";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";

function AddDiscountModal({isOpen, closeModal, onAddSuccessCb, item = null}) {
    const [backendErrors, setBackendErrors] = useState([]);
    const [isTypeSelectedPercentage, setIsTypeSelectedPercentage] = useState(false);
    const {translate} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();


    const typeOfValueOptions = [
        {label: 'Percentage', value: "PERCENTAGE"},
        {label: 'Number', value: "FIXED"},

    ];

    const schema = yup.object().shape({
        nameEn: yup.string().required(translate('forms.field-required')),
        nameAr: yup.string().required(translate('forms.field-required')),
        value: yup.number().required(translate('forms.field-required')),
        type: yup.object().required(translate('forms.field-required')),
        startDate: yup.date().required(translate('forms.field-required')),
        expiryDate: yup.date().required(translate('forms.field-required')),
        applicableTo: yup.object().required(translate('forms.field-required')),
        userGroups: yup.array().required(translate('forms.field-required')),
    });

    const {
        handleSubmit,
        control,
        watch,
        formState: {errors},
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            applyToAll: false
        }

    })

    const nameEnFieldValue = watch('nameEn')

    useEffect(() => {
        if (nameEnFieldValue) {
            setValue('nameAr', nameEnFieldValue)
        }
    }, [nameEnFieldValue]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => DiscountsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            }
        }
    );

    const prepareData = (data) => {
        const {
            nameEn,
            nameAr,
            value,
            applicableTo,
            active,
            startDate,
            expiryDate,
            type,
            categories,
            products,
            userGroups,
            tags,
            applyToAll
        } = data;
        const preparedData = {
            value,
            active,
            type: type.value,
            startDate: formatDateToSend(startDate),
            expiryDate: formatDateToSend(expiryDate),
            applicableTo: applicableTo.value,
            translations: {
                en: {
                    name: nameEn,
                },
                ar: {
                    name: nameAr,
                },
            },
            userGroups: userGroups.map((user) => user.value),
            applyToAll,
        }
        if (applicableTo.value === 'CATEGORY' && !watch('applyToAll')) {
            preparedData.categories = categories.map((category) => category.value);
        }
        if (applicableTo.value === 'PRODUCT' && !watch('applyToAll')) {
            preparedData.products = products.map((product) => product.value);
        }
        if (applicableTo.value === 'TAG' && !watch('applyToAll')) {
            preparedData.tags = tags.map((tag) => tag.value);
        }
        mutate(preparedData)
    };

    const valueOfTypeField = watch('type')?.value
    useEffect(() => {
        if (valueOfTypeField === 'PERCENTAGE') {
            setIsTypeSelectedPercentage(true);
        } else {
            setIsTypeSelectedPercentage(false)
        }
    }, [valueOfTypeField]);

    const {data} = useQuery(
        ['applicableTo-options'],
        () => OptionsService.getApplicableToOptions({locale: preferredTableContentLocale}),
    )

    const applicableToOptions = data?.data ?? []

    const promiseCategoriesOptions = (
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
        CategoriesService.getPagination({
            page: page,
            search: search,
            limit: perPage,
            locale: preferredTableContentLocale
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

    const promiseUserGroupsOptions = (
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
        UserGroupsService.getPagination({
            page: page,
            search: search,
            limit: perPage,
            locale: preferredTableContentLocale
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

    const promiseProductsOptions = (
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
        ProductsService.getPagination({
            page: page,
            search: search,
            limit: perPage,
            locale: preferredTableContentLocale
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

    const promiseTagsOptions = (
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
        TagsService.getPagination({
            page: page,
            search: search,
            limit: perPage,
            locale: preferredTableContentLocale
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


    return (
        <CustomModal translatedHeader={translate("discount.common.add-discount")} isOpen={isOpen}
                     closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <div className="row">
                        <div className="col-6">
                            <CustomControlledInputField
                                name={'nameEn'}
                                label={translate("discount.forms.nameEn")}
                                control={control}
                                errors={errors}
                            />
                        </div>

                        <div className="col-6">
                            <CustomControlledInputField
                                name={'nameAr'}
                                label={translate("discount.forms.nameAr")}
                                control={control}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <CustomControlledDropdownField
                                name={'type'}
                                label={translate("discount.forms.type")}
                                placeholder={translate("forms.Select")}
                                control={control}
                                errors={errors}
                                options={typeOfValueOptions}
                            />
                        </div>
                        <div className="col-6">
                            <CustomControlledInputField
                                name={'value'}
                                label={translate("discount.forms.value")}
                                type={'number'}
                                control={control}
                                errors={errors}
                                percentageValidation={isTypeSelectedPercentage}
                                acceptsDecimals={true}

                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate("forms.Select")}
                                name='userGroups'
                                label={translate("discount.forms.userGroups")}
                                control={control}
                                getOptionsPromise={promiseUserGroupsOptions}
                                defaultOptions={[]}
                                isMulti={true}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <CustomControlledDropdownField
                                name={'applicableTo'}
                                label={translate("discount.forms.applicableTo")}
                                placeholder={translate("forms.Select")}
                                control={control}
                                errors={errors}
                                options={applicableToOptions}
                            />
                        </div>
                    </div>

                    {
                        watch('applicableTo')?.value === 'CATEGORY' && !watch('applyToAll') &&
                        <div className="row">
                            <div className="col">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder={translate("forms.Select")}
                                    name='categories'
                                    label={translate("discount.forms.categories")}
                                    control={control}
                                    getOptionsPromise={promiseCategoriesOptions}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    }

                    {
                        watch('applicableTo')?.value === 'PRODUCT' && !watch('applyToAll') &&
                        <div className="row">
                            <div className="col">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder={translate("forms.Select")}
                                    name='products'
                                    label={translate("discount.forms.products")}
                                    control={control}
                                    getOptionsPromise={promiseProductsOptions}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    }

                    {
                        watch('applicableTo')?.value === 'TAG' && !watch('applyToAll') &&
                        <div className="row">
                            <div className="col">
                                <CustomControlledAsyncSelectPaginate
                                    name='tags'
                                    placeholder={translate('common.tags')}
                                    label={translate('common.tags')}
                                    control={control}
                                    getOptionsPromise={promiseTagsOptions}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-6">
                            <CustomControlledDatePickerField
                                name={'startDate'}
                                label={translate("discount.forms.startDate")}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6">
                            <CustomControlledDatePickerField
                                name={'expiryDate'}
                                label={translate("discount.forms.expiryDate")}
                                control={control}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="form-check">
                                <CustomControlledCheckboxInput
                                    name="active"
                                    label={translate("discount.forms.active")}
                                    control={control}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-check">
                                <CustomControlledCheckboxInput
                                    name="applyToAll"
                                    label={translate("discount.forms.applyToAll")}
                                    control={control}
                                />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="col-auto">
                        <SubmitLoadingBtn/>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default AddDiscountModal