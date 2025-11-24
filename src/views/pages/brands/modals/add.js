import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {BrandResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import {useEffect, useState} from "react";
import { useMutation } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import BrandsService from "../../../../common/services/BrandsService";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";

const AddBrandModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {
    
    let defaultValues = undefined;
    const {translate} = useLocaleContext()

    if (item) {
        defaultValues = {
            ...item,
            "translations.en.name": item.name,
            "translations.en.description": item.description,
        };
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        watch,
        setValue
    } = useForm({
        defaultValues,
        resolver: BrandResolvers.addResolver,
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => BrandsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const nameEnValue = watch('translations.en.name') ?? ''
    const descriptionEnValue = watch('translations.en.description') ?? ''

    useEffect(() => {
        if (nameEnValue) {
            setValue('translations.ar.name', nameEnValue);
        }

        if (descriptionEnValue) {
            setValue('translations.ar.description', descriptionEnValue);
        }
    }, [nameEnValue, descriptionEnValue]);

    const prepareData = (data) => {
        const {translations, image, publish, featured} = data;
        mutate({translations, image, publish, featured});
    };


    return (
        <CustomModal translatedHeader={translate("brands.common.add-brand")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row">
                        <div className="col-6">
                            <UncontrolledTextInput
                                name="translations.en.name"
                                label={translate("brands.forms.nameEn")}
                                register={register}
                                errorMessage={errors && errors.translations?.en?.name?.message}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextInput
                                name="translations.ar.name"
                                label={translate("brands.forms.nameAr")}
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.name?.message}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.en.description"
                                label={translate("brands.forms.descriptionEn")}
                                register={register}
                                errorMessage={errors && errors.translations?.en?.description?.message}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.ar.description"
                                label={translate("brands.forms.descriptionAr")}
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.description?.message}
                            />
                        </div>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="image" className="form-label">
                            {translate("brands.forms.image")}
                        </label>
                        <input
                            className="form-control form-control-lg"
                            id="image"
                            {...register("image")}
                            type="file"
                        />
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                            <CustomControlledCheckboxInput
                                label={translate("brands.forms.publish")}
                                name="publish"
                                control={control}
                                styles={'d-flex gap-75 flex-column-reverse'}

                            />
                        </div>
                        <div className="col-6">
                            <CustomControlledCheckboxInput
                                label={translate("brands.forms.featured")}
                                name="featured"
                                control={control}
                                styles={'d-flex gap-75 flex-column-reverse'}
                            />
                        </div>

                    </div>
                    <hr/>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading} />
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default AddBrandModal;
