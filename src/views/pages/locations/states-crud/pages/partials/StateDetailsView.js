import {Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import React from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function StateDetailsView({state}) {
    const {translate} = useLocaleContext()
    return (
        <Row>
            <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("states.forms.nameEn")} value={(state && state.translations.en.name)}/>
            </Col>
            <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("states.forms.nameAr")} value={(state && state.translations.ar.name)}/>
            </Col>

            <div className="divider d-none d-md-block"></div>
            <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("states.forms.country")} value={(state && state.country.name || state?.country.translations.en.name)}/>
            </Col>
            <Col sm={12} md={6} className='mb-1 mb-lg-0'>
                <ViewBooleanItem label={translate("states.common.publish")} value={(state && state.publish)}/>
            </Col>
            <div className="divider d-none d-md-block"></div>
            <hr/>
        </Row>
    )
}