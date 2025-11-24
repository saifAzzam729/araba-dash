import {useQuery} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import WebsiteHeaderCardForm from "@src/views/pages/website-ui-settings/partials/WebsiteHeaderCardForm";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import {includedSettingsKeys} from "@src/views/pages/website-ui-settings/partials/includedSettingsKeys";

export default function WebsiteUISettingsHeaderCard() {
    const includedKeys = includedSettingsKeys.join(',')
    const {data, refetch} = useQuery(
        ['website-Links-included'],
        () => MultiTypeSettingsService.getPagination({
            include_keys: includedKeys,
            limit : 20,
        }),
    );

    const onEditSuccess = () => {
        refetch();
        showSuccessAlert({});
    }

    const items = data?.pagination.items ?? undefined;

    if (!items) {
        return;
    }

    return (
        <WebsiteHeaderCardForm
            footerFlag={items?.find(item => item.settingKey === 'ENABLE_FOOTER_FLAG')}
            guestCheckoutObject={items?.find(item => item.settingKey === 'GUEST_CHECKOUT_REQUIRED_FIELDS')}
            multiAddresses={items?.find(item => item.settingKey === 'ENABLE_USER_MULTI_ADDRESS')}
            wishListFlag={items?.find(item => item.settingKey === 'ACTIVE_WISH_LIST')}
            productReviewFlag={items?.find(item => item.settingKey === 'ACTIVE_PRODUCT_REVIEW')}
            addToCartFlag={items?.find(item => item.settingKey === 'ACTIVE_ADD_TO_CART')}
            registerLoginFlag={items?.find(item => item.settingKey === 'ACTIVE_REGISTER_LOGIN')}
            comingSoonMode={items?.find(item => item.settingKey === 'ACTIVE_COMING_SOON_MODE')}
            maintenanceMode={items?.find(item => item.settingKey === 'ACTIVE_MAINTENANCE_MODE')}

            legalInformationFlag={items?.find(item => item.settingKey === 'ACTIVE_LEGAL_INFORMATION')}
            purchaseProcessFlag={items?.find(item => item.settingKey === 'ACTIVE_PURCHASE_PROCESS')}
            shipmentInformationFlag={items?.find(item => item.settingKey === 'ACTIVE_SHIPMENT_INFORMATION')}
            productTaxFlag={items?.find(item => item.settingKey === 'AUTO_CALCULATE_TAX_VALUE')}


            onEditSuccess={onEditSuccess}
        />
    )
}