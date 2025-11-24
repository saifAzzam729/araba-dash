import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {ReviewsImagesResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import { useState } from "react";
import { useMutation } from "react-query";
import ReviewsImagesService from "../../../../common/services/ReviewsImagesService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";

const AddReviewImageModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {
    let defaultValues = undefined;
    if (item) {
        defaultValues = {
            ...item,
            "translations.en.comment": item.comment,
        };
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues,
        resolver: ReviewsImagesResolvers.addResolver,
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => ReviewsImagesService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {translations, media, publish, userFullName} = data;
        mutate({userFullName, translations, media, publish});
    };

    return (
        <CustomModal header={"Add Image Story"} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row">
                        <div className="col-12">
                            <UncontrolledTextInput
                                name="userFullName"
                                label="User FullName"
                                register={register}
                                errorMessage={errors && errors.userFullName?.message}
                            />
                        </div>
                    </div>

                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.en.comment"
                                label="Comment English"
                                register={register}
                                errorMessage={errors && errors.comment?.en?.description?.message}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextAreaInput
                                name="translations.ar.comment"
                                label="Comment Arabic"
                                register={register}
                                errorMessage={errors && errors.comment?.ar?.description?.message}
                            />
                        </div>
                    </div>

                    <hr/>
                    <div className="col-auto">
                        <label htmlFor="media" className="form-label">
                            Image
                        </label>
                        <input
                            className="form-control form-control-lg"
                            id="media"
                            {...register("media")}
                            type="file"
                            required
                        />
                    </div>
                    <div className="col-auto">
                        <div className="form-check">
                            <UncontrolledCheckboxInput
                                name="publish"
                                label="Publish to website"
                                register={register}
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

export default AddReviewImageModal;
