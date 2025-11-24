import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import {useState} from "react";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import PetBreedsService from "@src/common/services/PetBreedsService";
import UsersService from "@src/common/services/UsersService";
import CustomControlledDatePickerField from "@components/controlled-inputs/CustomControlledDatePickerField";
import formatDateForSend from "@src/utility/helpers/formatDateForSend";
import { UserPetResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UserPetsService from "@src/common/services/UserPetsService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import { useMutation, useQuery } from "react-query";
import CustomControlledAsyncSelectField from "../../../../@core/components/controlled-inputs/CustomControlledAsyncSelectField";

const EditUserPetModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}

	const GENDERS_OPTIONS = [
		{ label: "Male", value: "MALE" },
		{ label: "Female", value: "FEMALE" },
	];

	const { register, handleSubmit, setValue, control, formState:{errors} } = useForm({
		defaultValues: {
			...item,
			gender: GENDERS_OPTIONS.find((opt) => opt.value === item.gender.value)
		},
		resolver: UserPetResolvers.editResolver
	});

	const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => UserPetsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
		['user-pet', item.id], 
		() => UserPetsService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("name", data.name);
                setValue("weight", data.weight);				
				setValue("petBreed", {
					value: data.petBreed.id,
					label: data.petBreed.name,
				});
				setValue("user", {
					value: data.user.id,
					label: data.user.name,
				});
            }
        }
	)

	const promisePetBreedOptions = (searchValue) => new Promise((resolve) => {
		PetBreedsService.getPagination({search:searchValue}).then((res) => {
			resolve(res.pagination.items.map((item) => {
					return {
						label:item.name,
						value:item.id
					}
				})
			)
		})
	});

	const promiseUsersOptions = (searchValue) => new Promise((resolve) => {
		UsersService.getPagination({search:searchValue}).then((res) => {
			resolve(res.pagination.items.map((item) => {
					return {
						label:item.fullName,
						value:item.id
					}
				})
			)
		})
	});

	const prepareData = (data) => {
		const { name, weight, petBreed, birthdate, gender, user } = data;
		mutate({
			id: item.id,
			name,
			weight,
			petBreed: petBreed.value,
			birthdate:formatDateForSend(birthdate),
			gender: gender.value,
			user: user.value,
		});
	};

	return (
		<CustomModal header={"Edit User Pet"} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<div className="row">
						<div className="col-6">
							<UncontrolledTextInput
								name="name"
								label="Name"
								register={register}
								errorMessage={errors && errors.name?.message}
							/>
						</div>
						<div className="col-6">
							<UncontrolledTextInput
								name="weight"
								label="Weight"
								register={register}
								errorMessage={errors && errors.weight?.message}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<CustomControlledAsyncSelectField
								label={"Pet Breed"}
								name={"petBreed"}
								control={control}
								getOptionsPromise={promisePetBreedOptions}
								errors={errors}
							/>
						</div>
						<div className="col-6">

							<CustomControlledDatePickerField
								label="Date Of Birth"
								name="birthdate"
								control={control}
								errors={errors}
							/>
						</div>

					</div>
					<div className="row">
						<div className="col-6">
							<CustomControlledDropdownField
								label={"Gender"}
								name={"gender"}
								control={control}
								options={GENDERS_OPTIONS}
								errors={errors}
							/>
						</div>
						<div className="col-6">
							<CustomControlledAsyncSelectField
								label={"User"}
								name={"user"}
								control={control}
								getOptionsPromise={promiseUsersOptions}
								errors={errors}
							/>
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

export default EditUserPetModal;
