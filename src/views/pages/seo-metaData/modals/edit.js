import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import {Col, Row} from "reactstrap";
import MultiTypeSettingsService from "../../../../common/services/MultiTypeSettingsService";
import {useState} from "react";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useMutation} from "react-query";
import * as yup from "yup";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {yupResolver} from "@hookform/resolvers/yup";
import {formatMultiTypeSettingName} from "@src/views/pages/seo-metaData/data";


const EditSeoModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    const {translate} = useLocaleContext();
    if (!item) {
        return null;
    }

    const schema = yup.object().shape({
        value: yup.string().required(translate('forms.field-required')),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            ...item,
        },
        resolver: yupResolver(schema),
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

export default EditSeoModal;
