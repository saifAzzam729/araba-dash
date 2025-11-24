import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import PaymentMethodsService from "@src/common/services/PaymentMethodsService";
import { PaymentMethodResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import { useMutation, useQuery } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import { useState } from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";


const EditPaymentMethodModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()

	const defaultValues = {...item};
	delete defaultValues['translations'];

	const { register, handleSubmit, setValue, formState:{errors} } = useForm({
		defaultValues,
		resolver: PaymentMethodResolvers.editResolver
	});

	const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => PaymentMethodsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
		['payment-method', item.id],
		() => PaymentMethodsService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
				setValue("translations.en.name", data.translations.en.name);
				setValue("translations.ar.name", data.translations.ar.name);
				setValue("translations.en.description", data.translations.en.description);
				setValue("translations.ar.description", data.translations.ar.description);
            }
        }
	)

	const prepareData = (data) => {
		const { translations, image, publish } = data;
		mutate({ translations, image, publish });
	};

	return (
		<CustomModal translatedHeader={translate('payment-method.common.edit-payment')} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<div className="row">
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.en.name"
								label={translate('payment-method.forms.nameEn')}
								register={register}
								errorMessage={errors && errors.translations?.en?.name?.message}
                            />
						</div>
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.ar.name"
								label={translate('payment-method.forms.nameAr')}
								register={register}
								errorMessage={errors && errors.translations?.ar?.name?.message}
                            />
						</div>
					</div>


					<hr />

					<div className="row">
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.en.description"
								label="Description En"
								register={register}
								errorMessage={errors && errors.translations?.en?.description?.message}
							/>
						</div>
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.ar.description"
								label="Description Ar"
								register={register}
								errorMessage={errors && errors.translations?.ar?.description?.message}
							/>
						</div>
					</div>
					<hr/>
					<div className="row">

						<div className="col-12 col-sm-6 col-md-6 col-lg-6">
							<label htmlFor="image" className="form-label">
								{translate('payment-method.forms.image')}
							</label>
							<input
								className="form-control form-control-lg"
								id="image"
								{...register("image")}
								type="file"
							/>
						</div>

						<div className="col-12 col-sm-6 col-md-6 col-lg-6 d-flex flex-column">
							<label htmlFor="image" className="form-label">
								{translate('payment-method.common.current-image')}
							</label>
							<img src={ParseImageUrl(item.imageFileUrl)} width={"200px"}/>
						</div>
					</div>

					<hr/>
					<div className="row">
						<div className="col-6">
							<UncontrolledCheckboxInput
								name="publish"
								label={translate('payment-method.forms.publish')}
								register={register}
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
};

export default EditPaymentMethodModal;
