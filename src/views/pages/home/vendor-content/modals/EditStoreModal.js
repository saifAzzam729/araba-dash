import CustomModal from "@src/@core/components/modal";
import {useForm} from "react-hook-form";
import {Button, Col, Label, Row} from "reactstrap";
import CustomControlledInputField from "@src/@core/components/controlled-inputs/CustomControlledInputField";
import {useState} from "react";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import VendorsService from "@src/common/services/VendorsService";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@src/@core/components/form-ui/SubmitLoadingBtn";
import {useAuth} from "@src/utility/context/AuthProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const editStoreSchema = (translate) => {
    return yup.object().shape({
        storeName: yup.string().required(translate('forms.field-required')),
        storeDescription: yup.string().nullable(),
    });
};

const EditStoreModal = ({isOpen, closeModal, vendor, onEditSuccessCb}) => {
    const {refetchUser} = useAuth();
    const {translate} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

    if (!vendor || !vendor.vendor) {
        return null;
    }

    const defaultValues = {
        storeName: vendor.vendor.storeName || '',
        storeDescription: vendor.vendor.storeDescription || '',
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        register
    } = useForm({
        defaultValues,
        resolver: yupResolver(editStoreSchema(translate)),
    });

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        ({data, locale}) => VendorsService.updateProfile(data, {locale}),
        {
            onSuccess: () => {
                refetchUser();
                onEditSuccessCb();
                showSuccessAlert({description: translate('common.success-update') || 'Updated successfully'});
            },
            onError: (error) => {
                if (error.response?.data?.formErrors) {
                    setBackendErrors(error.response.data.formErrors);
                } else {
                    setBackendErrors({general: error.response?.data?.message || 'An error occurred'});
                }
            },
        }
    );

    const prepareDataAndSubmit = (data) => {
        const {
            storeLogo,
            registrationDocument,
            storeName,
            storeDescription
        } = data;
        
        mutate({
            data: {
                storeName,
                storeDescription: storeDescription || null,
                storeLogo,
                registrationDocument,
            },
            locale: preferredTableContentLocale || 'en'
        });
    };

    return (
        <CustomModal
            translatedHeader={translate('common.edit-store') || 'Edit Store Details'}
            isOpen={isOpen}
            closeModal={closeModal}
            size="lg"
        >
            <form onSubmit={handleSubmit(prepareDataAndSubmit)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <Row>
                    <Col xs={12} className="mb-2">
                        <CustomControlledInputField
                            label="Store Name"
                            name="storeName"
                            control={control}
                            placeholder="My Awesome Store"
                            errors={errors}
                        />
                    </Col>
                    <Col xs={12} className="mb-2">
                        <Label className="form-label" for="storeDescription">
                            Store Description
                        </Label>
                        <textarea
                            className="form-control"
                            id="storeDescription"
                            {...register("storeDescription")}
                            rows="4"
                            placeholder="Enter store description"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Label className="form-label" for="storeLogo">
                            Store Logo
                        </Label>
                        <input
                            className="form-control form-control-lg"
                            id="storeLogo"
                            {...register("storeLogo")}
                            type="file"
                            accept="image/*"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <label htmlFor="storeLogo" className="form-label">
                            Current Store Logo
                        </label>
                        <div>
                            {vendor.vendor.storeLogoUrl ? (
                                <img 
                                    src={ParseImageUrl(vendor.vendor.storeLogoUrl)} 
                                    width="200px" 
                                    alt="Store Logo"
                                    className="img-fluid rounded"
                                />
                            ) : (
                                <p className="text-muted">No logo uploaded</p>
                            )}
                        </div>
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Label className="form-label" for="registrationDocument">
                            Registration Document
                        </Label>
                        <input
                            className="form-control form-control-lg"
                            id="registrationDocument"
                            {...register("registrationDocument")}
                            type="file"
                            accept="image/*,.pdf"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <label htmlFor="registrationDocument" className="form-label">
                            Current Registration Document
                        </label>
                        <div>
                            {vendor.vendor.registrationDocumentUrl ? (
                                <img 
                                    src={ParseImageUrl(vendor.vendor.registrationDocumentUrl)} 
                                    width="200px" 
                                    alt="Registration Document"
                                    className="img-fluid rounded"
                                />
                            ) : (
                                <p className="text-muted">No document uploaded</p>
                            )}
                        </div>
                    </Col>
                </Row>
                <div className="d-flex align-items-center justify-content-start gap-1">
                    <SubmitLoadingBtn isLoading={isLoading} />

                    <Button
                        type="button"
                        color="secondary"
                        outline
                        onClick={closeModal}
                        className="mb-3"
                    >
                        {translate('users.forms.cancel-button') || 'Cancel'}
                    </Button>
                </div>
            </form>
        </CustomModal>
    );
};

export default EditStoreModal;

