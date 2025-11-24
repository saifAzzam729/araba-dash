import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {Col, Row} from "reactstrap";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function ProductSpecification() {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    const {translate} = useLocaleContext()

    return (
        <Row className='mb-2'>
            <h4 className='text-primary'>
                {translate('common.product-specification')}
            </h4>
            <Col xs={3} className="mb-2">
                <CustomControlledInputField
                    label={translate('common.price')}
                    name="price"
                    control={control}
                    errors={errors}
                    type="number"
                    acceptsDecimals={true}
                    acceptsPositiveOnly={true}
                />
            </Col>

            <Col xs={3} className="mb-2">
                <CustomControlledInputField
                    label={translate('common.cost')}
                    name="cost"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder="cost"
                />
            </Col>
            <Col xs={3} className="mb-2">
                <CustomControlledInputField
                    label={translate('common.quantity')}
                    name="quantity"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder="quantity"
                />
            </Col>
            <Col xs={3} className="mb-2">
                <CustomControlledInputField
                    label="sku"
                    name="sku"
                    control={control}
                    placeholder="sku"
                    errors={errors}
                />
            </Col>

            <Col xs={3} className="mb-2">
                <CustomControlledInputField
                    label="MPN"
                    name="mpn"
                    control={control}
                    placeholder="MPN"
                    errors={errors}
                />
            </Col>
            <Col xs={3} className="mb-2">
                <CustomControlledInputField
                    label="GTIN"
                    name="gtin"
                    control={control}
                    placeholder="GTIN"
                    errors={errors}
                />
            </Col>
        </Row>
    )
}

export default ProductSpecification