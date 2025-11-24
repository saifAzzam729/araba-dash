import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {SubHeroIconResolvers} from "../data";
import SubHeroService from "@src/common/services/SubHeroService";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import { useState } from "react";
import { useMutation } from "react-query";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";

const AddSubHeroModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {
    let defaultValues = undefined;
    if (item) {
        defaultValues = {
            ...item,
            "translations.en.title": item.title,
            "translations.en.description": item.description,
        };
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues,
        resolver: SubHeroIconResolvers.addResolver,
    });
    
    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => SubHeroService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );
    
    const prepareData = (data) => {
        const {translations, image} = data;
        mutate({translations, image});
    };

    return (
        <CustomModal header={"Add Sub Hero Icon"} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row">
                        <div className="col-6">
                            <UncontrolledTextInput
                                name="translations.en.title"
                                label="Title English"
                                register={register}
                                errorMessage={errors && errors.translations?.en?.title?.message}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextInput
                                name="translations.ar.title"
                                label="Title Arabic"
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.title?.message}
                            />
                        </div>
                    </div>

                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.en.description"
                                label="Description English"
                                register={register}
                                errorMessage={errors && errors.translations?.en?.description?.message}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.ar.description"
                                label="Description Arabic"
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.description?.message}
                            />
                        </div>
                    </div>

                    <hr/>
                    <div className="col-auto">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            className="form-control form-control-lg"
                            id="image"
                            {...register("image")}
                            type="file"
                            required
                        />
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

export default AddSubHeroModal;
