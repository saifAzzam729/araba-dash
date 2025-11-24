import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomModal from "@components/modal";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {Col, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import React, {useEffect, useState} from "react";
import BrandsService from "@src/common/services/BrandsService";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";
import {Edit} from "react-feather";
import LoadingButton from "@mui/lab/LoadingButton";
import {useMutation} from "react-query";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import ModelCompatibilityService from "@src/common/services/ModelCompatibilityService";
import {yupResolver} from "@hookform/resolvers/yup";
import {addModelSchema} from "@src/views/pages/model-compatibility/schemas/Add";

export default function AddModelCompatibilityModal({isOpen, closeModal, onAddSuccessCb, item = null}) {
    const {translate, isRtl} = useLocaleContext()
    const [backendErrors, setBackendErrors] = useState([]);

    const {
        handleSubmit,
        formState: {errors},
        control,
        watch,
        setValue
    } = useForm({
        resolver: yupResolver(addModelSchema(translate)),
    });

    const {mutate, isError, isLoading} = useMutation(
        (data) => ModelCompatibilityService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            }
        }
    );

    const promiseBrandsOptions = (
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
        BrandsService.getPagination({page: page, search: search, limit: perPage}).then((res) => {
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

    const nameEnValue = watch('nameEn') ?? ''
    const descriptionEnValue = watch('descriptionEn') ?? ''

    useEffect(() => {
        if (nameEnValue) {
            setValue('nameAr', nameEnValue);
        }

        if (descriptionEnValue) {
            setValue('descriptionAr', descriptionEnValue);
        }
    }, [nameEnValue, descriptionEnValue]);

    const prepareData = (data) => {
        const {
            nameEn,
            nameAr,
            brand,
            descriptionEn,
            descriptionAr,
            modelImage,
            publish
        } = data

        const translations = {
            en: {
                name: nameEn,
                description: descriptionEn
            },
            ar: {
                name: nameAr,
                description: descriptionAr
            }
        }

        mutate({
            translations,
            brand: brand && brand.value,
            modelImage: modelImage && modelImage[0],
            publish
        })
    }

    return (
        <CustomModal translatedHeader={translate('model-compatibility.common.add-model-compatibility')} isOpen={isOpen}
                     closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <Row>
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name="nameEn"
                            label={translate('model-compatibility.forms.nameEn')}
                            control={control}
                            errors={errors}
                        />
                    </Col>
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name="nameAr"
                            label={translate('model-compatibility.forms.nameAr')}
                            control={control}
                            errors={errors}
                        />
                    </Col>

                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name="descriptionEn"
                            label={translate('model-compatibility.forms.descriptionEn')}
                            control={control}
                            errors={errors}
                        />
                    </Col>
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name="descriptionAr"
                            label={translate('model-compatibility.forms.descriptionAr')}
                            control={control}
                            errors={errors}
                        />
                    </Col>

                    <Col xs={12} className="mb-2">
                        <CustomControlledAsyncSelectPaginate
                            placeholder={translate('model-compatibility.forms.brand')}
                            name='brand'
                            label={translate('model-compatibility.forms.brand')}
                            control={control}
                            getOptionsPromise={promiseBrandsOptions}
                            defaultOptions={[]}
                            errors={errors}
                        />
                    </Col>

                    <Col xs={12} className="mb-2">
                        <CustomControlledImageUploader
                            control={control}
                            errors={errors}
                            label={translate('model-compatibility.forms.modelImage')}
                            name={'modelImage'}
                        />
                    </Col>


                    <div className="d-flex align-items-center justify-content-between gap-1 mt-1">
                        <CustomControlledCheckboxInput
                            control={control}
                            label={translate('forms.publish')}
                            name={'publish'}
                        />

                        <LoadingButton
                            size="medium"
                            type="submit"
                            className={`text-primary border-primary rounded fw-bold gap-${isRtl ? 1 : 0}`}
                            startIcon={<Edit size={14}/>}
                            loadingPosition="start"
                            loading={isLoading}
                            variant="outlined"
                            sx={{padding: '7px 15px;'}}
                        >
                            {translate('forms.save')}
                        </LoadingButton>
                    </div>
                </Row>
            </form>
        </CustomModal>
    )
}