import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import {ShippingResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useState} from "react";
import {useMutation, useQuery} from "react-query";
import ShippingService from "@src/common/services/ShippingService";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const EditShippingModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }

    const {translate} = useLocaleContext()

    const {register, control, handleSubmit, setValue, formState: {errors},} = useForm({
        defaultValues: {
            ...item,
        },
        resolver: ShippingResolvers.editResolver,
    });

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => ShippingService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
        ['shipping', item.id],
        () => ShippingService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("translations.en.name", data.translations.en.name);
                setValue("translations.ar.name", data.translations.ar.name);
                setValue("translations.en.description", data.translations.en.description);
                setValue("translations.ar.description", data.translations.ar.description);
                setValue("value", data.value);
                setValue("minSubtotalValue", data.minSubtotalValue);
                setValue("defaultMethod", data.defaultMethod);
            }
        }
    )

    const prepareData = (data) => {
        const {translations, icon, publish, value, minSubtotalValue, defaultMethod} = data;
        mutate({id: item.id, translations, icon, publish, value, minSubtotalValue, defaultMethod});
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
                    <div className="row">
                    	<div className="col-6 d-flex flex-column">
                    		<label htmlFor="image" className="form-label">
                                {translate("shipping.common.current-icon")}
                    		</label>
                    		<img src={ParseImageUrl(item.iconFileUrl)} width={"200px"} />
                    	</div>
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


                    <div class="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default EditShippingModal;
