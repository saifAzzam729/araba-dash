import {FormProvider, useForm} from "react-hook-form";
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import FooterFlagFields from "@src/views/pages/website-ui-settings/partials/FooterFlagFields";
import {Edit} from "react-feather";
import {
    getAddToCartFlagFlagByValue,
    getAddToCartFlagValueByKey,
    getComingSoonModeByValue,
    getComingSoonModeValueByKey,
    getFooterFlagKeyByValue,
    getFooterFlagValueByKey,
    getGuestCheckOutByValue,
    getGuestCheckOutValueByKey,
    getLegalInformationByValue,
    getLegalInformationValueByKey,
    getMaintenanceModeByValue,
    getMaintenanceModeValueByKey,
    getProductReviewFlagByValue,
    getProductReviewFlagValueByKey, getProductTaxFlagByValue, getProductTaxFlagValueByKey, getPurchaseProcessByValue,
    getPurchaseProcessValueByKey,
    getRegisterLoginByValue,
    getRegisterLoginValueByKey, getShipmentInformationByValue,
    getShipmentInformationValueByKey,
    getUserCrudAddressesByValue,
    getUserCrudAddressesValueByKey,
    getWishListFlagByValue,
    getWishListFlagValueByKey
} from "@src/views/pages/website-ui-settings/partials/data";
import GuestCheckOut from "@src/views/pages/website-ui-settings/partials/GuestCheckOut";
import UserMultiAddresses from "@src/views/pages/website-ui-settings/partials/UserMultiAddresses";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useMutation} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import {useState} from "react";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import WishListFlagFields from "@src/views/pages/website-ui-settings/partials/WishListFlagFields";
import ProductReviewFlagFields from "@src/views/pages/website-ui-settings/partials/ProductReviewFlagFields";
import AddToCartFlagFields from "@src/views/pages/website-ui-settings/partials/AddToCartFlagFields";
import RegisterLoginFields from "@src/views/pages/website-ui-settings/partials/RegisterLoginFields";
import ComingSoonField from "@src/views/pages/website-ui-settings/partials/ComingSoonField";
import MaintenanceModeField from "@src/views/pages/website-ui-settings/partials/MaintenanceModeField";
import LegalInformationField from "@src/views/pages/website-ui-settings/partials/LegalInformationField";
import ShipmentInformationField from "@src/views/pages/website-ui-settings/partials/ShipmentInformationField";
import PurchaseProcessField from "@src/views/pages/website-ui-settings/partials/PurchaseProcessField";
import ProductTaxField from "@src/views/pages/website-ui-settings/partials/ProductTaxField";

