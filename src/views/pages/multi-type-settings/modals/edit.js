import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {formatMultiTypeSettingName, MultiTypeSettingsResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import {Col, Row} from "reactstrap";
import MultiTypeSettingsService from "../../../../common/services/MultiTypeSettingsService";
import {useState} from "react";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useMutation} from "react-query";
import PreferredHomePageLocalService from "@src/common/services/PreferredHomePageLocalService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

const EditMultiTypeSettingModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    const {setPreferredHomePage} = useSettingsUiContext()
    if (!item) {
        return null;
    }
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            ...item,
        },
        resolver: MultiTypeSettingsResolvers.editResolver,
    });
    
    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => MultiTypeSettingsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {value} = data;
        mutate({value});
    };

    const currentSettingName = formatMultiTypeSettingName(item.settingKey);

    return (
        <CustomModal header={`Edit ${currentSettingName} Value`} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col xs={12} className="mb-2">
                            <UncontrolledTextInput
                                name="value"
                                label={currentSettingName}
                                register={register}
                                errorMessage={errors && errors.value?.message}
                            />
                        </Col>
                    </Row>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default EditMultiTypeSettingModal;
