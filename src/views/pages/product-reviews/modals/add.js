import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import { useState } from "react";
import { useMutation } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ProductsService from "@src/common/services/ProductsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import {useAuth} from "@src/utility/context/AuthProvider";
import ProductReviewsService from "@src/common/services/ProductReviewsService";
import {ProductReviewResolvers} from "@src/views/pages/product-reviews/data";
import UncontrolledRateInput from "@components/form-ui/uncontrolled-inputs/UncontrolledRateInput";

const AddProductReviewModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {

    let defaultValues = undefined;
    const {translate} = useLocaleContext()
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {user} = useAuth()


    if (item) {
        defaultValues = {
            ...item,
        };
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        defaultValues,
        resolver: ProductReviewResolvers.addResolver,
    });

    const [backendErrors, setBackendErrors] = useState([]);


    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductReviewsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {product, message, rate, image, publish,title} = data;
        mutate({product:product.value,title, message, rate, image, publish, user:user.id, userFullName:user.fullName, userEmail:user.email});
    };
    const promiseProducts = (searchValue) => new Promise((resolve) => {
        ProductsService.getPagination({
            search:searchValue,
            locale:preferredTableContentLocale
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
        <CustomModal translatedHeader={translate("product-review.common.add-product-review")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row">
                        <div className="col-6">
                            <CustomControlledAsyncSelectField
                                label={translate("product-review.forms.products")}
                                name={"product"}
                                control={control}
                                getOptionsPromise={promiseProducts}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6">
                            <UncontrolledTextInput
                                name="title"
                                label={translate("product-review.forms.title")}
                                register={register}
                                errorMessage={errors && errors.title}
                            />
                        </div>
                    </div>

                    <hr/>
                    <div className="row">
                        <div className="col-12">
                            <UncontrolledRateInput
                                name="rate"
                                label={translate("product-review.forms.rate")}
                                register={register}
                                errorMessage={errors && errors.rate}
                            />
                        </div>
                        <div className="col-12">
                            <UncontrolledTextAreaInput
                                name="message"
                                label={translate("product-review.forms.message")}
                                register={register}
                                errorMessage={errors && errors.message}
                            />
                        </div>
                    </div>

                    <hr/>
                    <div className="col-auto">
                        <label htmlFor="image" className="form-label">
                            {translate("product-review.forms.image")}
                        </label>
                        <input
                            className="form-control form-control-lg"
                            id="image"
                            {...register("image")}
                            type="file"
                        />
                    </div>
                    <hr/>
                    <div className="col-auto">
                        <div className="form-check">
                            <UncontrolledCheckboxInput
                                name="publish"
                                label={translate("product-review.forms.publish")}
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

export default AddProductReviewModal;
