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
            <Row>
                <Col sm={12} md={12} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.title")}
                                  value={(policyDetails && policyDetails.name)}/>
                </Col>
                <div className="divider d-none d-md-block"></div>
                <hr/>
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
                    <ViewTextItem label={translate("ebay.forms.marketPlace")}
                                  value={(policyDetails.data && policyDetails.data?.marketplaceId)}/>
                </Col>

                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.description")}
                                  value={(policyDetails.data && policyDetails.data?.description)}/>
                </Col>
                <Col xs={12} md={12}>
                    <h4>{translate('ebay.forms.Domestic-Returns')}</h4>
                    <hr/>
                </Col>
                {/*domestic*/}
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.unit")}
                                  value={(policyDetails.data && `${policyDetails.data?.returnPeriod?.value} - ${policyDetails.data?.returnPeriod?.unit}`)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.returnAccepted")}
                                  value={(policyDetails.data &&
                                      `${policyDetails.data?.returnAccepted === true ? translate('yes') : translate('no')}`)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.payer")}
                                  value={(policyDetails.data &&
                                      `${policyDetails.data?.returnShippingCostPayer}`)}/>
                </Col>
                {/*==============INTERNATIONAL=================*/}
                <Col xs={12} md={12}>
                    <h4>{translate('ebay.forms.international-Returns')}</h4>
                    <hr/>
                </Col>

                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.unit")}
                                  value={(policyDetails.data &&
                                      `${policyDetails.data?.internationalOverride.returnPeriod?.value} - ${policyDetails.data?.internationalOverride?.returnPeriod?.unit}`)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.returnAccepted")}
                                  value={(policyDetails.data &&
                                      `${policyDetails.data?.internationalOverride.returnAccepted === true ? translate('yes') : translate('no')}`)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay.forms.payer")}
                                  value={(policyDetails.data &&
                                      `${policyDetails.data?.internationalOverride.returnShippingCostPayer}`)}/>
                </Col>


            </Row>
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
        </Card>
    )
}