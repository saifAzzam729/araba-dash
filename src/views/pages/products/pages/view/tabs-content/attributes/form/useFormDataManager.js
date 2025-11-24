import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import ProductsService from "@src/common/services/ProductsService";
import {useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import showErrorAlert from "@components/alert/showErrorAlert";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

function useFormDataManager({productId}) {
    const [backendErrors, setBackendErrors] = useState([]);
    const {translate, isRtl} = useLocaleContext()
    const queryClient = useQueryClient()
    const {preferredTableContentLocale} = useSettingsUiContext();


    const optionSchema = yup.object().shape({
        price: yup.number(),
        priceType: yup.object().shape({
            value: yup.string()
        }),
        option: yup.object().shape({
            value: yup.number().required(translate('forms.field-required'))
        }),
    });
    const schema = yup.lazy((obj) => {
        const shape = {};
        Object.keys(obj).forEach((key) => {
            shape[key] = yup.object().shape({
                options: yup.array().of(optionSchema)
            });
        });
        return yup.object().shape(shape);
    });
    const FormMethods = useForm({
        resolver: yupResolver(schema)
    })



    const {mutate:updateProductAttributes, isLoading:ProductAttributeLoading } = useMutation(
        (data) => ProductsService.sendProductAttributes(data, preferredTableContentLocale),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['product']})
                showSuccessAlert({})
                window.location.reload()
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
                showErrorAlert({})
            }
        }
    );

    const prepareDataAndSubmit = (data) => {

        const objectsWithKeys = Object.keys(data)
            .filter(key => data[key] && data[key].options && data[key].options.length > 0)
            .map(key => {
                const extractedOptions = data[key].options.map(opt => {
                    const toReturn = {
                        option: opt.option.value,
                        price: opt.price,
                        priceType: opt.priceType.value,
                        publish: opt.publish,
                        defaultOption: opt.defaultOption
                    }
                    if(opt.id){
                        toReturn['productAttributeOption'] = opt.id
                    }
                    return toReturn;
                })

                const toReturn = {
                    attribute: key,
                    required: data[key].required,
                    options: extractedOptions,
                };


                if (data[key].id) {
                    toReturn['productAttribute'] = data[key].id
                }
                return toReturn;

        });
        const objectToSend = {
            product: productId,
            items: objectsWithKeys
        };
        updateProductAttributes(objectToSend)
    };

    return {
        FormMethods,
        prepareDataAndSubmit,
        ProductAttributeLoading,
        ProductAttributesErrors: backendErrors,
        translate,
        isRtl,

    }
}

export default useFormDataManager
