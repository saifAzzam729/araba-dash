import {Button, Card, Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import CopyableSlugBadge from "@src/views/pages/affiliates/partials/CopyableSlugBadge";
import CopyableStatsLinkBadge from "@src/views/pages/affiliates/partials/CopyableStatsLinkBadge";

function AffiliateInfoCard({affiliate}) {
    const navigate = useNavigate();
    const {translate, makeLocaleUrl} = useLocaleContext();
    const goBack = () => {
        navigate(makeLocaleUrl("/affiliates"));
    };
    return (
        <Card className="p-5 bg-white">
            <div>
                <h2>{translate('affiliates.tabs.view.header')}</h2>
                <p>{translate('affiliates.tabs.view.sub-header')}</p>
                <hr/>

                <Row className="my-2">
                    <Col xs={4}>
                        <ViewTextItem label={translate('affiliates.forms.name')} value={(affiliate && affiliate.name)}/>
                    </Col>
                    <Col xs={4}>
                        <ViewTextItem label={translate('affiliates.forms.email')}
                                      value={(affiliate && affiliate.email)}/>
                    </Col>
                    <Col xs={4}>
                        <ViewTextItem label={translate('affiliates.forms.slug')} value={(affiliate && affiliate.slug)}/>
                    </Col>

                    <div className="divider"></div>

                    <Col xs={4}>
                        <ViewTextItem label={translate('affiliates.forms.commissionType')}
                                      value={(affiliate && affiliate.commissionType === 'FIXED' ? 'Number' : affiliate?.commissionType)}/>
                    </Col>
                    <Col xs={4}>
                        <ViewTextItem label={translate('affiliates.common.commission_rate')}
                                      value={(affiliate && affiliate.commissionRate)}/>
                    </Col>
                    <Col xs={4}>
                        <ViewBooleanItem label={translate('affiliates.common.active')}
                                         value={(affiliate && affiliate.active)}/>
                    </Col>

                    <Col xs={4}>
                        <div className="d-flex flex-column" style={{gap: "0.5rem"}}>
                            <span>Slug</span>
                            <div className="d-flex flex-column" style={{gap: "0.5rem"}}>
                            <span className="h3 position-relative">
                                    {affiliate && <CopyableSlugBadge slug={affiliate.slug}/>}
                            </span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="d-flex flex-column" style={{gap: "0.5rem"}}>
                            <span>Statistics Link</span>
                            <div className="d-flex flex-column" style={{gap: "0.5rem"}}>
                            <span className="h3 position-relative">
                                {affiliate && <CopyableStatsLinkBadge slug={affiliate.slug}/>}
                            </span>
                            </div>
                        </div>
                    </Col>

                    <Col xs={4}>
                        <ViewBooleanItem label={translate('affiliates.common.active')}
                                         value={(affiliate && affiliate.active)}/>
                    </Col>

                    {affiliate && affiliate.coupons && (
                        <>
                            <div className="divider"></div>
                            <Col xs={6}>
                                <ViewTextItem label={translate('affiliates.forms.coupons')} value={
                                    affiliate.coupons.length > 0
                                        ? affiliate.coupons.map((coupon) => <span
                                            className='mx-1'>{coupon.couponCode}</span>)
                                        : <span>_</span>
                                }/>
                            </Col>
                        </>
                    )
                    }
                </Row>

                <div className="d-flex justify-content-between">
                    <Button type="button" color="secondary" outline onClick={goBack}>
                        {translate('common.back')}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default AffiliateInfoCard
