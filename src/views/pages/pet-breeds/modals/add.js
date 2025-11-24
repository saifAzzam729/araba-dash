import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import PetTypesService from "@src/common/services/PetTypesService";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import { PetBreedResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import {useMutation} from "react-query";
import PetBreedsService from "@src/common/services/PetBreedsService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";


const AddPetBreedModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	if (item) {
		defaultValues = {
			// ...item,
			"translations.en.name": item.name,
			"translations.en.description": item.description,
		};
	}

	const [petTypesOptions, setPetTypesOptions] = useState([]);

	const { register, handleSubmit, control, formState:{errors} } = useForm({ defaultValues, resolver: PetBreedResolvers.addResolver });

	const [backendErrors, setBackendErrors] = useState([]);

	const {mutate, isError, isLoading} = useMutation(
		(data) => PetBreedsService.create(data),
		{
			onSuccess: onAddSuccessCb,
			onError: (error) => {
				setBackendErrors(error.response.data.formErrors);
			},
		}
	);

	const onSubmit = (data) => {
		const { translations, publish, pet } = data;
		mutate({ translations, publish, pet: pet.value })
	};

	useEffect(() => {
		PetTypesService.getAll()
			.then((res) => {
				setPetTypesOptions(res)
			})
	}, []);

	return (
		<CustomModal header={"Add Pet Breed"} isOpen={isOpen} closeModal={closeModal}>
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
					<div className="row">
						<div className="col-6">

							<CustomControlledDropdownField
								label={"Pet Type"}
								name={"pet"}
								control={control}
								options={petTypesOptions.map((petType) => {
									return { label: petType.name, value: petType.id };
								})}
								errors={errors}
							/>
						</div>

					</div>
					<hr/>

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

export default AddPetBreedModal;
