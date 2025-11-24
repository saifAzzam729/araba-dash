import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {formatMultiTypeSettingName, MultiTypeSettingsResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import {Col, Row} from "reactstrap";
import MultiTypeSettingsService from "../../../../common/services/MultiTypeSettingsService";
import React, {useState} from "react";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useMutation, useQuery} from "react-query";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ControlledCreatableSelectField from "@components/controlled-inputs/ControlledCreatableSelectField";
import OptionsService from "@src/common/services/OptionsService";
import {Alert} from "@mui/material";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";

const EditWebsiteUiSettingModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    const {translate} = useLocaleContext()
    const [backendErrors, setBackendErrors] = useState({});
    const isDhlFormatLabelSetting = item?.settingKey === "DHL_LABEL_FORMAT"
    const {preferredTableContentLocale} = useSettingsUiContext();

    if (!item) {
        return null;
    }
    const {register,
        handleSubmit,
        formState: {errors},
        control,
        watch,
    } = useForm({
        defaultValues: {
            ...item,
            value: isDhlFormatLabelSetting ? {label: item?.value, value: item?.value} : item.value
        },
        resolver: MultiTypeSettingsResolvers.editResolver,
    });

    const {data} = useQuery(
        ['dhl-format-list'],
        () => OptionsService.getDhlFormatLabelOptions({
            locale: preferredTableContentLocale
        }), {
            enabled: !!isDhlFormatLabelSetting
        }
    )

    const dhlFormatLabelList = data?.data ?? []

    const {mutate, isError, isLoading} = useMutation(
        (data) => MultiTypeSettingsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors || error.response.data.error);
            },
        }
    );


    const prepareData = (data) => {
        const {value} = data;
        if(isDhlFormatLabelSetting){
            mutate({value: value?.value});
        }
        mutate({value})
    };

    const currentSettingName = formatMultiTypeSettingName(item.settingKey);

    const promiseCountriesLocaleOptions = () => new Promise((resolve) => {
        OptionsService.getCountriesLocale({
            locale: preferredTableContentLocale
        }).then((res) => {
            resolve(res.data.map((item) => {
                    return {
                        label: `${item.value} - ${item.label}`,
                        value: item.value
                    }
                })
            )
        })
    });

    return (
        <CustomModal
            translatedHeader={`${translate('common.Edit')} ${translate(`website-ui-settings.${currentSettingName}`)}`}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <form onSubmit={handleSubmit(prepareData)}>
                {typeof backendErrors === 'string' ? (
                    <Alert severity="error">
                        <span>{backendErrors}</span>
                    </Alert>
                ) : (
                    <ErrorAlert isError={isError} errors={backendErrors} />
                )}

                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        {isDhlFormatLabelSetting ?
                            <CustomControlledDropdownField
                                label={translate(`website-ui-settings.${currentSettingName}`)}
                                name={"value"}
                                control={control}
                                options={dhlFormatLabelList}
                                errors={errors}
                            />
                            :
                        <Col xs={12} className="mb-2">
                            <CustomControlledInputField
                                name="value"
                                label={translate(`website-ui-settings.${currentSettingName}`)}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        }
                    </Row>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default EditWebsiteUiSettingModal;
