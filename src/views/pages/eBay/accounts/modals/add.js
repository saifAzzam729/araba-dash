import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import { useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EBayService from "@src/common/services/EBayService";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";

const AddEBayAccountModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {

    let defaultValues = undefined;
    const {translate, makeLocaleUrl, locale} = useLocaleContext()


    if (item) {
        defaultValues = {
            ...item,
            "translations.en.name": item.name,
            "translations.en.description": item.description,
        };
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues,
        // TODO:: REPLACE THE VALIDATION RESOLVER
        // resolver: BrandResolvers.addResolver,
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => EBayService.create(data, locale),
        {
            onSuccess: (data) => {
               const authUrl = data.data?.authUrl
                console.log(data,'Redirect data')
                window.open(authUrl, '_blank');

            },
            onError: (error) => {
                console.log(error, 'redirect error')

                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {title} = data;
        console.log('data: in form', data);
        mutate({title});

    };


    return (
        <CustomModal translatedHeader={translate("ebay.common.add-account")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 ">
                            <UncontrolledTextInput
                                name="title"
                                label={translate("ebay.forms.title")}
                                register={register}
                                errorMessage={errors && errors.title?.message}
                                control={control}
                            />
                        </div>

                    </div>

                    <hr/>
                    <div className="col-auto">
                        <SubmitLoadingBtn text={'get-token'} isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default AddEBayAccountModal;
