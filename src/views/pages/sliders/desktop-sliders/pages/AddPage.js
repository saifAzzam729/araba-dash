import { useState } from "react";
import { useNavigate } from "react-router-dom";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "@components/breadcrumbs";
import { Button, Col, Row, Card } from "reactstrap";
import { useForm } from "react-hook-form";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import CustomControlledRichTextField from "@components/controlled-inputs/CustomControlledRichTextField";
import { useMutation } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import SlidersServices from "@src/common/services/SliderService";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import CustomControlledColorPicker from "@components/controlled-inputs/CustomControlledColorPicker";
import UncontrolledCheckboxInput from "@components/form-ui/uncontrolled-inputs/UncontrolledCheckboxInput";
import useWindowSize from "@hooks/useWindowSize";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import {SliderResolvers} from "@src/views/pages/sliders/data";

const AddDesktopSlider = () => {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    let defaultValues = undefined;
    const {translate} = useLocaleContext();
    const {width} = useWindowSize()

    defaultValues = {
        image: '',
        titleEn: '',
        titleAr: '',
        descriptionEn:'',
        descriptionAr:'',
        link: "https://",
        buttonTextEn: '',
        buttonTextAr: '',
        buttonColor: '',
        publish: false
    };

    const {
        register,
        handleSubmit,
        control,
        formState:{errors}
    } = useForm({
        defaultValues,
        resolver: SliderResolvers.addResolver
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => SlidersServices.create(data),
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
        const { media, titleEn, titleAr, descriptionEn, descriptionAr, link, buttonTextEn ,buttonTextAr, buttonColor, publish } = data;
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
            buttonColor,
            publish,
            presentingType: 'DESKTOP',
            media: media[0]
        }

        const isVideo = media[0].type.startsWith('video/')
        if (isVideo){
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
                title={"add-slider-page"}
                data={[{ title: translate('common.sliders'), link: "/desktop-sliders" }]}
            />
            <Card className={width <= WindowBreakpoint.md ? '' : "p-5"}>
                <div className='mb-1'>
                    <h3>{translate('common.add-slider-page')}</h3>
                </div>
                <div className="invoice-add-wrapper">
                    <Row className="invoice-add">
                        <Col xl={12}>
                            <form onSubmit={handleSubmit(prepareData)}>
                                <ErrorAlert isError={isError} errors={backendErrors} />
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

export default AddDesktopSlider
