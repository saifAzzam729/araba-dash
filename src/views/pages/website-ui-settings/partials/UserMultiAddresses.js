import {CardText} from "reactstrap";
import {useFormContext} from "react-hook-form";
import CustomControlledRadioInput from "@components/controlled-inputs/CustomControlledRadioInput";
import {USER_CRUD_ADDRESSES_VALUES} from "@src/views/pages/website-ui-settings/partials/data";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function UserMultiAddresses({multiAddresses}) {
    const {control} = useFormContext()
    const {translate} = useLocaleContext()
    return (
        <div className='session-info mb-1 mb-lg-0'>
            <CardText className='fw-bold mb-0'>
                {translate('website-ui-settings.user-addresses-title')}
            </CardText>
            <div className='demo-inline-spacing'>
                <div className='form-check'>
                    <CustomControlledRadioInput
                        control={control}
                        name={'userAddressSettings'}
                        defaultValue={multiAddresses.value}
                        options={Object.values(USER_CRUD_ADDRESSES_VALUES).map(item => ({
                            label: translate(`website-ui-settings.${item}`),
                            value: item
                        }))}
                    />
                </div>
            </div>
        </div>
    )
}