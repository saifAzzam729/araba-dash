import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import BrandsService from "../../../../common/services/BrandsService";
import { BrandResolvers } from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import UncontrolledTextAreaInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextAreaInput";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";

const EditBrandModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()

	const { register,
		handleSubmit,
		setValue,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			...item,
		},
		resolver: BrandResolvers.editResolver,
	});

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => BrandsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
		['brand', item.id],
		() => BrandsService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
				setValue("translations.en.name", data.translations.en.name);
				setValue("translations.ar.name", data.translations.ar.name);
				setValue("translations.en.description", data.translations.en.description);
				setValue("translations.ar.description", data.translations.ar.description);
            }
        }
	)

	const prepareData = (data) => {
		const { translations, image, publish, featured } = data;
		mutate({ id: item.id, translations, image, publish, featured });
	};
	return (
		<CustomModal translatedHeader={translate("brands.common.add-brand")} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<div className="row">
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.en.name"
								label={translate("brands.forms.nameEn")}
								register={register}
								errorMessage={errors && errors.translations?.en?.name?.message}
							/>
						</div>
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.ar.name"
								label={translate("brands.forms.nameAr")}
								register={register}
								errorMessage={errors && errors.translations?.ar?.name?.message}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-6">
							<UncontrolledTextAreaInput
								name="translations.en.description"
								label={translate("brands.forms.descriptionEn")}
								register={register}
								errorMessage={errors && errors.translations?.en?.description?.message}
							/>
						</div>
						<div className="col-6">
							<UncontrolledTextAreaInput
								name="translations.ar.description"
								label={translate("brands.forms.descriptionAr")}
								register={register}
								errorMessage={errors && errors.translations?.ar?.description?.message}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-6">
							<CustomControlledCheckboxInput
								label={translate("brands.forms.publish")}
								name="publish"
								control={control}
								styles={'d-flex gap-75 flex-column-reverse'}

							/>
						</div>
						<div className="col-6">
							<CustomControlledCheckboxInput
								label={translate("brands.forms.featured")}
								name="featured"
								control={control}
								styles={'d-flex gap-75 flex-column-reverse'}
							/>
						</div>

					</div>
					{/*<hr />*/}

					<div className="row mt-2">

						<div className="col-12 col-sm-6 col-md-6 col-lg-6">
							<label htmlFor="image" className="form-label">
								{translate("brands.forms.image")}
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
								{translate("brands.common.current-image")}
							</label>
							<img src={ParseImageUrl(item.imageFileUrl)} width={"200px"}/>
						</div>
					</div>



					<hr/>
					{/*<div className="row">*/}
					{/*	<div className="col-6">*/}
					{/*		<UncontrolledCheckboxInput*/}
					{/*			name="publish"*/}
					{/*			label={translate("brands.forms.publish")}*/}
					{/*			register={register}*/}
					{/*		/>*/}
					{/*	</div>*/}
					{/*</div>*/}
					{/*<hr/>*/}

					<div class="col-auto">
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default EditBrandModal;
