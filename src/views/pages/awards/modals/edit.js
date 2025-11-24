import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {useState} from "react";
import UncontrolledTextAreaInput
    from "../../../../@core/components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput
    from "../../../../@core/components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import AwardsService from "../../../../common/services/AwardsService";
import {AwardsResolver} from "../data";
import { useMutation, useQuery } from "react-query";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";

const EditAwardModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
    if (!item) {
        return null;
    }
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        defaultValues: {
            ...item,
        },
        resolver: AwardsResolver.editResolver,
    });

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => AwardsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
		['award', item.id], 
		() => AwardsService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("translations.en.description", data.translations.en.description);
                setValue("translations.ar.description", data.translations.ar.description);
            }
        }
	)

    const prepareData = (data) => {
        const { translations, image, publish } = data;
        mutate({ id: item.id, translations, image, publish });
    };

    return (
        <CustomModal
            header={"Edit Award"}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: '1rem'}}>
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
						<SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default EditAwardModal;
