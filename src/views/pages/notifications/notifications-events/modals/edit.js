import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomModal from "@components/modal";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useForm} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import NotificationsEventsService from "@src/common/services/NotificationsEventsService";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import {Col, Row} from "reactstrap";
import {Edit} from "react-feather";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomControlledRichTextField from "@components/controlled-inputs/CustomControlledRichTextField";

export default function EditNotificationEvent({ isOpen, closeModal, item, onEditSuccessCb }) {
    if (!item) {
        return null;
    }

    const {translate, isRtl} = useLocaleContext()
    const [backendErrors, setBackendErrors] = useState({});

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...item,
        },
    });

    useQuery(
        ['notification-event', item.id],
        () => NotificationsEventsService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("translations.en.title", data.translations.en.title);
                setValue("translations.ar.title", data.translations.ar.title);
                setValue("translations.en.body", data.translations.en.body);
                setValue("translations.ar.body", data.translations.ar.body);
            }
        }
    )

    const {mutate, isError, isLoading} = useMutation(
        (data) => NotificationsEventsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const { active, translations} = data;
        mutate({ id: item.id, translations , active});
    };

    return (
        <CustomModal
            translatedHeader={translate("notifications.common.edit-notification-event")}
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
                            <CustomControlledCheckboxInput
                                name="active"
                                label={translate('notifications.forms.active')}
                                control={control}
                            />
                        </Col>

                        <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end align-items-center">
                            <LoadingButton
                                size="medium"
                                type="submit"
                                className={`text-success border-success rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                startIcon={<Edit size={14}/>}
                                loadingPosition="start"
                                loading={isLoading}
                                variant="outlined"
                            >
                                {translate('forms.update')}
                            </LoadingButton>
                        </Col>
                    </Row>

                </div>
            </form>
        </CustomModal>
    )
}