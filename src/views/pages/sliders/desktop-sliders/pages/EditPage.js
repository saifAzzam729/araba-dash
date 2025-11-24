import React, { useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "@components/breadcrumbs";
import {Button, Col, Row, Card, FormText} from "reactstrap";
import { useForm } from "react-hook-form";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import CustomControlledRichTextField from "@components/controlled-inputs/CustomControlledRichTextField";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import SlidersServices from "@src/common/services/SliderService";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import CustomControlledColorPicker from "@components/controlled-inputs/CustomControlledColorPicker";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import {SliderResolvers} from "@src/views/pages/sliders/data";

const EditSliders = () => {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {translate} = useLocaleContext();
    const { id } = useParams();
    const {width} = useWindowSize()
    const [slider, setSlider] = useState({})

    useQuery(
        ['slider', id],
        () => SlidersServices.getById(id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setSlider(data)
                setValue('link', data.link)
                setValue('titleEn', data.translations.en.title)
                setValue('titleAr', data.translations.ar.title)
                setValue('descriptionEn', data.translations.en.description)
                setValue('descriptionAr', data.translations.ar.description)
                setValue('buttonTextEn', data.translations.en.buttonText)
                setValue('buttonTextAr', data.translations.ar.buttonText)
                setValue('buttonColor', data.buttonColor)
                setValue('publish', data.publish)
            }
        }
    )

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState:{errors}
    } = useForm({
        defaultValues: {
            ...slider,
            media: ParseImageUrl(slider?.mediaFileUrl)
        },
        resolver: SliderResolvers.editResolver

    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => SlidersServices.update(id, data),
        {
            onSuccess: () => {
                navigate(makeLocaleUrl("/desktop-sliders"));
                showSuccessAlert({});
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {
            media, titleEn, titleAr, descriptionEn, descriptionAr, link, buttonText, buttonColor, publish,
            buttonTextEn, buttonTextAr,
        } = data;
        const dataToSend = {
            translations: {
                en: {
                    title: titleEn,
                    description: descriptionEn,
                    buttonText: buttonTextEn
                },
                ar: {
                    title: titleAr,
                    description: descriptionAr,
                    buttonText: buttonTextAr
                },
            },
            link,
            buttonText,
            buttonColor,
            publish,
            presentingType: 'DESKTOP',
            media: media[0]
        }

        const isVideo = media[0].type.startsWith('video/')
        if (isVideo) {
            dataToSend["type"] = "VIDEO"
        } else {
            dataToSend["type"] = "IMAGE"
        }
        mutate(dataToSend)
    };

    const goBack = () => {
        navigate(makeLocaleUrl("/desktop-sliders"));
    };

    return (
        <>
            <BreadCrumbs
                title={"edit-slider-page"}
                data={[{ title: translate('common.sliders'), link: "/desktop-sliders" }]}
            />
            <Card className={width <= WindowBreakpoint.md ? '' : "p-5"}>
                <div className='mb-1'>
                    <h4>{translate('common.edit-slider-details')}</h4>
                </div>
                <div className="invoice-add-wrapper">
                    <Row className="invoice-add">
                        <Col xl={12}>
                            <form onSubmit={handleSubmit(prepareData)}>
                                <ErrorAlert isError={isError} errors={backendErrors}/>
                                <Row>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledRichTextField
                                            label={translate('sliders.forms.titleEn')}
                                            name="titleEn"
                                            control={control}
                                            placeholder="John Doe"
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledRichTextField
                                            label={translate('sliders.forms.titleAr')}
                                            name="titleAr"
                                            control={control}
                                            placeholder="John Doe"
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledRichTextField
                                            label={translate('sliders.forms.descriptionEn')}
                                            name="descriptionEn"
                                            control={control}
                                            placeholder="John Doe"
                                            errors={errors}
                                            type='textarea'
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledRichTextField
                                            label={translate('sliders.forms.descriptionAr')}
                                            name="descriptionAr"
                                            control={control}
                                            placeholder="John Doe"
                                            errors={errors}
                                            type='textarea'
                                        />
                                    </Col>

                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            name="buttonTextEn"
                                            label={translate('sliders.forms.buttonTextEn')}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            name="buttonTextAr"
                                            label={translate('sliders.forms.buttonTextAr')}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Col>

                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledInputField
                                            name="link"
                                            label={translate('sliders.forms.link')}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Col>

                                    <Col xs={12} md={6} className="mb-2">
                                        <CustomControlledColorPicker
                                            label={translate('sliders.forms.buttonColor')}
                                            name={"buttonColor"}
                                            control={control}
                                            isAlignedStart={true}
                                            colorValueRGBA={slider?.buttonColor}
                                        />
                                    </Col>

                                    <Col xs={12} md={6} className='mb-2'>
                                        <label htmlFor="image" className="form-label">
                                            {translate('sliders.forms.media')}
                                        </label>
                                        <CustomControlledImageUploader
                                            control={control}
                                            errors={errors}
                                            name={'media'}
                                            multiple={true}
                                        />
                                    </Col>

                                    <Col xs={12} md={6} className="mb-2 mt-1">
                                        <CustomControlledCheckboxInput
                                            name="publish"
                                            label={translate('sliders.forms.publish')}
                                            control={control}
                                        />
                                    </Col>
                                </Row>
                                <div className="d-flex align-items-center justify-content-start gap-1">
                                    <SubmitLoadingBtn isLoading={isLoading}/>
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

export default EditSliders
