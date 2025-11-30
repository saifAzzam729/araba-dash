import CustomModal from "@components/modal";
import { useForm } from "react-hook-form";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import { useState } from "react";
import {useMutation, useQueryClient} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const EditmonthGoalModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
    const {translate} = useLocaleContext();
    const queryClient = useQueryClient()
    const schema = yup
        .object({
            value: yup.number().typeError(translate('forms.number-field-typeError')).required(translate('forms.field-required'))
        })
        .required()

    if (!item) {
        return null;
    }
    const { register, handleSubmit, setValue, control, formState: { errors }, } = useForm({
        defaultValues: {
            ...item,
        },
        resolver: yupResolver(schema),
    });

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => MultiTypeSettingsService.update(item.id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['monthly-orders-goal'] })
                queryClient.invalidateQueries({ queryKey: ['website-overview'] })
                onEditSuccessCb()
            } ,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {
            value,
        } = data;
        mutate({
            id: item.id,
            value
        });
    };

    return (
        <CustomModal header={"edit-month-goal"} isOpen={isOpen} closeModal={closeModal} size={'md'}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column align-items-center" style={{ gap: "1rem" }}>
                    <div className="row width-70-per">
                        <div className="col">
                            <UncontrolledTextInput
                                name="value"
                                label={translate('common.value')}
                                register={register}
                                errorMessage={errors && errors.value?.message}
                            />
                        </div>

                    </div>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default EditmonthGoalModal;
