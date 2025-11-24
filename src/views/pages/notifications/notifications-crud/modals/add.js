import CustomModal from "@components/modal";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledRichTextField from "@components/controlled-inputs/CustomControlledRichTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useMutation} from "react-query";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import NotificationsCrudService from "@src/common/services/NotificationsCrudService";

export default function AddNotification({ isOpen, closeModal, item, onAddSuccessCb }) {
    const [backendErrors, setBackendErrors] = useState({});
    const {translate, isRtl} = useLocaleContext()

    const TOPICS_OPTIONS = [
        {label: 'USERS', value: 'USERS'},
        {label: 'ADMINS', value: 'ADMINS'},
    ]

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...item,
        },
    });

    const {mutate, isLoading, isError} = useMutation(
        (data) => NotificationsCrudService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        })

    const prepareData = (data) => {
        const { translations, topic, metaData } = data;
        const dataToSend = {
            translations,
            topic: topic.value,
            metaData: {"link" : metaData}
        }

        mutate(dataToSend);
    };

    return (
        <CustomModal
            translatedHeader={translate("notifications.common.add-notification")}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column">
                    <Row>
                        <Col xs={12} md={6} className="mb-1">
                            <CustomControlledInputField
                                name="translations.en.title"
                                label={translate('notifications.forms.titleEn')}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-1">
                            <CustomControlledInputField
                                name="translations.ar.title"
                                label={translate('notifications.forms.titleAr')}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6} className="mb-1">
                            <CustomControlledRichTextField
                                name="translations.en.body"
                                label={translate('notifications.forms.bodyEn')}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-1">
                            <CustomControlledRichTextField
                                name="translations.ar.body"
                                label={translate('notifications.forms.bodyAr')}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6} className="mb-1">
                            <CustomControlledDropdownField
                                label={translate('notifications.forms.topic')}
                                name={"topic"}
                                control={control}
                                options={TOPICS_OPTIONS}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-1">
                            <CustomControlledInputField
                                name="metaData"
                                label={translate('notifications.forms.link')}
                                control={control}
                                errors={errors}

                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6} className="d-flex align-items-center">
                            <LoadingButton
                                size="medium"
                                type="submit"
                                className={`text-success border-success rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                startIcon={<Edit size={14}/>}
                                loadingPosition="start"
                                loading={isLoading}
                                variant="outlined"
                            >
                                {translate('forms.save')}
                            </LoadingButton>
                        </Col>
                    </Row>

                </div>
            </form>
        </CustomModal>
    )
}