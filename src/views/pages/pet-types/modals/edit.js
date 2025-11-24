import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";

import {useState} from "react";
import PetTypesService from "@src/common/services/PetTypesService";
import {PetTypeResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";

const EditPetTypeModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues: {
            ...item,
        },
        resolver: PetTypeResolvers.editResolver
    });

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => PetTypesService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
        ['pet-types', item.id],
        () => PetTypesService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;

                setValue("translations.en.name", data.translations.en.name);
                setValue("translations.ar.name", data.translations.ar.name);
            }
        }
    )
    const onSubmit = (data) => {
        const {translations, image, publish} = data;
        mutate({translations, image, publish});
    };
    return (
        <CustomModal header={"Edit Pet Type"} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
				<ErrorAlert isError={isError} errors={backendErrors} />

				<div className="d-flex flex-column" style={{gap: "1rem"}}>
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

                    <div class="col-auto">
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
                </div>
            </form>
        </CustomModal>
    );
};

export default EditPetTypeModal;
