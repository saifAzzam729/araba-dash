import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import PetBreedsService from "@src/common/services/PetBreedsService";
import CustomControlledDatePickerField from "@components/controlled-inputs/CustomControlledDatePickerField";
import UsersService from "@src/common/services/UsersService";
import formatDateForSend from "@src/utility/helpers/formatDateForSend";
import { UserPetResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UserPetsService from "@src/common/services/UserPetsService";
import { useMutation } from "react-query";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";


const AddUserPetModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	if (item) {
		defaultValues = {
			...item,
		};
	}

	const GENDERS_OPTIONS = [
		{ label: "Male", value: "MALE" },
		{ label: "Female", value: "FEMALE" },
	];

	const [petBreedsOptions, setPetBreedsOptions] = useState([]);
	const [usersOptions, setUsersOptions] = useState([]);

	const { register, handleSubmit, control, formState:{errors} } = useForm({ defaultValues, resolver: UserPetResolvers.addResolver });

	const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => UserPetsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	const prepareData = (data) => {
		const { name, weight, petBreed, birthdate, gender, user } = data;
		mutate({
			name,
			weight,
			petBreed: petBreed.value,
			birthdate:formatDateForSend(birthdate),
			gender: gender.value,
			user: user.value,
		});
	};

	useEffect(() => {
		PetBreedsService.getAll()
			.then((res) => {
				setPetBreedsOptions(res)
			});
		UsersService.getPagination({limit: 100})
			.then((res) => {
				setUsersOptions(res.pagination.items);
			})
	}, []);

	return (
		<CustomModal header={"Add User Pet"} isOpen={isOpen} closeModal={closeModal}>
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

							<CustomControlledDropdownField
								label={"Pet Breed"}
								name={"petBreed"}
								control={control}
								options={petBreedsOptions.map((breed) => {
									return { label: breed.name, value: breed.id };
								})}
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
							<CustomControlledDropdownField
								label={"User"}
								name={"user"}
								control={control}
								options={usersOptions.map(user => {
									return {label: user.fullName, value: user.id}
								})}
								errors={errors}
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

export default AddUserPetModal;