export default function WebsiteHeaderCardForm({
                                                  footerFlag,
                                                  guestCheckoutObject,
                                                  multiAddresses,
                                                  wishListFlag,
                                                  productReviewFlag,
                                                  addToCartFlag,
                                                  registerLoginFlag,
                                                  comingSoonMode,
                                                  maintenanceMode,

                                                  legalInformationFlag,
                                                  purchaseProcessFlag,
                                                  shipmentInformationFlag,
                                                  productTaxFlag,
                                                  onEditSuccess
}) {
    const {translate} = useLocaleContext()
    const [backendErrors, setBackendErrors] = useState({});

    const FormMethods = useForm({
        defaultValues: {
            flag: getFooterFlagValueByKey(footerFlag?.value),
            guestCheckout: getGuestCheckOutValueByKey(guestCheckoutObject?.value),
            userAddressSettings: getUserCrudAddressesValueByKey(multiAddresses?.value),
            wishlistFlag: getWishListFlagValueByKey(wishListFlag?.value),
            productReviewCheckout: getProductReviewFlagValueByKey(productReviewFlag?.value),
            addToCartCheckout: getAddToCartFlagValueByKey(addToCartFlag?.value),
            registerLoginCheckout: getRegisterLoginValueByKey(registerLoginFlag?.value),
            comingSoonModeCheckout: getComingSoonModeValueByKey(comingSoonMode?.value),
            maintenanceModeCheckout: getMaintenanceModeValueByKey(maintenanceMode?.value),
            legalInformationCheckout: getLegalInformationValueByKey(legalInformationFlag?.value),
            purchaseProcessCheckout: getPurchaseProcessValueByKey(purchaseProcessFlag?.value),
            shipmentInformationCheckout: getShipmentInformationValueByKey(shipmentInformationFlag?.value),

            productTaxCheckout: getProductTaxFlagValueByKey(productTaxFlag?.value),
        }
    })

    const {mutate, isError} = useMutation(
        (data) => MultiTypeSettingsService.bulkUpdate(data),
        {
            onSuccess: onEditSuccess,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    function prepareData(data) {
        const {
            flag,
            guestCheckout,
            userAddressSettings,
            wishlistFlag,
            productReviewCheckout,
            addToCartCheckout,
            registerLoginCheckout,
            comingSoonModeCheckout,
            maintenanceModeCheckout,

            legalInformationCheckout,
            purchaseProcessCheckout,
            shipmentInformationCheckout,
            productTaxCheckout
        } = data
        const footerVal = getFooterFlagKeyByValue(flag);
        const guestCheckoutVal = getGuestCheckOutByValue(guestCheckout);
        const userMultiAddressesVal = getUserCrudAddressesByValue(userAddressSettings);
        const wishListVal = getWishListFlagByValue(wishlistFlag);
        const productReviewVal = getProductReviewFlagByValue(productReviewCheckout);
        const addToCartVal = getAddToCartFlagFlagByValue(addToCartCheckout);
        const registerLoginVal = getRegisterLoginByValue(registerLoginCheckout);
        const comingSoonVal = getComingSoonModeByValue(comingSoonModeCheckout);
        const maintenanceVal = getMaintenanceModeByValue(maintenanceModeCheckout);
        const legalInformationVal = getLegalInformationByValue(legalInformationCheckout);
        const purchaseProcessVal = getPurchaseProcessByValue(purchaseProcessCheckout);
        const shipmentInformationVal = getShipmentInformationByValue(shipmentInformationCheckout)
        const productTaxVal = getProductTaxFlagByValue(productTaxCheckout)

        const footerObjToSend = {
            settingKey: footerFlag.settingKey,
            description: footerFlag.description,
            value: footerVal,
        }

        const guestCheckOutObjToSend = {
            settingKey: guestCheckoutObject.settingKey,
            description: guestCheckoutObject.description,
            value: guestCheckoutVal,
        }
        const userMultiObjToSend = {
            settingKey: multiAddresses.settingKey,
            description: multiAddresses.description,
            value: userMultiAddressesVal,
        }

        const wishListObjToSend = {
            settingKey: wishListFlag.settingKey,
            description: wishListFlag.description,
            value: wishListVal,
        }

        const productReviewObjToSend = {
            settingKey: productReviewFlag.settingKey,
            description: productReviewFlag.description,
            value: productReviewVal,
        }

        const addToCartObjToSend = {
            settingKey: addToCartFlag.settingKey,
            description: addToCartFlag.description,
            value: addToCartVal,
        }

        const registerLoginObjToSend = {
            settingKey: registerLoginFlag.settingKey,
            description: registerLoginFlag.description,
            value: registerLoginVal,
        }

        const maintenanceModeObjToSend = {
            settingKey: maintenanceMode.settingKey,
            description: maintenanceMode.description,
            value: maintenanceVal,
        }

        const comingSoonObjToSend = {
            settingKey: comingSoonMode.settingKey,
            description: comingSoonMode.description,
            value: comingSoonVal,
        }


        const legalInformationObjToSend = {
            settingKey: legalInformationFlag.settingKey,
            description: legalInformationFlag.description,
            value: legalInformationVal,
        }
        const purchaseProcessObjToSend = {
            settingKey: purchaseProcessFlag.settingKey,
            description: purchaseProcessFlag.description,
            value: purchaseProcessVal,
        }
        const shipmentInformationObjToSend = {
            settingKey: shipmentInformationFlag.settingKey,
            description: shipmentInformationFlag.description,
            value: shipmentInformationVal,
        }
        const ProductTaxObjToSend = {
            settingKey: productTaxFlag.settingKey,
            description: productTaxFlag.description,
            value: productTaxVal,
        }

        const dataToSend = {
            multiTypeSettings: [
                footerObjToSend,
                guestCheckOutObjToSend,
                userMultiObjToSend,
                wishListObjToSend,
                productReviewObjToSend,
                addToCartObjToSend,
                registerLoginObjToSend,
                maintenanceModeObjToSend,
                comingSoonObjToSend,
                legalInformationObjToSend,
                purchaseProcessObjToSend,
                shipmentInformationObjToSend,
                ProductTaxObjToSend
            ]
        };
        mutate(dataToSend)

    }

    return (
        <Row className='match-height'>
            <Col xs='12'>
                <Card className={'bg-white'}>
                    <CardBody>
                        <FormProvider {...FormMethods}>
                            <form onSubmit={FormMethods.handleSubmit(prepareData)}>
                                <ErrorAlert isError={isError} errors={backendErrors} />
                                <Row className='pb-50'>
                                    <Col
                                        sm={{size: 12, order: 1}}
                                        className='d-flex justify-content-between flex-column mt-lg-0 mt-2'
                                    >
                                        <FooterFlagFields footerFlag={footerFlag}/>
                                        <hr/>
                                        <WishListFlagFields wishListFlag={wishListFlag} />
                                        <hr/>
                                        <ProductReviewFlagFields productReviewFlag={productReviewFlag} />
                                        <hr/>
                                        <AddToCartFlagFields addToCartFlag={addToCartFlag} />
                                        <hr/>
                                        <UserMultiAddresses multiAddresses={multiAddresses} />
                                        <hr/>
                                        <GuestCheckOut guestCheckoutObject={guestCheckoutObject}/>
                                        <hr/>
                                        <RegisterLoginFields registerLoginFlag={registerLoginFlag} />
                                        <hr/>
                                        <ComingSoonField comingSoonMode={comingSoonMode} />
                                        <hr/>
                                        <MaintenanceModeField maintenanceMode={maintenanceMode} />
                                        <hr/>
                                        <LegalInformationField legalInformationFlag={legalInformationFlag} />
                                        <hr/>
                                        <ShipmentInformationField shipmentInformationFlag={shipmentInformationFlag} />
                                        <hr/>
                                        <PurchaseProcessField purchaseProcessFlag={purchaseProcessFlag} />
                                        <hr/>
                                        <ProductTaxField productTaxFlag={productTaxFlag} />
                                    </Col>
                                </Row>

                                <Row className='pt-50'>
                                    <Col className='mb-2 d-flex justify-content-end' sm='12'>
                                        <Button className='btn-icon' color='success' outline type={"submit"}>
                                            <span className='mx-25'>{translate('website-ui-settings.update')}</span>
                                            <Edit size={14}/>
                                        </Button>
                                    </Col>

                                </Row>
                            </form>
                        </FormProvider>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}