import {useMutation, useQueryClient} from "react-query";
import {useMemo, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {createAddSchema, createTabIndex} from "@src/views/pages/products-attributes/add/data";
import {useFieldArray, useForm} from "react-hook-form";
import {AttributeOptionDefaultValues, MainAttributeDefaultValues} from "@src/views/pages/products-attributes/data";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import ProductAttributesService from "@src/common/services/ProductAttributesService";
import showSuccessAlert from "@components/alert/showSuccessAlert";

export default function useAddDataManager({
                                              onAddSuccessCb = () => {
                                              }
                                          }) {
    const queryClient = useQueryClient()
    const [backendErrors, setBackendErrors] = useState([]);
    const {translate} = useLocaleContext();

    const schema = useMemo(() => {
        return createAddSchema(translate);
    }, [translate]);


    const FormMethods = useForm({
        defaultValues: {
            ...MainAttributeDefaultValues,
            options: [{...AttributeOptionDefaultValues,}]
        },
        resolver: yupResolver(schema),
    });

    const {fields, append, remove, reset} = useFieldArray({
        control: FormMethods.control,
        name: "options"
    });

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductAttributesService.create(data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries({queryKey: ['products-attributes']})
                FormMethods.reset();
                onAddSuccessCb(data);
                showSuccessAlert({})
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            }
        }
    );

    const handleDelete = (index) => {
        remove(index)
    }

    const handleAddOptionsClick = async () => {
        const result = await FormMethods.trigger("options");
        if (!result) {
            return;
        }
        append({});
    }

    const prepareDataAndSubmit = ({
                                      icon,
                                      publish,
                                      nameEn,
                                      nameAr,
                                      descriptionEn,
                                      descriptionAr,
                                      options,
                                  }) => {

        const optionsToSend = options.map((opt, index) => {
            return {
                publish: !!opt.publish,
                icon: opt.icon.item(0),
                translations: {
                    en: {
                        value: opt.translations[index].valueEn,
                        description: opt.translations[index].descriptionEn
                    },
                    ar: {
                        value: opt.translations[index].valueAr,
                        description: opt.translations[index].descriptionAr
                    }
                }
            };
        })

        const objectToSend = {
            icon: icon.item(0),
            publish: !!publish,
            translations: {
                en: {
                    name: nameEn,
                    description: descriptionEn
                },
                ar: {
                    name: nameAr,
                    description: descriptionAr
                }
            },
            options: optionsToSend,
        };

        mutate(objectToSend)
    }

    return {
        backendErrors,

        isErrorWithUpdateMutation: isError,
        FormMethods,

        fields,
        addOptionFormItem: append,

        handleDelete,
        prepareDataAndSubmit,

        handleAddOptionsClick,
    }
}
