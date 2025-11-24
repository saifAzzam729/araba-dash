import { useForm } from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import ProductVariantsService from "@src/common/services/ProductVariantsService";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomModal from "@components/modal";
import CustomControlledMultiAsyncSelectField from "@components/controlled-inputs/CustomControlledMultiAsyncSelectField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useParams} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";

import {
	addProductVariantSchemaFactory
} from "@src/views/pages/products/pages/view/tabs-content/product-variants/schemas/add";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {Alert} from "@mui/material";


const AddProductVariantModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	if (item) {
		defaultValues = {
			...item,
		};
	}
	const {locale, translate} = useLocaleContext()
	const {preferredTableContentLocale} = useSettingsUiContext();


	const {
		control,
		watch,
		handleSubmit,
		formState:{errors
		} } =
		useForm({
			defaultValues,
			resolver: yupResolver(addProductVariantSchemaFactory(translate)),
		});
	const [backendErrors, setBackendErrors] = useState([]);
	const {id: productId} = useParams()
	const optionsValues = watch('options')
	const [excludedIds, setExcludedIds] = useState()
	const {mutate, isError, isLoading} = useMutation(
		(data) => ProductVariantsService.create(productId,data, preferredTableContentLocale),
		{
			onSuccess: onAddSuccessCb,
			onError: (error) => {
				setBackendErrors(error.response.data.formErrors || error.response.data.error);
			},
		}
	);
	const onSubmit = (data) => {
		const { quantity, sku, cost, price, options } = data;

		// COMPLEXITY :  there is 1 loop -> O(n)

		const optionsObjectToSend = options.map((item) => ({
			productAttribute: item.productAttr,
			option: item.value
		}));

		mutate({ quantity, sku, cost, price, options:optionsObjectToSend })
	};
	const promiseAttributesOptions = (searchValue) =>
		new Promise((resolve) => {
			ProductVariantsService.productAttributes({
				search: searchValue,
				locale: locale,
				id: productId,
				excluded_ids: excludedIds
			}).then((res) => {

				// COMPLEXITY :  there are 2 loops -> O(n*n)

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
			// COMPLEXITY :  there is 1 loop -> O(n)

			const newOptionsIds = optionsValues.map((item) => item.productAttr)
			const excludedIdsString = newOptionsIds.join(',');
			setExcludedIds(excludedIdsString)
		}
	}, [optionsValues]);

	return (
		<CustomModal header={"Add Product Variant"} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{typeof backendErrors === 'string' ? (
					<Alert severity="error">
						<span>{backendErrors}</span>
					</Alert>
				) : (
					<ErrorAlert isError={isError} errors={backendErrors} />
				)}
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<div className="row">
						<div className="col-6 mb-2">
							<CustomControlledInputField
								label={translate('common.sku')}
								name="sku"
								control={control}
								errors={errors}
								type="text"
								placeholder="sku"
							/>
						</div>
						<div className="col-6 mb-2">
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
						<div className="col-6 mb-2">
							<CustomControlledInputField
								label={translate('common.price')}
								name="price"
								control={control}
								errors={errors}
								type="number"
								placeholder="price"
								acceptsDecimals={true}
							/>
						</div>

						<div className="col-6 mb-2">
							<CustomControlledInputField
								label={translate('common.cost')}
								name="cost"
								control={control}
								errors={errors}
								type="number"
								placeholder="cost"
								acceptsDecimals={true}

							/>
						</div>
						<div className="col-12 mb-2">
							<CustomControlledInputField
								label={translate('common.quantity')}
								name="quantity"
								control={control}
								errors={errors}
								type="number"
								placeholder="quantity"
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

export default AddProductVariantModal;
