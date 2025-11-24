import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import { TagsResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import { useState } from "react";
import { useMutation } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import ProductsService from "@src/common/services/ProductsService";
import TagsService from "@src/common/services/TagsService";
import CustomControlledColorPicker from "@components/controlled-inputs/CustomControlledColorPicker";
import CustomControlledAsyncSelectPaginate from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import { useLocaleContext } from "@src/providers/LocaleProvider";
import { Col, Row } from "reactstrap";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";

const AddTagsModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	const { translate } = useLocaleContext();

	if (item) {
		defaultValues = {
			...item,
			"translations.en.title": item.title,
			"translations.en.description": item.description,
		};
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues,
		resolver: TagsResolvers.addResolver,
	});

	const [backendErrors, setBackendErrors] = useState([]);

	const { mutate, isError, isLoading } = useMutation(
		(data) => TagsService.create(data),
		{
			onSuccess: onAddSuccessCb,
			onError: (error) => {
				setBackendErrors(error.response.data.formErrors);
			},
		}
	);

	const prepareData = (data) => {
		const {
			translations,
			products,
			image,
			publish,
			backgroundColor,
			featured,
		} = data;
		mutate({
			translations,
			products:
				products?.length > 0 ? products.map((product) => product.value) : [],
			image: image[0],
			publish,
			backgroundColor,
			featured,
		});
	};

	const promiseProductsOptions = (searchValue, prevOptions, additional) =>
		new Promise((resolve) => {
			const prevPage = additional?.prevPage ?? 0;

			const params = {
				search: searchValue,
				page: prevPage + 1,
			};
			const page = params.page;
			const perPage = 10;
			const search = params.search;
			ProductsService.getPagination({
				page,
				search,
				limit: perPage,
			}).then((res) => {
				const { pages, page: currentPage, items } = res.pagination;
				resolve({
					options: items.map((item) => ({
						label: item.name,
						value: item.id,
					})),
					hasMore: currentPage < pages,
					additional: {
						prevPage: currentPage,
						prevSearchValue: searchValue,
					},
				});
			});
		});

	return (
		<CustomModal
			translatedHeader={translate("tags.common.add-tag")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<Row>
						<Col xs={12} sm={6} className={"mb-1"}>
							<UncontrolledTextInput
								name="translations.en.title"
								label={translate("tags.forms.titleEn")}
								register={register}
								errorMessage={errors && errors.translations?.en?.title?.message}
							/>
						</Col>
						<Col xs={12} sm={6} className={"mb-1"}>
							<UncontrolledTextInput
								name="translations.ar.title"
								label={translate("tags.forms.titleAr")}
								register={register}
								errorMessage={errors && errors.translations?.ar?.title?.message}
							/>
						</Col>
						<Col xs={12} sm={6} className={"mb-1"}>
							<UncontrolledTextAreaInput
								name="translations.en.description"
								label={translate("tags.forms.descriptionEn")}
								register={register}
								errorMessage={
									errors && errors.translations?.en?.description?.message
								}
							/>
						</Col>
						<Col xs={12} sm={6} className={"mb-1"}>
							<UncontrolledTextAreaInput
								name="translations.ar.description"
								label={translate("tags.forms.descriptionAr")}
								register={register}
								errorMessage={
									errors && errors.translations?.ar?.description?.message
								}
							/>
						</Col>

						<Col xs={12} className={"mb-1"}>
							<CustomControlledAsyncSelectPaginate
								placeholder={translate("forms.Select")}
								name="products"
								label={translate("tags.forms.products")}
								control={control}
								getOptionsPromise={promiseProductsOptions}
								defaultOptions={[]}
								isMulti={true}
								errors={errors}
							/>
						</Col>

						<Col xs={12} className="mb-2">
							<label htmlFor="image" className="form-label">
								{translate("tags.forms.image")}
							</label>
							<CustomControlledImageUploader
								control={control}
								errors={errors}
								name={"image"}
								multiple={false}
							/>
						</Col>

						<Col xs={12} sm={4} className={"mb-2"}>
							<CustomControlledColorPicker
								name="backgroundColor"
								label={translate("tags.forms.backgroundColor")}
								control={control}
								isAlignedStart={true}
							/>
						</Col>
						<Col xs={12} sm={4} className={"mb-2"}>
							<CustomControlledCheckboxInput
								name="publish"
								label={translate("tags.forms.publish")}
								control={control}
							/>
						</Col>
						<Col xs={12} sm={4} className={"mb-2"}>
							<CustomControlledCheckboxInput
								name="featured"
								label={translate("tags.forms.featured")}
								control={control}
							/>
						</Col>
					</Row>
					<hr />
					<div className="col-auto">
						<SubmitLoadingBtn isLoading={isLoading} />
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default AddTagsModal;
