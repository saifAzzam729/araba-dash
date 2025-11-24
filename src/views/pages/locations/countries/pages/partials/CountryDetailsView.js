import {Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import React from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function CountryDetailsView({country}) {
    const {translate} = useLocaleContext()

    return (
        <Row>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("countries.forms.nameEn")} value={(country && country.translations.en.name)}/>
            </Col>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("countries.forms.nameAr")} value={(country && country.translations.ar.name)}/>
            </Col>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("countries.forms.localeCode")} value={(country && country.localeCode) ?? "_"}/>
            </Col>
            <div className="divider d-none d-md-block"></div>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("countries.forms.phoneNumberCode")} value={(country && country.phoneNumberCode)}/>
            </Col>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <ViewTextItem label={translate("countries.forms.iso2")} value={(country && country.iso2)}/>
            </Col>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <ViewTextItem label="ISO3" value={(country && country.iso3)  ?? '_'}/>
            </Col>
            <div className="divider d-none d-md-block"></div>
            <Col sm={12} md={4} className='mb-1 mb-lg-0'>
                <ViewBooleanItem label={translate("countries.forms.active")} value={country && country.active}/>
            </Col>
            <div className="divider d-none d-md-block"></div>
            <hr/>
        </Row>
    )
}