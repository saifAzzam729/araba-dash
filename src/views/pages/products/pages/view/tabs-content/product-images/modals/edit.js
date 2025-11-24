import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import ParseImageUrl from "../../../../../../../../common/helpers/ParseImageUrl";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import ProductImagesServices from "@src/common/services/ProductImagesServices";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledImageUploader
    from "@components/filepond-uploader/CustomControlledImageUploader";
import ProductVariantsService from "@src/common/services/ProductVariantsService";
import CustomControlledMultiAsyncSelectField from "@components/controlled-inputs/CustomControlledMultiAsyncSelectField";
import MediaSliderBase from "@components/image-slider-crud/MediaSliderBase";
import ImageSlider from "@src/views/pages/products/pages/view/tabs-content/product-images/partials/ImagesSlider";

const EditProductImagesModal = ({isOpen, closeModal, item, onEditSuccessCb,}) => {

    const {translate, locale} = useLocaleContext();

    if (!item) {
        return null;
    }
    const imageUrl = item.images.map((img) => {
        return {
            fileUrl: ParseImageUrl(img.imageFileUrl),
            id: img.id
        }
    })

    const defaultImagesUrl = imageUrl.map((img)=> img.fileUrl)

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState:{errors}
    } = useForm({
        defaultValues: {

            options: item.options.map((item)=> {
                return {
                    label: `${item.optionName}-${item.attributeName}`,
                    value: item.productAttributeOptionId,
                    productAttr : item.ProductAttributeId
                }
            }),
            images: defaultImagesUrl
        },
    });

    const [backendErrors, setBackendErrors] = useState({});
    const optionsValues = watch('options')
    const [excludedIds, setExcludedIds] = useState()

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductImagesServices.create({...data, product: item.product.id}),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );


    const prepareData = (data) => {
        const { images, publish, options } = data;
        const attributeOptionsIds = options.map((item) => item.value)

        const extractImageName = images?.map(item => item.name);
        const deletedImages = item.images.filter(item => !extractImageName.includes(item.imageFileUrl.split('/').pop()));
        const imagesToSend = images.filter(file => file instanceof File);

        const dataToSend = {
            images: imagesToSend.map((img) => (
                {
                    image: img,
                    publish: publish,
                    optionIds: attributeOptionsIds
                }
            )),
            deletedImages: deletedImages.length > 0 ? deletedImages.map((obj) => obj.id) : []

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
        <CustomModal header={"Edit options and images"} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <div className="row">

                        {/*{*/}
                        {/*    item.images && <ImageSlider sliders={item?.images} isLoading={false} />*/}
                        {/*}*/}
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
                        <div className="col-12">
                            <label htmlFor="image" className="form-label">
                                {translate('product.forms.image')}
                            </label>
                            <CustomControlledImageUploader
                                control={control}
                                errors={errors}
                                label={'image'}
                                name={'images'}
                                multiple={true}

                            />
                        </div>
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

export default EditProductImagesModal;
