import {Col, FormText, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";

function ProductMainDetails({
                                image = false,
                                productImageFileUrl = '',
                                productImageName = '',
                                publish= false
}) {
    const {
        control,
        register,
        formState: {errors},
        watch
    } = useFormContext();

    const {translate} = useLocaleContext()

    return (
        <Row className='mb-2'>
            <h4 className='text-primary'>
                {translate('common.product-main-details')}
            </h4>
            <Col xs={6} className="mb-2">
                <CustomControlledInputField
                    label={translate('forms.name')}
                    name="nameEn"
                    control={control}
                    placeholder="John Doe"
                    errors={errors}
                    style={{padding: '16px 13px 30px'}}
                />
            </Col>
            {/*<Col xs={6} className="mb-2">*/}
            {/*    <CustomControlledInputField*/}
            {/*        label={translate('forms.nameAr')}*/}
            {/*        name="nameAr"*/}
            {/*        control={control}*/}
            {/*        placeholder="John Doe"*/}
            {/*        errors={errors}*/}
            {/*    />*/}
            {/*</Col>*/}
            <Col xs={6} className="mb-2">
                <CustomControlledInputField
                    label={translate('forms.description')}
                    name="descriptionEn"
                    control={control}
                    placeholder="John Doe"
                    errors={errors}
                    type='textarea'
                />
            </Col>
            {/*<Col xs={6} className="mb-2">*/}
            {/*    <CustomControlledInputField*/}
            {/*        label={translate('forms.descriptionAr')}*/}
            {/*        name="descriptionAr"*/}
            {/*        control={control}*/}
            {/*        placeholder="John Doe"*/}
            {/*        errors={errors}*/}
            {/*        type='textarea'*/}
            {/*    />*/}
            {/*</Col>*/}

            <Col xs={6} className="mb-2">
                <label htmlFor="image" className="form-label">
                    {translate('forms.image')}
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

        </Row>
    )

}

export default ProductMainDetails