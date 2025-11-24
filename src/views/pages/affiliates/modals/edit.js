import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import CustomModal from "@components/modal";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useForm} from "react-hook-form";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import DiscountsService from "@src/common/services/DiscountsService";
import {useMutation, useQuery} from "react-query";
import AffiliatesService from "@src/common/services/AffiliatesService";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import * as yup from "yup";
import {useEffect, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import OptionsService from "@src/common/services/OptionsService";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "reactstrap";
import {X} from "react-feather";
import CustomControlledPasswordField from "@components/controlled-inputs/CustomControlledPasswordField";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";

function EditAffiliatesModal({isOpen, closeModal, onEditSuccessCb, item }) {
    if (!item) {
        return null;
    }

    const {translate} = useLocaleContext()
    const [backendErrors, setBackendErrors] = useState([]);
    const [priceTypeOptionList, setPriceTypeOptionList] = useState([]);

    const editSchema = yup.object().shape({
        name: yup.string().required(translate('forms.field-required')),
        email: yup.string().required(translate('forms.field-required')),
        commission_rate: yup.number().required(translate('forms.field-required')),
        commissionType: yup.object().shape({
            value: yup.string().required(translate('forms.field-required'))
        }),
    });
    const {
        register,
        handleSubmit,
        formState: {errors, dirtyFields},
        control,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            ...item
        },
        resolver: yupResolver(editSchema),
    });

    useQuery(
        ['price-type-options-list'],
        () => OptionsService.getPriceTypesOptions(), {
            onSuccess: ({data}) => {
                setPriceTypeOptionList(data)
            }
        }
    )

    const SLUG_PREFIX = 'A-';
    const slugValue = watch('slug')

    useEffect(() => {
        if(slugValue && !slugValue.startsWith(SLUG_PREFIX) && dirtyFields.slug){
            const updatedSlug = SLUG_PREFIX + slugValue;
            setValue('slug', updatedSlug);
        }
    }, [slugValue]);

    useQuery(
        ['affiliate', item.id],
        () => AffiliatesService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue('commission_rate', data.commissionRate)
                setValue("commissionType", {
                    label: data.commissionType === 'FIXED' ? 'Number' : data.commissionType,
                    value: data.commissionType
                });

                if (data.slug) {
                    const capitalizedSlug = data.slug.charAt(0).toUpperCase() + data.slug.slice(1);
                    setValue('add-slug', true);
                    setValue('slug', capitalizedSlug);
                }

                if (data.coupons.length > 0) {
                    setValue('add-coupon' , true)
                }
                const couponsValue = data.coupons.map((coupon) => {
                    return {
                        value: coupon.id, label:coupon.couponCode
                    }
                })
                setValue("coupons", couponsValue);
                setValue("active", data.active);

            }
        }
    )

    const {mutate, isLoading, isError} = useMutation(
        (data) => AffiliatesService.update(item.id ,data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const promiseCouponsOptions = (
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
        DiscountsService.getPagination({page: page, search: search , limit: perPage, isCoupon: true,}).then((res) => {
            const { pages, page: currentPage, items } = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: item.couponCode,
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
        const {name, email, slug, commission_rate, commissionType, coupons, password, active} = data;
        const couponsToSend = coupons.map((co) => {
            return { "couponCode": co.label };
        })
        mutate({
            id: item.id,
            name,
            email,
            slug,
            commission_rate,
            commissionType: commissionType.value,
            coupons: coupons ? couponsToSend : undefined,
            password,
            active
        })

    };

    const Add_Slug = watch('add-slug')
    const Add_Coupon = watch('add-coupon')

    const commissionTypeFieldValue = watch('commissionType')?.value;
    const commissionTypeIsPercentage = commissionTypeFieldValue === 'PERCENTAGE' ?? false;

    const handleClearField = () => {
        setValue('slug', "");
    };

    return (
        <CustomModal translatedHeader={translate("affiliates.common.edit-affiliate")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row mb-1">
                        <div className="col-6">
                            <CustomControlledInputField
                                name="name"
                                label={translate('affiliates.forms.name')}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6">
                            <CustomControlledInputField
                                name="email"
                                label={translate('affiliates.forms.email')}
                                control={control}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col-6">
                            <CustomControlledPasswordField
                                label={translate('affiliates.forms.password')}
                                name={'password'}
                                control={control}
                            />
                        </div>
                        <div className="col-6">
                            <CustomControlledCheckboxInput
                                label={translate('affiliates.forms.active')}
                                name="active"
                                control={control}
                            />
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col-6">
                            <CustomControlledDropdownField
                                name={'commissionType'}
                                label={translate('affiliates.forms.commissionType')}
                                control={control}
                                errors={errors}
                                options={priceTypeOptionList}
                            />
                        </div>
                        <div className="col-6">
                            <CustomControlledInputField
                                name="commission_rate"
                                label={translate('affiliates.forms.commission_rate')}
                                control={control}
                                errors={errors}
                                type="number"
                                percentageValidation={commissionTypeIsPercentage}
                            />
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-3">
                            <UncontrolledCheckboxInput
                                name="add-slug"
                                label={translate('affiliates.forms.add-slug')}
                                register={register}
                            />
                        </div>

                        {Add_Slug &&
                            <div className="col-9 d-flex gap-1 align-items-center">
                                <div className={'w-100'}>
                                    <CustomControlledInputField
                                        name="slug"
                                        placeholder={'A-'}
                                        // label={translate('affiliates.forms.slug')}
                                        control={control}
                                        errors={errors}
                                    />
                                    <p className='text-primary'>{translate('affiliates.forms.slug-validation')}</p>
                                </div>
                                <div className={'mb-1'}>
                                    <Button className='btn-icon' color='primary'
                                            onClick={handleClearField} outline>
                                        <X size={14}/>
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="row align-items-center">
                        <div className="col-3">
                            <UncontrolledCheckboxInput
                                name="add-coupon"
                                label={translate('affiliates.forms.add-coupon')}
                                register={register}
                            />
                        </div>
                        {Add_Coupon &&
                            <div className="col-9">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder='coupons'
                                    name='coupons'
                                    // label={translate('affiliates.forms.coupons')}
                                    control={control}
                                    getOptionsPromise={promiseCouponsOptions}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </div>
                        }
                    </div>

                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading} />
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default EditAffiliatesModal