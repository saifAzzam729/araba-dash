import CustomModal from "@components/modal";
import { useForm } from "react-hook-form";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import {useEffect, useState} from "react";
import { useMutation } from "react-query";
import ProductImagesServices from "../../../../../../../../common/services/ProductImagesServices";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledImageUploader
	from "@components/filepond-uploader/CustomControlledImageUploader";
import CustomControlledMultiAsyncSelectField from "@components/controlled-inputs/CustomControlledMultiAsyncSelectField";
import ProductVariantsService from "@src/common/services/ProductVariantsService";
import {
	addImagesOptionsSchemaFactory
} from "@src/views/pages/products/pages/view/tabs-content/product-images/schemas/add";
import {yupResolver} from "@hookform/resolvers/yup";

const AddProductImagesModal = ({ isOpen, closeModal, onAddSuccessCb, item = null, }) => {
	let defaultValues = undefined;
	if (item) {
		defaultValues = {
			// image: '',
			publish: false
		};
	}

	const {translate, locale} = useLocaleContext();

	const {
		register,
		handleSubmit ,
		control,
		watch,
		formState:{errors}
	} = useForm({
		defaultValues,
		resolver: yupResolver(addImagesOptionsSchemaFactory(translate)),

	});

	const [backendErrors, setBackendErrors] = useState([]);
	const optionsValues = watch('options')
	const [excludedIds, setExcludedIds] = useState()
    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductImagesServices.create({...data, product: item.product.id}),
        {
            onSuccess: () => {
				closeModal()
				onAddSuccessCb()
			},
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	const prepareData = (data) => {
		const { images, publish, options } = data;
		const attributeOptionsIds = options.map((item) => item.value)
		const dataToSend = {
			images: images.map((img) => (
				{
				image: img,
				publish: publish,
					optionIds: attributeOptionsIds
			}
			))
		};
		mutate(dataToSend);
	};
	const promiseAttributesOptions = (searchValue) =>
		new Promise((resolve) => {
			ProductVariantsService.productAttributes({
				search: searchValue,
				locale: locale,
				id: item.product.id,
				excluded_ids: excludedIds
			}).then((res) => {


				const flattenedArray = res.data.flatMap((attribute) =>
					attribute.attributeOptions.map((option) => ({
						label: `${attribute.name}-${option.option.value}`,
						value: option.id,
						productAttr : attribute.id
					}))
				);
				resolve(flattenedArray);
			});
		});
	useEffect(() => {
		if (optionsValues) {
			const newOptionsIds = optionsValues.map((item) => item.productAttr)
			const excludedIdsString = newOptionsIds.join(',');
			setExcludedIds(excludedIdsString)
		}
	}, [optionsValues]);

	return (
		<CustomModal header={"Add options and images"} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{gap: "1rem"}}>
					<div className="col-12">
						<CustomControlledMultiAsyncSelectField
							label={translate("common.options")}
							placeholder={translate("crops.forms.options")}
							name={"options"}
							key={excludedIds}
							control={control}
							getOptionsPromise={promiseAttributesOptions}
							errors={errors}
						/>
					</div>
					<div className="col-auto">
						<label htmlFor="image" className="form-label">
							{translate('product.forms.image')}
						</label>
						<CustomControlledImageUploader
							control={control}
							errors={errors}
							name={'images'}
							multiple={true}
						/>
					</div>

					<UncontrolledCheckboxInput
						name="publish"
						label={translate('product.forms.publish')}
						register={register}
					/>

					<hr/>
					<div className="col-auto">
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default AddProductImagesModal;
