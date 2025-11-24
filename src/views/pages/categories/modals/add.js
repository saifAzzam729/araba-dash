import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import { CategoryResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import {useEffect, useState} from "react";
import { useMutation } from "react-query";
import CategoriesService from "../../../../common/services/CategoriesService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {Col, Row} from "reactstrap";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";


const AddCategoryModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	const {preferredTableContentLocale} = useSettingsUiContext();

	const {translate} = useLocaleContext()

	if (item) {
		defaultValues = {
			...item,
			"translations.en.name": item.name,
			"translations.en.description": item.description,
		};
	}

	const {
		control,
		register,
		handleSubmit,
		formState:{errors},
		watch,
		setValue

	} = useForm({ defaultValues, resolver: CategoryResolvers.addResolver });

	const [backendErrors, setBackendErrors] = useState([]);

	const nameEnValue = watch('translations.en.name') ?? ''
	const descriptionEnValue = watch('translations.en.description') ?? ''

	useEffect(() => {
		if (nameEnValue) {
			setValue('translations.ar.name', nameEnValue);
		}

		if (descriptionEnValue) {
			setValue('translations.ar.description', descriptionEnValue);
		}
	}, [nameEnValue, descriptionEnValue]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => CategoriesService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	const prepareData = (data) => {
		const { translations, image, publish, parent, featured, guide } = data;
		mutate({ translations,
			image: image && image[0],
			guide: guide && guide[0],
			publish,
			parent: parent ? parent.value: null,
			featured });
	};

	const promiseCategoriesOptions = (searchValue) => new Promise((resolve) => {
		CategoriesService.getPagination({
			search:searchValue,
			locale: preferredTableContentLocale
		}).then((res) => {
			resolve(res.pagination.items.map((item) => {
					return {
						label:item.name,
						value:item.id
					}
				})
			)
		})
	});

	return (
		<CustomModal translatedHeader={translate("categories.common.add-category")} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<Row>
						<Col xs={6}>
							<UncontrolledTextInput
								name="translations.en.name"
								label={translate("categories.forms.nameEn")}
								register={register}
								errorMessage={errors && errors.translations?.en?.name?.message}
							/>
						</Col>
						<Col xs={6}>
							<UncontrolledTextInput
								name="translations.ar.name"
								label={translate("categories.forms.nameAr")}
								register={register}
								errorMessage={errors && errors.translations?.ar?.name?.message}
							/>
						</Col>
						<Col xs={6}>
							<UncontrolledTextAreaInput
								name="translations.en.description"
								label={translate("categories.forms.descriptionEn")}
								register={register}
								errorMessage={errors && errors.translations?.en?.description?.message}
							/>
						</Col>
						<Col xs={6}>
							<UncontrolledTextAreaInput
								name="translations.ar.description"
								label={translate("categories.forms.descriptionAr")}
								register={register}
								errorMessage={errors && errors.translations?.ar?.description?.message}
							/>
						</Col>
						<Col xs={6}>
							<CustomControlledAsyncSelectField
								label={translate("categories.forms.parent")}
								name={"parent"}
								control={control}
								getOptionsPromise={promiseCategoriesOptions}
								errors={errors}
							/>
						</Col>
						<Col xs={3}>
							<CustomControlledCheckboxInput
								name="publish"
								label={translate("categories.forms.publish")}
								control={control}
								styles={'pt-50'}
							/>
						</Col>
						<Col xs={3}>
							<CustomControlledCheckboxInput
								name="featured"
								label={translate("categories.forms.featured")}
								control={control}
								styles={'pt-50'}

							/>
						</Col>

						<Col xs={6} className={"mt-2"}>
							<CustomControlledImageUploader
								control={control}
								errors={errors}
								label={translate('categories.forms.image')}
								name={'image'}
							/>
						</Col>

						<Col xs={6} className={"mt-2"}>
							<CustomControlledImageUploader
								control={control}
								errors={errors}
								label={translate('categories.forms.guide')}
								name={'guide'}
							/>
						</Col>

					</Row>
					<hr/>

					<div className="col-auto">
						<SubmitLoadingBtn isLoading={isLoading} />
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default AddCategoryModal;
