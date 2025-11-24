import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {addEBayLocationsSchema, locationOptions} from "@src/views/pages/eBay/locations/data";
import EBayLocationService from "@src/common/services/EBayLocationService";
import {useParams} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";

const AddEBayLocationModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {

        let defaultValues = undefined;
        const {translate, makeLocaleUrl, locale} = useLocaleContext()

        const {id: accountId} = useParams()
        defaultValues = {
            country: {label: locationOptions[0].label, value: locationOptions[0].value}
        };


        const {
            register,
            handleSubmit,
            formState: {errors},
            control,
        } = useForm({
            defaultValues,
            resolver: yupResolver(addEBayLocationsSchema(translate)),
        });

        const [backendErrors, setBackendErrors] = useState([]);

        const {mutate, isError, isLoading} = useMutation(
            (data) => EBayLocationService.create(data, accountId),
            {
                onSuccess: onAddSuccessCb,
                onError: (error) => {
                    console.log(error, ' error')
                    setBackendErrors(error.response.data.formErrors);
                },
            }
        );


        const prepareData = (data) => {
            const {name, city, postalCode, country} = data;
            console.log('data: in form', data);
            const dataToSend = {
                name,
                city,
                country: country.value,
                postalCode,

            }

            mutate(dataToSend);

        };


        return (
            <CustomModal translatedHeader={translate("ebay-locations.common.add-location")} isOpen={isOpen}
                         closeModal={closeModal}>
                <form onSubmit={handleSubmit(prepareData)}>
                    <ErrorAlert isError={isError} errors={backendErrors}/>
                    <div className="d-flex flex-column" style={{gap: "1rem"}}>

                        <div className="row justify-content-center align-items-center">
                            <div className="col-6 ">
                                <UncontrolledTextInput
                                    name="name"
                                    label={translate("ebay-locations.forms.name")}
                                    register={register}
                                    errorMessage={errors && errors.name?.message}
                                    control={control}
                                />
                            </div>


                            <div className="col-6 ">
                                <UncontrolledTextInput
                                    name="city"
                                    label={translate("ebay-locations.forms.city")}
                                    register={register}
                                    errorMessage={errors && errors.city?.message}
                                    control={control}
                                />
                            </div>
                            <div className="col-6 ">
                                <CustomControlledDropdownField
                                    label={translate('ebay-locations.forms.country')}
                                    name={"country"}
                                    control={control}
                                    options={locationOptions}
                                    errors={errors}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-6 mt-2">
                                <UncontrolledTextInput
                                    name="postalCode"
                                    label={translate("ebay-locations.forms.postalCode")}
                                    register={register}
                                    errorMessage={errors && errors.postalCode?.message}
                                    control={control}


                                />
                            </div>

                        </div>

                        <hr/>
                        <div className="col-auto">
                            <SubmitLoadingBtn isLoading={isLoading}/>
                        </div>
                    </div>
                </form>
            </CustomModal>
        );
    }
;

export default AddEBayLocationModal;
