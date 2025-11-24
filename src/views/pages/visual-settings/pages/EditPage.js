// ** Reactstrap Imports

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "@components/breadcrumbs";

import { Button, Col, Row, Card, FormText } from "reactstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import VisualSettingsService from "../../../../common/services/VisualSettingsService";
import CustomControlledRichTextField
	from "../../../../@core/components/controlled-inputs/CustomControlledRichTextField";
import { useMutation, useQuery } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";

const schema = yup.object().shape({
	descriptionAr: yup.string().required(),
	descriptionEn: yup.string().required(),
	titleAr: yup.string().required(),
	titleEn: yup.string().required(),
});

const EditPage = () => {
	const navigate = useNavigate();
	const { settingKey } = useParams();
	const [setting, setSetting] = useState([]);
	const {makeLocaleUrl, translate} = useLocaleContext();

	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => VisualSettingsService.update(data.id, data),
        {
            onSuccess: () => {
				navigate(makeLocaleUrl("/visual-settings"));
				showSuccessAlert({});
			},
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
		['visual-settings', settingKey],
		() =>  VisualSettingsService.getByKey(settingKey),
        {
            onSuccess: (res) => {
                const { data: settingData } = res;
				setSetting(settingData);
				setValue("titleEn", settingData.translations.en.title);
				setValue("titleAr", settingData.translations.ar.title);
				setValue("descriptionEn", settingData.translations.en.description);
				setValue("descriptionAr", settingData.translations.ar.description);
				setValue('id', settingData.id)
				setValue('link', settingData.link)
            }
        }
	)

	const extractDataAndSubmit = (data) => {
		const {
			titleAr,
			titleEn,
			descriptionAr,
			descriptionEn,
			image,
			id,
			link
		} = data;
		mutate({
			translations: {
				en: {
					title: titleEn,
					description: descriptionEn,
				},
				ar: {
					title: titleAr,
					description: descriptionAr,
				},
			},
			id,
			image,
			link
		})
	};

	const goBack = () => {
		navigate(makeLocaleUrl("/visual-settings"));
	};
	const {width} = useWindowSize()

	return (
		<>
			<BreadCrumbs
				title={"edit-setting-page"}
				data={[{ title: translate('common.visual-settings'), link: "/visual-settings" }]}
			/>
			<Card className={width <= WindowBreakpoint.md ? '' : 'p-5'}>
				<div>
					<h3>{translate('visual-settings.edit-header')}</h3>
					<p>{translate('visual-settings.edit-subHeader')}</p>
				</div>
				<div className="invoice-add-wrapper">
					<Row className="invoice-add">
						<Col xl={12}>
							<form onSubmit={handleSubmit(extractDataAndSubmit)}>
								<ErrorAlert isError={isError} errors={backendErrors} />
								<Row>
									<Col xs={12} md={6} className="mb-2">
										<CustomControlledRichTextField
											label={translate('visual-settings.forms.titleEn')}
											name="titleEn"
											control={control}
											placeholder="John Doe"
											errors={errors}
										/>
									</Col>
									<Col xs={12} md={6} className="mb-2">
										<CustomControlledRichTextField
											label={translate('visual-settings.forms.titleAr')}
											name="titleAr"
											control={control}
											placeholder="John Doe"
											errors={errors}
										/>
									</Col>
									<Col xs={12} md={6} className="mb-2">
										<CustomControlledRichTextField
											label={translate('visual-settings.forms.descriptionEn')}
											name="descriptionEn"
											control={control}
											placeholder="John Doe"
											errors={errors}
											type='textarea'
										/>
									</Col>
									<Col xs={12} md={6} className="mb-2">
										<CustomControlledRichTextField
											label={translate('visual-settings.forms.descriptionAr')}
											name="descriptionAr"
											control={control}
											placeholder="John Doe"
											errors={errors}
											type='textarea'
										/>
									</Col>

									<Col xs={12} md={6}>
										<Row>
											<Col xs={12} md={9}>
												<label htmlFor="image" className="form-label">
													{translate('visual-settings.forms.image')}
												</label>
												<input
													className="form-control"
													id="image"
													{...register("image")}
													type="file"
												/>
												<FormText color="danger">
													{errors.image && errors.image.message}
												</FormText>
											</Col>

											<Col xs={12} md={3}>
												<label htmlFor="image" className="form-label">
													{translate('visual-settings.forms.current-image')}
												</label>
												<img
													src={ParseImageUrl(setting.imageFileUrl)}
													width={"100%"}
												/>
											</Col>

										</Row>
									</Col>

									{
										(settingKey === "RIGHT_AD" || settingKey === "LEFT_AD") && (
											<Col xs={12} md={6}>
												<CustomControlledInputField
													label={translate('visual-settings.forms.link')}
													name="link"
													control={control}
													placeholder=""
													errors={errors}
												/>
											</Col>
										)
									}

								</Row>
								<div className={`d-flex align-items-center justify-content-start gap-1 ${width <= WindowBreakpoint.md ? 'mt-2' : 'mt-1'}`}>
									<SubmitLoadingBtn isLoading={isLoading} />
									<Button
										type="button"
										color="secondary"
										outline
										onClick={goBack}
										className="mb-3"
									>
										{translate('common.back')}
									</Button>
								</div>
							</form>
						</Col>
					</Row>
				</div>
			</Card>
		</>
	);
};

export default EditPage;
