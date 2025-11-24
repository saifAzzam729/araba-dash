import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaqResolvers } from "../data";
import { useMutation } from "react-query";
import CustomModal from "../../../../@core/components/modal";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import FaqsService from "../../../../common/services/FaqsService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const AddFaqModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	const {translate} = useLocaleContext()

	if (item) {
		defaultValues = {
			...item,
			"translations.en.question": item.question,
			"translations.en.answer": item.answer,
		};
	}

	const { register, handleSubmit, formState:{errors} } = useForm({
		defaultValues, resolver:FaqResolvers.addResolver
	});

	const [backendErrors, setBackendErrors] = useState([]);

	const {mutate, isError, isLoading} = useMutation(
        (data) => FaqsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	const prepareData = (data) => {
		const { translations } = data;
		mutate({ translations });
	};

	return (
		<CustomModal translatedHeader={translate('faq.common.add-faq')} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					{/* <WizardHorizontal /> */}
					<div className="row">
						<div className="col-12 col-sm-12 col-md-6 col-lg-6">
							<UncontrolledTextInput
								name="translations.en.question"
								label={translate('faq.forms.questionEn')}
								register={register}
								errorMessage={errors && errors.translations?.en?.question?.message}
                            />
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-6">
							<UncontrolledTextInput
								name="translations.ar.question"
								label={translate('faq.forms.questionAr')}
								register={register}
								errorMessage={errors && errors.translations?.ar?.question?.message}
                            />
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12 col-sm-12 col-md-6 col-lg-6">
							<UncontrolledTextAreaInput
								name="translations.en.answer"
								label={translate('faq.forms.answerEn')}
								register={register}
								errorMessage={errors && errors.translations?.en?.answer?.message}
							/>
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-6">
							<UncontrolledTextAreaInput
								name="translations.ar.answer"
								label={translate('faq.forms.answerAr')}
								register={register}
								errorMessage={errors && errors.translations?.ar?.answer?.message}
							/>
						</div>
					</div>
					<div className="col-auto">
						<SubmitLoadingBtn isLoading={isLoading} />
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default AddFaqModal;
