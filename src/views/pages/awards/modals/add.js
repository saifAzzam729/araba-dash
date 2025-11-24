import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {AwardsResolver} from "../data";
import UncontrolledTextAreaInput
    from "../../../../@core/components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput
    from "../../../../@core/components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import { useState } from "react";
import { useMutation } from "react-query";
import AwardsService from "../../../../common/services/AwardsService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";


const AddAwardModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {
    let defaultValues = undefined;
    if (item) {
        defaultValues = {
            ...item,
            "translations.en.description": item.description,
        };
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues,
        resolver: AwardsResolver.addResolver,
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => AwardsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {translations, image, publish} = data;
        mutate({translations, image, publish});
    };

    return (
        <CustomModal
            header={"Add Award"}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
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
                    <div className="form-check my-2">
                        <UncontrolledCheckboxInput
                            name="publish"
                            label="Publish to website"
                            register={register}
                        />
                    </div>
                    <hr/>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading} />
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default AddAwardModal;
