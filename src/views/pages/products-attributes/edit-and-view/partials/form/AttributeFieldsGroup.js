import {Col, FormText, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import React from "react";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import useWindowSize from "@hooks/useWindowSize";

function AttributeFieldsGroup({attributeItem}) {

    const {translate} = useLocaleContext();

    const {
        control,
        register,
        formState: {errors}
    } = useFormContext();

    const {width} = useWindowSize()


    return (
        <Row>
            <Col sm={12} md={6} lg={4} className="mb-2">
                <div className={"mb-1"}>
                    <CustomControlledInputField
                        label={translate('forms.nameEn')}
                        name="nameEn"
                        control={control}
                        placeholder={translate('forms.nameEn')}
                        errors={errors}
                    />
                </div>
                <CustomControlledInputField
                    label={translate('forms.nameAr')}
                    name="nameAr"
                    control={control}
                    placeholder={translate('forms.nameAr')}
                    errors={errors}
                />
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-2">
                <div className={"mb-1"}>
                    <CustomControlledInputField
                        label={translate('forms.descriptionEn')}
                        name="descriptionEn"
                        control={control}
                        placeholder={translate('forms.descriptionEn')}
                        errors={errors}
                    />
                </div>

                <CustomControlledInputField
                    label={translate('forms.descriptionAr')}
                    name="descriptionAr"
                    control={control}
                    placeholder={translate('forms.descriptionAr')}
                    errors={errors}
                />
            </Col>
            <Col sm={12} md={6} lg={4} className={`mb-2 ${WindowBreakpoint.sm < width && width <= WindowBreakpoint.md ? 'w-100 d-flex align-items-center gap-2' : ''}`}>
                <div className={`mb-1 ${width > WindowBreakpoint.sm ? 'd-flex flex-column w-100' : ''}`}>

                    <label htmlFor="image" className="form-label">
                        {translate('forms.image')}
                    </label>
                    <input
                        className="form-control"
                        id="image"
                        {...register("icon")}
                        type="file"

                    />
                    <FormText color="danger">
                        {errors.image && errors.image.message}
                    </FormText>
                </div>

                <div className={`${WindowBreakpoint.sm < width && width <= WindowBreakpoint.md ? 'pb-75' : 'pt-lg-50'}`}>
                    <CustomControlledCheckboxInput
                        control={control}
                        label={translate('forms.publish')}
                        name={'publish'}
                    />
                </div>

            </Col>



        </Row>
    )
}

export default AttributeFieldsGroup
