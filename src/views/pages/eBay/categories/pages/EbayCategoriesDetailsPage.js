import {useQuery} from "react-query";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {Button, Card, Col, Row, Table} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EbayCategoriesService from "@src/common/services/EbayCategoriesService";

export default function () {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {translate} = useLocaleContext();
    const navigate = useNavigate();

    const {id} = useParams();

    const {data, refetch} = useQuery(['ebay-categories-one'], () => EbayCategoriesService.getById(id, {
        locale: preferredTableContentLocale
    }));
    const categoryDetails = data?.data ?? [];

    const goBack = () => {
        navigate(-1);
    };


    return (
        <Card className={'p-3'}>
            <h2>{translate('ebay-cate.view.header')}</h2>
            <p>{translate('ebay-cate.view.sub-header')}</p>
            <hr/>
            <Row className={'gap-1'}>
                <Col sm={12} md={12} className='mb-1 mb-lg-0'>
                    <ViewTextItem label={translate("ebay-cate.forms.treeName")}
                                  value={(categoryDetails && categoryDetails.categoryTreeName)}/>
                </Col>
                <div className="divider d-none d-md-block"></div>
                <hr/>
                <Col sm={12} md={6} className=' mb-lg-0'>
                    <ViewTextItem label={translate("ebay-cate.forms.parent")}
                                  value={(categoryDetails && categoryDetails.parent?.name)}/>
                </Col>
                <Col sm={12} md={6} className=' mb-lg-0'>
                    <ViewTextItem label={translate("ebay-cate.forms.reference")}
                                  value={(categoryDetails && categoryDetails.ebayReferenceCategoryId)}/>
                </Col>
                <Col sm={12} md={6} className=' mb-lg-0'>
                    <ViewTextItem label={translate("ebay-cate.forms.marketplace")}
                                  value={(categoryDetails && categoryDetails.marketPlaceId)}/>
                </Col>
                <hr/>

                {categoryDetails?.ebayAspects?.length > 0 && (
                    <Col xs={12} md={12}>
                        <h4>{translate("ebay-cate.forms.aspects")}</h4>
                    </Col>
                )}

                {categoryDetails?.ebayAspects?.length > 0 && (
                    <Table responsive bordered className='my-1'>
                        <thead>
                        <tr>
                            <th>{translate("ebay-cate.forms.name")}</th>
                            <th>{translate("ebay-cate.forms.internalKey")}</th>
                            <th>{translate("ebay-cate.forms.internalModel")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categoryDetails.ebayAspects.map((aspect, index) => (
                            <tr key={`aspect-${index}`}>
                                <td style={{width: '33.3%'}}>
                                    {aspect.name} {aspect.required && <span style={{color: 'red'}}>*</span>}
                                </td>
                                <td style={{width: '33.3%'}}>
                                    {aspect.internalKey}
                                </td>
                                <td style={{width: '33.3%'}}>
                                    {aspect.internalModel}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}

            </Row>
            <Row>
                <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                    <Button
                        type="button"
                        color="secondary"
                        outline
                        onClick={goBack}
                        className="mb-3">
                        {translate('common.back')}
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}
