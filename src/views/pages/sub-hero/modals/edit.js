import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import {SubHeroIconResolvers} from "../data";
import SubHeroService from "@src/common/services/SubHeroService";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import { useMutation, useQuery } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";

const EditSubHeroModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
		defaultValues: {
			...item,
		},
		resolver: SubHeroIconResolvers.editResolver,
	});

	const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => SubHeroService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
		['sub-hero', item.id], 
		() => SubHeroService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
				setValue("translations.en.title", data.translations.en.title);
				setValue("translations.ar.title", data.translations.ar.title);
				setValue("translations.en.description", data.translations.en.description);
				setValue("translations.ar.description", data.translations.ar.description);
            }
        }
	)

	const prepareData = (data) => {
		const { translations, image } = data;
		mutate({ id: item.id, translations, image });
	};
	return (
		<CustomModal header={"Edit Sub Hero Icon"} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />

				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
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

					<hr />
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

					<hr />
					<div className="row">
						<div className="col-6 d-flex flex-column">
							<label htmlFor="image" className="form-label">
								Current Image
							</label>
							<img src={ParseImageUrl(item.imageFileUrl)} width={"200px"} />
						</div>
						<div className="col-6">
							<label htmlFor="image" className="form-label">
								Image
							</label>
							<input
								className="form-control form-control-lg"
								id="image"
								{...register("image")}
								type="file"
							/>
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

export default EditSubHeroModal;
