import {Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function ProductMetaInformation() {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    const {translate} = useLocaleContext()

    return (
        <Row>
            <h4 className='text-primary'>{translate('common.product-meta-info')}</h4>
            <p>{translate('product.tabs.meta.sub-header')}</p>
            <Col md={12} lg={6} className="mb-2">
                <CustomControlledInputField
                    label={translate('forms.meta-keywordsEn')}
                    name="metaKeywordsEn"
                    control={control}
                    placeholder={translate('forms.meta-keywordsEn')}
                    errors={errors}
                />
            </Col>
            <Col md={12} lg={6} className="mb-2">
                <CustomControlledInputField
                    label={translate('forms.meta-keywordsAr')}
                    name="metaKeywordsAr"
                    control={control}
                    placeholder={translate('forms.meta-keywordsAr')}
                    errors={errors}
                />
            </Col>
            <Col md={12} lg={6} className="mb-2">
                <CustomControlledInputField
                    label={translate('forms.meta-descriptionEn')}
                    name="metaDescriptionEn"
                    control={control}
                    placeholder={translate('forms.meta-descriptionEn')}
                    errors={errors}
                />
            </Col>
            <Col md={12} lg={6} className="mb-2">
                <CustomControlledInputField
                    label={translate('forms.meta-descriptionAr')}
                    name="metaDescriptionAr"
                    control={control}
                    placeholder={translate('forms.meta-descriptionAr')}
                    errors={errors}
                />
            </Col>
        </Row>
    )
}

export default ProductMetaInformation