import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import { PetTypeResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import {useState} from "react";
import {useMutation} from "react-query";
import PetTypesService from "@src/common/services/PetTypesService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";


const AddPetTypeModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	if (item) {
		defaultValues = {
			// ...item,
			"translations.en.name": item.name,
			"translations.en.description": item.description,
		};
	}

	const { register, handleSubmit, formState:{errors} } = useForm({ defaultValues, resolver:PetTypeResolvers.addResolver });
	const [backendErrors, setBackendErrors] = useState([]);

	const {mutate, isError, isLoading} = useMutation(
		(data) => PetTypesService.create(data),
		{
			onSuccess: onAddSuccessCb,
			onError: (error) => {
				setBackendErrors(error.response.data.formErrors);
			},
		}
	);

	const onSubmit = (data) => {
		const { translations, publish } = data;
		mutate({ translations, publish })
	};


	return (
		<CustomModal header={"Add Pet Type"} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					{/* <WizardHorizontal /> */}

					<div className="row">
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.en.name"
								label="Name En"
								register={register}
								errorMessage={errors && errors.translations?.en?.name?.message}
                            />
						</div>
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.ar.name"
								label="Name Ar"
								register={register}
								errorMessage={errors && errors.translations?.ar?.name?.message}
                            />
						</div>
					</div>
					<div className="col-auto">
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
	);
};

export default AddPetTypeModal;
