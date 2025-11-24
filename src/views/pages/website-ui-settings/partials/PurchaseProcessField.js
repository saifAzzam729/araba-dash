import {CardText} from "reactstrap";
import {useFormContext} from "react-hook-form";
import CustomControlledRadioInput from "@components/controlled-inputs/CustomControlledRadioInput";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {PURCHASE_PROCESS_VALUES} from "@src/views/pages/website-ui-settings/partials/data";

export default function PurchaseProcessField({purchaseProcessFlag}) {
    const {control} = useFormContext();
    const {translate} = useLocaleContext()

    return (
        <div className='session-info mb-1 mb-lg-0'>
            <CardText className='fw-bold mb-0'>
                {translate('website-ui-settings.purchase-process-title')}
            </CardText>
            <div className='demo-inline-spacing'>
                <div className='form-check'>
                    <CustomControlledRadioInput
                        control={control}
                        name={'purchaseProcessCheckout'}
                        defaultValue={purchaseProcessFlag.value}
                        options={Object.values(PURCHASE_PROCESS_VALUES).map(item => {
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