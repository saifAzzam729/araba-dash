import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import {ProductReviewResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ProductReviewsService from "@src/common/services/ProductReviewsService";
import {useAuth} from "@src/utility/context/AuthProvider";
import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import ProductsService from "@src/common/services/ProductsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import UncontrolledRateInput from "@components/form-ui/uncontrolled-inputs/UncontrolledRateInput";

const EditProductReviewModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()

	const { register, handleSubmit, control, setValue, formState: { errors }, } = useForm({
		defaultValues: {
			...item,
		},
		resolver: ProductReviewResolvers.editResolver,
	});

    const [backendErrors, setBackendErrors] = useState({});
	const {user} = useAuth()
	const {preferredTableContentLocale} = useSettingsUiContext();


	const {mutate, isError, isLoading} = useMutation(
        (data) => ProductReviewsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
		['product-review', item.id],
		() => ProductReviewsService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
				setValue("title", data.title);
				setValue("message", data.message);
				setValue("rate", data.rate);
				setValue("product", {
					value: data.product.id,
					label: data.product.name,
				});
            }
        }
	)

	const prepareData = (data) => {
		const { title, image, message, rate, product, publish } = data;
		mutate({ id: item.id, rate, product:product.value, message, title, image, publish, user: user.id, userFullName: user.fullName, userEmail: user.email });
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
		<CustomModal translatedHeader={translate("product-review.common.edit-product-review")} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
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
					<div className="row">

						<div className="col-12 col-sm-6 col-md-6 col-lg-6">
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

						<div className="col-12 col-sm-6 col-md-6 col-lg-6 d-flex flex-column">
							<label htmlFor="image" className="form-label">
								{translate("product-review.common.current-image")}
							</label>
							<img src={ParseImageUrl(item.imageFileUrl)} width={"200px"}/>
						</div>
					</div>

					<hr/>
					<div className="row">
						<div className="col-6">
							<UncontrolledCheckboxInput
								name="publish"
								label={translate("product-review.forms.publish")}
								register={register}
							/>
						</div>
					</div>
					<hr/>

					<div class="col-auto">
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default EditProductReviewModal;
