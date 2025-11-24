import {Button, Col, FormText, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import {Trash} from "react-feather";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import React from "react";

function OptionFieldsGroup({field, index, handleDeleteOption}) {
    const {control, register, formState: {errors}, watch} = useFormContext();

    const {translate} = useLocaleContext();
    const {width} = useWindowSize()


    const addPrefixForField = (fieldName) => {
        return `options.${index}.${fieldName}`
    }

    const options = watch('options');

    const addPrefixForTranslationField = (fieldName) => {
        return addPrefixForField(`translations[${index}].${fieldName}`);
    }


    return (
        <>
            <div key={field.id} className={"mb-0 mb-md-2"}>

                <h3 className='text-primary mb-1 w-50'>
                    {`${translate('product-attribute.common.option')} ${index + 1}`}
                </h3>
                <Row className='justify-content-between align-items-center'>
                    <Col xs={12} md={6} lg={4} className="mb-1">

                        <div className={"mb-1"}>

                            <CustomControlledInputField
                                label={translate('forms.nameEn')}
                                name={addPrefixForTranslationField('valueEn')}
                                control={control}
                                placeholder={translate('forms.nameEn')}
                                errors={errors}
                            />
                        </div>

                        <CustomControlledInputField
                            label={translate('forms.nameAr')}
                            name={addPrefixForTranslationField('valueAr')}
                            control={control}
                            placeholder={translate('forms.nameAr')}
                            errors={errors}
                        />
                    </Col>
                    <Col xs={12} md={6} lg={4} className="mb-1">
                        <div className={"mb-1"}>
                            <CustomControlledInputField
                                label={translate('forms.descriptionEn')}
                                name={addPrefixForTranslationField('descriptionEn')}
                                control={control}
                                placeholder={translate('forms.descriptionEn')}
                                errors={errors}
                            />

                        </div>
                        <CustomControlledInputField
                            label={translate('forms.descriptionAr')}
                            name={addPrefixForTranslationField('descriptionAr')}
                            control={control}
                            placeholder={translate('forms.descriptionAr')}
                            errors={errors}
                        />
                    </Col>

                    <Col xs={12} md={6} lg={4} className={`mb-1 
                    ${WindowBreakpoint.sm < width && width <= WindowBreakpoint.md ? 'w-100 d-flex align-items-center gap-2' : ''}`}>
                        <div className={`${width > WindowBreakpoint.sm ? 'd-flex flex-column w-100' : ''}`}>
                            <label htmlFor="icon" className="form-label">
                                {translate('forms.image')}
                            </label>
                            <input
                                className="form-control"
                                id="icon"
                                {...register(addPrefixForField("icon"))}
                                type="file"
                                // disabled={true}
                            />
                            <FormText color="danger">
                                {errors.icon && errors.icon.message}
                            </FormText>
                        </div>
                        <div className={`d-flex gap-2 align-items-center pt-2 ${WindowBreakpoint.sm < width && width <= WindowBreakpoint.md ? 'pb-2' : ''}`}>
                            <CustomControlledCheckboxInput
                                control={control}
                                label={translate('forms.publish')}
                                name={addPrefixForField('publish')}
                            />

                            <span className={`pt-2 ${WindowBreakpoint.sm < width && width <= WindowBreakpoint.md ? 'pb-1' : ''}`}>
                                {options && options.length > 1 &&
                                    <Button color='danger' className='text-nowrap px-1' onClick={handleDeleteOption}
                                            outline>
                                        <Trash size={14}/>
                                    </Button>
                                }
                            </span>

                        </div>

                        <hr className="inline-block d-md-none my-1"/>



                    </Col>

                </Row>
            </div>
        </>
    )
}

export default OptionFieldsGroup
