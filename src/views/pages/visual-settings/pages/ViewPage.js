// ** Reactstrap Imports

import {useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "@components/breadcrumbs";

import {Card, Row, Col, Button} from "reactstrap";

import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import VisualSettingsService from "../../../../common/services/VisualSettingsService";
import ViewImageItem from "../../../../@core/components/form-ui/view-item-component/ViewImageItem";
import {useLocaleContext} from "@src/providers/LocaleProvider";


const ViewPage = () => {
    const navigate = useNavigate();
    const {settingKey} = useParams();
    const {makeLocaleUrl} = useLocaleContext();

    const [setting, setSetting] = useState(null);

    useEffect(() => {
        if (settingKey) {
            VisualSettingsService.getByKey(settingKey).then((res) => {
                console.log('here')
                console.log(res.data);
                setSetting(res.data);
            });
        }
    }, []);

    const goBack = () => {
        navigate(makeLocaleUrl("/visual-settings"));
    };
    const goToEdit = () => {
        navigate(makeLocaleUrl(`/visual-settings/edit/${settingKey}`));
    };

    return (
        <>
            <BreadCrumbs
                title={"Setting Details Page"}
                data={[{title: "Settings", link: "/visual-settings"}]}
            />
            <Card className="p-5">
                <div>
                    <h2>View Setting</h2>
                    <p>View the details of the Setting</p>
                    <hr/>
                    {setting && (
                        <>
                            <Row className="my-2">
                                <Col xs={3}>
                                    <label>
                                        English Title
                                    </label>
                                    <div className="mt-1">
                                        {setting.translations.en.title}
                                    </div>
                                </Col>
                                <Col xs={3}>
                                    <label>
                                         Arabic Title
                                    </label>
                                    <div className="mt-1">
                                        {setting.translations.ar.title}
                                    </div>
                                </Col>
                                <Col xs={3}>
                                    <label>
                                        English Description
                                    </label>
                                    <div className="mt-1">
                                        {setting.translations.en.description}

                                    </div>
                                </Col>
                                <Col xs={3}>
                                    <label>
                                        Arabic Description
                                    </label>
                                    <div className="mt-1">
                                        {setting.translations.ar.description}

                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="my-2">
                                <Col xs={6}>
                                    <ViewImageItem label="Image" value={setting.imageFileUrl}/>
                                </Col>
                            </Row>
                        </>
                    )}
                    <div className="d-flex justify-content-between">
                        <Button type="button" color="warning" onClick={goToEdit}>
                            Edit
                        </Button>
                        <Button type="button" color="secondary" outline onClick={goBack}>
                            Back
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default ViewPage;
