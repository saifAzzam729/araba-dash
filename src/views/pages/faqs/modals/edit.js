import CustomModal from "../../../../@core/components/modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import FaqsService from "../../../../common/services/FaqsService";
import { FaqResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const EditFaqModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()

	const { register, handleSubmit, setValue, formState:{errors} } = useForm({
		defaultValues: {
			...item,
		},
		resolver: FaqResolvers.editResolver
	});

	const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => FaqsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
	['faq', item.id],
	() => FaqsService.getById(item.id),
	{
		onSuccess: (res) => {
			const {data} = res;
			setValue("translations.en.question", data.translations.en.question);
			setValue("translations.ar.question", data.translations.ar.question);
			setValue("translations.en.answer", data.translations.en.answer);
			setValue("translations.ar.answer", data.translations.ar.answer);
		}
	}
	)

	const prepareData = (data) => {
		const { translations, image } = data;
		mutate({ id: item.id, translations, image });
	};
	return (
		<CustomModal translatedHeader={translate('faq.common.add-faq')} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
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
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default EditFaqModal;
