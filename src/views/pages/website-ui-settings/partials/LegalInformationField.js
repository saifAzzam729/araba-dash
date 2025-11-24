import {CardText} from "reactstrap";
import {useFormContext} from "react-hook-form";
import CustomControlledRadioInput from "@components/controlled-inputs/CustomControlledRadioInput";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {LEGAL_INFORMATION_VALUES} from "@src/views/pages/website-ui-settings/partials/data";

export default function LegalInformationField({legalInformationFlag}) {
    const {control} = useFormContext();
    const {translate} = useLocaleContext()

    return (
        <div className='session-info mb-1 mb-lg-0'>
            <CardText className='fw-bold mb-0'>
                {translate('website-ui-settings.legal-information-title')}
            </CardText>
            <div className='demo-inline-spacing'>
                <div className='form-check'>
                    <CustomControlledRadioInput
                        control={control}
                        name={'legalInformationCheckout'}
                        defaultValue={legalInformationFlag.value}
                        options={Object.values(LEGAL_INFORMATION_VALUES).map(item => {
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