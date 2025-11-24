import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import {Row, Col} from "reactstrap";
import {useState} from "react";
import CountriesService from "../../../../../../common/services/CountriesService";
import {CountriesResolvers} from "../../../countries/data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import UncontrolledPhoneNumberInput from "@components/form-ui/uncontrolled-inputs/UncontrolledPhoneNumberInput";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";


const EditCountryModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }
    const {translate} = useLocaleContext()

    const {preferredTableContentLocale} = useSettingsUiContext();

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues: {
            ...item,
        },
        resolver: CountriesResolvers.editResolver
    });

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => CountriesService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
		['country', item.id], 
		() => CountriesService.getById(item.id, {locale: preferredTableContentLocale}),
        {
            onSuccess: (res) => {
                const {data} = res;
                
                setValue("translations.en.name", data.translations.en.name);
                setValue("translations.ar.name", data.translations.ar.name);
            }
        }
	)


    const prepareData = (data) => {
        const {translations, iso2, phoneNumberCode, active, localeCode, iso3} = data;
        mutate({translations, iso2, phoneNumberCode, active, localeCode, iso3});
    };
    return (
        <CustomModal
            header={"Edit Country"}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />

                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col xs={6}>
                            <UncontrolledTextInput
                                name="translations.en.name"
                                label={translate("countries.forms.nameEn")}
                                register={register}
                                errorMessage={errors && errors.translations?.en?.name?.message}
                            />
                        </Col>
                        <Col xs={6}>
                            <UncontrolledTextInput
                                name="translations.ar.name"
                                label={translate("countries.forms.nameAr")}
                                register={register}
                                errorMessage={errors && errors.translations?.ar?.name?.message}
                            />
                        </Col>
                        <Col xs={6}>
                            <UncontrolledTextInput
                                name="iso2"
                                label={translate("countries.forms.iso2")}
                                register={register}
                                errorMessage={errors && errors.iso2?.message}
                            />
                        </Col>
                        <Col xs={6}>
                            <UncontrolledTextInput
                                name="iso3"
                                label="Iso3"
                                register={register}
                                errorMessage={errors && errors.iso3?.message}
                            />
                        </Col>
                        <Col xs={6}>
                            <UncontrolledPhoneNumberInput
                                name="phoneNumberCode"
                                label={translate("countries.forms.phoneNumberCode")}
                                register={register}
                                errorMessage={errors && errors.phoneNumberCode?.message}
                            />
                        </Col>
                        <Col xs={6}>
                            <UncontrolledPhoneNumberInput
                                name="localeCode"
                                label={translate("countries.forms.localeCode")}
                                register={register}
                                errorMessage={errors && errors.localeCode?.message}
                            />
                        </Col>
                        <Col xs={6} className={"mt-3"}>
                            <UncontrolledCheckboxInput
                                name="active"
                                label={translate("countries.forms.active")}
                                register={register}
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

export default EditCountryModal;
