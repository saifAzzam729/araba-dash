import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {ShippingResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import {useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import ShippingService from "@src/common/services/ShippingService";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const AddShippingModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {

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
        control
    } = useForm({
        defaultValues,
        resolver: ShippingResolvers.addResolver,
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => ShippingService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {translations, icon, publish, value, minSubtotalValue, defaultMethod} = data;
        mutate({translations, icon, publish, value, minSubtotalValue, defaultMethod});
    };


    return (
        <CustomModal translatedHeader={translate("shipping.common.add-shipping")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row">
                        <div className="col-6">
                            <UncontrolledTextInput
                                name="translations.en.name"
                                label={translate("shipping.forms.nameEn")}
                                register={register}
                                errorMessage={errors && errors.translations?.en?.name?.message}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextInput
                                name="translations.ar.name"
                                label={translate("shipping.forms.nameAr")}
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.name?.message}
                            />
                        </div>
                    </div>

                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.en.description"
                                label={translate("shipping.forms.descriptionEn")}
                                register={register}
                                errorMessage={errors && errors.translations?.en?.description?.message}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.ar.description"
                                label={translate("shipping.forms.descriptionAr")}
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.description?.message}
                            />
                        </div>
                    </div>

                    <hr/>

                    <div className="row">

                        <div className="col-6">
                            <CustomControlledInputField
                                name={'value'}
                                label={translate("shipping.forms.value")}
                                type={'number'}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6">
                            <CustomControlledInputField
                                name={'minSubtotalValue'}
                                label={translate("shipping.forms.minSubtotalValue")}
                                type={'number'}
                                control={control}
                                errors={errors}
                            />
                        </div>
                    </div>
                    <hr/>

                    <div className={"row"}>
                        <div className="col-6">
                            <label htmlFor="image" className="form-label">
                                {translate("shipping.forms.icon")}
                            </label>
                            <input
                                className="form-control form-control-lg"
                                id="image"
                                {...register("icon")}
                                type="file"
                            />
                        </div>

                    </div>
                    <hr/>
                    <div className={"row"}>
                        <div className="col-6">
                            <div className="form-check">
                                <UncontrolledCheckboxInput
                                    name="publish"
                                    label={translate("shipping.forms.publish")}
                                    register={register}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-check">
                                <UncontrolledCheckboxInput
                                    name="defaultMethod"
                                    label={translate("shipping.forms.defaultMethod")}
                                    register={register}
                                />
                            </div>
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

export default AddShippingModal;
