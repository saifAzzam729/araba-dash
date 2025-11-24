import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";

import {useState} from "react";
import PetTypesService from "@src/common/services/PetTypesService";
import PetBreedsService from "@src/common/services/PetBreedsService";
import { PetBreedResolvers } from "../data";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";

const EditPetBreedModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const { register, handleSubmit, setValue, control, formState:{errors} } = useForm({
		defaultValues: {
			...item,
		},
		resolver: PetBreedResolvers.editResolver
	});

	const [backendErrors, setBackendErrors] = useState({});

	useQuery(
		['pet-breeds', item.id],
		() => PetBreedsService.getById(item.id),
		{
			onSuccess: (res) => {
				const {data} = res;

				setValue("translations.en.name", data.translations.en.name);
				setValue("translations.ar.name", data.translations.ar.name);
				setValue('pet', {label: data.pet.name, value: data.pet.id})
			}
		}
	)

	const {mutate, isError, isLoading} = useMutation(
		(data) => PetBreedsService.update(item.id, data),
		{
			onSuccess: onEditSuccessCb,
			onError: (error) => {
				setBackendErrors(error.response.data.formErrors);
			},
		}
	);

	const onSubmit = (data) => {
		const { translations, publish, pet } = data;
		mutate({ translations, publish, pet: pet.value });
	};

	const promisePetTypesOptions = (searchValue) => new Promise((resolve) => {
		PetTypesService.getPagination({search:searchValue}).then((res) => {
			console.log(res)
			resolve(res.pagination.items.map((item) => {
					return {
						label:item.name,
						value:item.id
					}
				})
			)
		})
	});

	return (
		<CustomModal header={"Edit Pet Breed"} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<div className="row">
						<div className="col-6">
							<label htmlFor="exampleFormControlInput1" className="form-label">
								Name En
							</label>
							<input
								className="form-control"
								id="translations.en.name"
								{...register("translations.en.name")}
							/>
							{errors.translations?.en?.name && (
								<p className="text-danger">
								{errors && errors.translations?.en?.name?.message}
								</p>
							)}
						</div>
						<div className="col-6">
							<label htmlFor="exampleFormControlInput1" className="form-label">
								Name Ar
							</label>
							<input
								className="form-control"
								id="translations.ar.name"
								{...register("translations.ar.name")}
							/>
							{errors.translations?.ar?.name && (
								<p className="text-danger">
								{errors && errors.translations?.ar?.name?.message}
								</p>
							)}
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<CustomControlledAsyncSelectField
								label={"Pet Type"}
								name={"pet"}
								control={control}
								getOptionsPromise={promisePetTypesOptions}
								errors={errors}
							/>
						</div>

					</div>

					<hr/>
					<div className="row">
						<div className="col-6">
							<div className="form-check">

								<input className="form-check-input" type="checkbox" value="" id="publish-to-website" {...register('publish')}/>
								<label className="form-check-label" htmlFor="publish-to-website">
									Publish to website
								</label>
							</div>
						</div>
					</div>
					<hr/>

					<div class="col-auto">
						<button type="submit" className="btn btn-primary mb-3">
							submit
						</button>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default EditPetBreedModal;
