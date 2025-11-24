import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {Row, Col} from "reactstrap";
import {useEffect, useState} from "react";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import {CategoryResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import {useMutation, useQuery} from "react-query";
import CategoriesService from "../../../../common/services/CategoriesService";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";


const EditCategoryModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }

    const {preferredTableContentLocale} = useSettingsUiContext();
    const {translate} = useLocaleContext()


    const {control, register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues: {
            ...item,
            image: item.image && ParseImageUrl(item.imageFileUrl),
            guide: item.guide && ParseImageUrl(item.categoryGuideFileUrl),

        },
        resolver: CategoryResolvers.editResolver
    });

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => CategoriesService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
        ['category', item.id],
        () => CategoriesService.getById(item.id, {
            locale: preferredTableContentLocale
        }),
        {
            onSuccess: (res) => {
                const {data} = res;
                console.log('data', data)
                setValue("translations.en.name", data.translations.en.name);
                setValue("translations.ar.name", data.translations.ar.name);
                setValue("translations.en.description", data.translations.en.description);
                setValue("translations.ar.description", data.translations.ar.description);
                setValue("parent", {
                    value: data?.parent?.id,
                    label: data?.parent?.name,
                });
                setValue('guide', data?.categoryGuideFileUrl && ParseImageUrl(data?.categoryGuideFileUrl))
                setValue('image', ParseImageUrl(data?.imageFileUrl))
            }
        }
    )

    const prepareData = (data) => {
        const {translations, image, publish, parent, featured, guide} = data;
        const imageToSend = image && image.filter(file => file instanceof File);
        const guideImageToSend = guide && guide.filter(file => file instanceof File);
        console.log('data', data,'iii', imageToSend,'gg', guideImageToSend);
        
        mutate({
        
            id: item.id,
            translations,
            image: image && image.length > 0 ? imageToSend[0] : '',
            guide: guide && guide.length > 0 ? guideImageToSend[0] : '',
        
            publish,
            parent: parent ? parent.value : null,
            featured,
        });
    };    

    const promiseCategoriesOptions = (searchValue) => new Promise((resolve) => {
        CategoriesService.getPagination({
            search: searchValue,
            locale: preferredTableContentLocale
        }).then((res) => {
            resolve(res.pagination.items.map((item) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            )
        })
    });


    return (
        <CustomModal
            translatedHeader={translate("categories.common.edit-category")}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col xs={12} sm={6} className={'mt-1'}>
                            <UncontrolledTextInput
                                name="translations.en.name"
                                label={translate("categories.forms.nameEn")}
                                register={register}
                                errorMessage={errors && errors.translations?.en?.name?.message}
                            />
                        </Col>
                        <Col xs={12} sm={6} className={'mt-1'}>
                            <UncontrolledTextInput
                                name="translations.ar.name"
                                label={translate("categories.forms.nameAr")}
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.name?.message}
                            />
                        </Col>
                        <Col xs={12} sm={6} className={'mt-1'}>
                            <UncontrolledTextAreaInput
                                name="translations.en.description"
                                label={translate("categories.forms.descriptionEn")}
                                register={register}
                                errorMessage={errors && errors.translations?.en?.description?.message}
                            />
                        </Col>
                        <Col xs={12} sm={6} className={'mt-1'}>
                            <UncontrolledTextAreaInput
                                name="translations.ar.description"
                                label={translate("categories.forms.descriptionAr")}
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.description?.message}
                            />
                        </Col>
                        <Col xs={12} sm={6} className={'mt-1'}>
                            <CustomControlledAsyncSelectField
                                label={translate("categories.forms.parent")}
                                name={"parent"}
                                control={control}
                                getOptionsPromise={promiseCategoriesOptions}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={12} sm={3} className={'mt-1'}>
                            <CustomControlledCheckboxInput
                                name="publish"
                                label={translate("categories.forms.publish")}
                                control={control}
                                styles={'pt-50'}
                            />
                        </Col>
                        <Col xs={12} sm={3} className={'mt-1'}>
                            <CustomControlledCheckboxInput
                                name="featured"
                                label={translate("categories.forms.featured")}
                                control={control}
                                styles={'pt-50'}

                            />
                        </Col>
                    </Row>
                    <Row className={'mt-1'}>
                        <Col xs={6} className={"mt-2"}>
                            <CustomControlledImageUploader
                                control={control}
                                errors={errors}
                                label={translate('categories.forms.image')}
                                name={'image'}
                            />
                        </Col>

                        <Col xs={6} className={"mt-2"}>
                            <CustomControlledImageUploader
                                control={control}
                                errors={errors}
                                label={translate('categories.forms.guide')}
                                name={'guide'}
                            />
                        </Col>
                    </Row>
                    <hr/>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default EditCategoryModal;
