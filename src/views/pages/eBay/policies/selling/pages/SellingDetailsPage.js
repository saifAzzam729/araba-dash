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
                <Col sm={12} md={12} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay-selling-policy.forms.uuid")}
                                  value={(policyDetails && policyDetails.uuid)}/>
                </Col>

                {/* New Data Object Fields */}
                <Col sm={12} md={12} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay-selling-policy.forms.sku")}
                                  value={(policyDetails.data && policyDetails.data.sku)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay-selling-policy.forms.marketplace")}
                                  value={(policyDetails.data && policyDetails.data.marketplaceId)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay-selling-policy.forms.format")}
                                  value={(policyDetails.data && policyDetails.data.format)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay-selling-policy.forms.availableQuantity")}
                                  value={(policyDetails.data && policyDetails.data.availableQuantity)}/>
                </Col>
                <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay-selling-policy.forms.price")}
                                  value={(policyDetails.data && `${policyDetails.data.pricingSummary?.price?.value} ${policyDetails.data.pricingSummary?.price?.currency}`)}/>
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
        </Card>

    )
}