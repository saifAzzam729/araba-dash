import {CardText} from "reactstrap";
import {useFormContext} from "react-hook-form";
import CustomControlledRadioInput from "@components/controlled-inputs/CustomControlledRadioInput";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {FOOTER_FLAG_VALUES} from "@src/views/pages/website-ui-settings/partials/data";

export default function FooterFlagFields({footerFlag}) {
    const {control} = useFormContext();
    const {translate} = useLocaleContext()

    return (
        <div className='session-info mb-1 mb-lg-0'>
            <CardText className='fw-bold mb-0'>
                {translate('website-ui-settings.footer-flag-title')}
            </CardText>
            <div className='demo-inline-spacing'>
                <div className='form-check'>
                    <CustomControlledRadioInput
                        control={control}
                        name={'flag'}
                        defaultValue={footerFlag.value}
                        options={Object.values(FOOTER_FLAG_VALUES).map(item => ({
                            label: translate(`website-ui-settings.${item}`),
                            value: item
                        }))}
                    />
                </div>
            </div>
        </div>
    )
}