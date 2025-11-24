import {useForm} from "react-hook-form";

import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledMultiAsyncSelectField from "@components/controlled-inputs/CustomControlledMultiAsyncSelectField";
import ProductVariantsService from "@src/common/services/ProductVariantsService";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useParams} from "react-router-dom";
import CustomModal from "@components/modal";
import {
    editProductVariantSchemaFactory
} from "@src/views/pages/products/pages/view/tabs-content/product-variants/schemas/edit";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {Alert} from "@mui/material";

const EditProductVariantModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }
    const { locale, translate } = useLocaleContext()
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {control, handleSubmit, setValue, watch, formState: {errors}} = useForm({
        defaultValues: {
            // ...item,
        },
        resolver: yupResolver(editProductVariantSchemaFactory(translate)),
    });

    const [backendErrors, setBackendErrors] = useState({});
    const {id: productId} = useParams()
    const optionsValues = watch('options')
    const [excludedIds, setExcludedIds] = useState()

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductVariantsService.update(item.id, productId, data, preferredTableContentLocale),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors || error.response.data.error);
            },
        }
    );

    useQuery(
        ['products-variants', item.id],
        () => ProductVariantsService.getById(item.id, {locale}),
        {
            onSuccess: (res) => {
                const {data} = res;

                setValue("cost", data.cost);
                setValue("price", data.price);
                setValue("sku", data.sku);
                setValue("quantity", data.quantity);
                if (data.options) {
                    setValue("options", data.options.map((item) => ({
                        label: `${item.attributeName}-${item.value}`,
                        value: item.id
                    })));

                }

            }
        }
    )
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

    const onSubmit = (data) => {
        const { quantity, sku, cost, price, options } = data;

        // COMPLEXITY :  there is 1 loop -> O(n)

        const optionsObjectToSend = options.map((item) => ({
            productAttribute: item.parentId,
            option: item.value
        }));
        mutate({ quantity, sku, cost, price, options:optionsObjectToSend })
    };
    return (
        <CustomModal header={"Edit Product Variant"} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {typeof backendErrors === 'string' ? (
                    <Alert severity="error">
                        <span>{backendErrors}</span>
                    </Alert>
                ) : (
                    <ErrorAlert isError={isError} errors={backendErrors} />
                )}
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
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

export default EditProductVariantModal;
