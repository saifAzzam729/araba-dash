import {CardText} from "reactstrap";
import {useFormContext} from "react-hook-form";
import CustomControlledRadioInput from "@components/controlled-inputs/CustomControlledRadioInput";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {PRODUCT_TAX_FLAG_VALUES} from "@src/views/pages/website-ui-settings/partials/data";

export default function ProductTaxField({productTaxFlag}) {
    const {control} = useFormContext();
    const {translate} = useLocaleContext()

    return (
        <div className='session-info mb-1 mb-lg-0'>
            <CardText className='fw-bold mb-0'>
                {translate('website-ui-settings.product-tax-title')}
            </CardText>
            <div className='demo-inline-spacing'>
                <div className='form-check'>
                    <CustomControlledRadioInput
                        control={control}
                        name={'productTaxCheckout'}
                        defaultValue={productTaxFlag.value}
                        options={Object.values(PRODUCT_TAX_FLAG_VALUES).map(item => {
                            return ({
                                label: translate(`website-ui-settings.${item}`),
                                value: item
                            })
                        })}
                    />
                </div>
            </div>
        </div>
    )
}