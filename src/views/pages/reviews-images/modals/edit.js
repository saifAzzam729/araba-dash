import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import {ReviewsImagesResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import ReviewsImagesService from "../../../../common/services/ReviewsImagesService";
import { useMutation, useQuery } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";

const EditReviewImageModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
		defaultValues: {
			...item,
		},
		resolver: ReviewsImagesResolvers.editResolver,
	});

	const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => ReviewsImagesService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
		['review-image', item.id], 
		() => ReviewsImagesService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("translations.en.comment", data.translations.en.comment);
				setValue("translations.ar.comment", data.translations.ar.comment);
            }
        }
	)

	const prepareData = (data) => {
		const { translations, media, publish, userFullName } = data;
		mutate({ id: item.id, userFullName, translations, media, publish });
	};
	
	return (
		<CustomModal header={"Edit Image Story"} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
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
								errorMessage={errors && errors.translations?.en?.comment?.message}
							/>
						</div>
						<div className="col-6">
							<UncontrolledTextAreaInput
								name="translations.ar.comment"
								label="Comment Arabic"
								register={register}
								errorMessage={errors && errors.translations?.ar?.comment?.message}
							/>
						</div>
					</div>

					<hr />
					<div className="row">
						<div className="col-6 d-flex flex-column">
							<label htmlFor="image" className="form-label">
								Current Image
							</label>
							<img src={ParseImageUrl(item.mediaFileUrl)} width={"200px"} />
						</div>
						<div className="col-6">
							<label htmlFor="media" className="form-label">
								Image
							</label>
							<input
								className="form-control form-control-lg"
								id="media"
								{...register("media")}
								type="file"
							/>
						</div>
					</div>

					<hr/>
					<div className="row">
						<div className="col-6">
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

export default EditReviewImageModal;
