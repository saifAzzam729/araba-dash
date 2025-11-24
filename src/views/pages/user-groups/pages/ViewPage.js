import BreadCrumbs from "@components/breadcrumbs";
import {useQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Row} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import React from "react";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import UserGroupsService from "@src/common/services/UserGroupsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import UserTable from "@src/views/pages/user-groups/partials/UserTable";
import DiscountsTable from "@src/views/pages/user-groups/partials/DiscountsTable";
export default function ViewUserGroupPage() {
    const {translate, makeLocaleUrl} = useLocaleContext()
    const {id} = useParams();
    const navigate = useNavigate();
    const { preferredTableContentLocale } = useSettingsUiContext();

    const {data} = useQuery(
        ['user-group', id],
        () => UserGroupsService.getById(id, {
            locale: preferredTableContentLocale
        })
    )

    const user_group = data?.data ?? null;

    const goBack = () => {
        navigate(makeLocaleUrl("/user-groups"));
    };

    return (
        <>
            <BreadCrumbs title={"user-group-details-page"} data={[{title: translate('common.user-groups'), link: "/user-groups"}]}/>
            <Card className="p-2 p-lg-5 bg-white">
                <div>
                    <h2>{translate('user-groups.view.header')}</h2>
                    <p>{translate('user-groups.view.sub-header')}</p>
                    <hr/>

                    <Row>
                        <Col xs={12} md={6}>
                            <ViewTextItem label={translate('user-groups.forms.nameEn')} value={(user_group && user_group.translations.en.name)}/>
                        </Col>
                        <Col xs={12} md={6}>
                            <ViewTextItem label={translate('user-groups.forms.nameAr')} value={(user_group && user_group.translations.ar.name)}/>
                        </Col>

                        <div className="divider"></div>
                        <Col xs={12} md={6}>
                            <ViewTextItem label={translate('user-groups.forms.descriptionEn')} value={(user_group && user_group.translations.en.description)}/>
                        </Col>
                        <Col xs={12} md={6}>
                            <ViewTextItem label={translate('user-groups.forms.descriptionAr')} value={(user_group && user_group.translations.ar.description)}/>
                        </Col>
                        <div className="divider"></div>
                        <Col xs={12} className='p-0'>
                            <UserTable users={user_group && user_group.users} />
                        </Col>
                        <Col xs={12} className='p-0'>
                            <DiscountsTable discounts={user_group && user_group.discounts} />
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-between">
                        <Button type="button" color="secondary" outline onClick={goBack}>
                            {translate('common.back')}
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}


