import {useQuery} from "react-query";
import EBayPoliciesService from "@src/common/services/EBayPoliciesService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {Button, Card, Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function () {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {translate} = useLocaleContext()
    const navigate = useNavigate();

    const {id: accountId, policyId} = useParams()


    const {data, refetch} = useQuery(
        ['one-selling-policy', accountId],
        () => EBayPoliciesService.getById(accountId, policyId,
            {
                locale: preferredTableContentLocale
            }
        )
    )
    const policyDetails = data?.data ?? []

    const goBack = () => {
        navigate(-1);
    };
    return (
        <Card className={'p-3'}>
            <div>
                <h2>{translate('ebay-ship.common.view.header')}</h2>
                <p>{translate('ebay-ship.common.view.sub-header')}</p>
                <hr/>
                <Row>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.title")}
                                      value={(policyDetails && policyDetails.name)}/>
                    </Col>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.account")}
                                      value={(policyDetails && policyDetails.ebayAccount?.title)}/>
                    </Col>
                    <div className="divider d-none d-md-block"></div>
                    <hr/>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.uuid")}
                                      value={(policyDetails && policyDetails.uuid)}/>
                    </Col>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.marketplace")}
                                      value={(policyDetails.data && policyDetails.data.marketplaceId)}/>
                    </Col>

                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.time")}
                                      value={(policyDetails.data && `${policyDetails.data.handlingTime?.value} - ${policyDetails.data.handlingTime?.unit}`)}/>
                    </Col>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.costType")}
                                      value={(policyDetails.data && `${policyDetails.data.shippingOptions[0].costType}`)}/>
                    </Col>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.optionType")}
                                      value={(policyDetails.data && `${policyDetails.data.shippingOptions[0].optionType}`)}/>
                    </Col>

                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.buyerResponsibleForShipping")}
                                      value={(policyDetails.data &&
                                          `${policyDetails.data.shippingOptions[0]?.shippingServices[0].buyerResponsibleForShipping}`)}/>
                    </Col>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.freeShipping")}
                                      value={(policyDetails.data &&
                                          `${policyDetails.data.shippingOptions[0]?.shippingServices[0].freeShipping === true ? 'yes' : 'no'}`)}/>
                    </Col>
                    <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                        <ViewTextItem label={translate("ebay-selling-policy.forms.shippingServiceCode")}
                                      value={(policyDetails.data &&
                                          `${policyDetails.data.shippingOptions[0]?.shippingServices[0].shippingServiceCode}`)}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm={12} md={4} className='mb-1 mb-lg-0'>

                        <Button
                            type="button"
                            color="secondary"
                            outline
                            onClick={goBack}
                            className="mb-3"
                        >
                            {translate('common.back')}
                        </Button>

                    </Col>
                </Row>
            </div>
        </Card>
    )
}