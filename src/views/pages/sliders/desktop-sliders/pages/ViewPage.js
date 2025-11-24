import React from "react";
import {useNavigate, useParams} from "react-router-dom";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "@components/breadcrumbs";
import { Button, Col, Row, Card } from "reactstrap";
import {useQuery} from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import SlidersServices from "@src/common/services/SliderService";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";
import {Check, X} from "react-feather";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import VideoSliderDisplay from "@components/video-displayer/VideoSliderDisplay";


const ViewSliders = () => {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {translate} = useLocaleContext();
    const {id} = useParams();
    const {width} = useWindowSize()

    const {data} = useQuery(
        ['slider', id],
        () => SlidersServices.getById(id)
    )

    const slider = data?.data ?? null;

    const goBack = () => {
        navigate(makeLocaleUrl("/desktop-sliders"));
    };


    return (
        <>
            <BreadCrumbs
                title={"view-slider-page"}
                data={[{ title: translate('common.sliders'), link: "/desktop-sliders" }]}
            />
            <Card className={width <= WindowBreakpoint.md ? '' : "p-5"}>
                <div className='mb-1'>
                    <h3>{translate('common.view-slider-page')}</h3>
                </div>
                <div className="invoice-add-wrapper">
                    <Row className="invoice-add">
                        <Col xl={12}>
                            <Row>
                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.titleEn')} :  </span>
                                    <span className="fs-4 d-inline-block" dangerouslySetInnerHTML={{ __html: slider?.translations?.en?.title }}/>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.titleAr')} : </span>
                                    <span className="fs-4 d-inline-block" dangerouslySetInnerHTML={{ __html: slider?.translations?.ar?.title }}/>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.descriptionEn')} : </span>
                                    <span className="fs-4 d-inline-block" dangerouslySetInnerHTML={{ __html: slider?.translations?.en?.description }}/>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.descriptionAr')} : </span>
                                    <span className="fs-4 d-inline-block" dangerouslySetInnerHTML={{ __html: slider?.translations?.ar?.description }}/>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.link')} :  </span>
                                    <span className="fs-4 d-inline-block">{slider?.link}</span>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.buttonTextEn')} : </span>
                                    <span className="fs-4 d-inline-block" dangerouslySetInnerHTML={{ __html: slider?.translations?.en?.buttonText }}/>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.buttonTextAr')} : </span>
                                    <span className="fs-4 d-inline-block" dangerouslySetInnerHTML={{ __html: slider?.translations?.ar?.buttonText }}/>
                                </Col>

                                <Col xs={12} className="mb-2">
                                    <span className='text-black'>{translate('sliders.forms.buttonColor')} : </span>
                                    <span className="fs-4 d-inline-block">{slider?.buttonColor}</span>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <p className="text-black">{translate('sliders.forms.publish')}: <span className="fs-4 text-black">
                                            <span className="h3">
                                                {slider?.publish ? <Check className={"text-success"}/> : <X className={"text-danger"}/>}
                                            </span>
                                        </span>
                                    </p>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    {slider?.type === "IMAGE" &&  <img src={parseImageUrl(slider?.mediaFileUrl)} width={400}/>}
                                    {slider?.type === "VIDEO" && <VideoSliderDisplay slider={slider} isOnScreen={true}/>}
                                </Col>

                            </Row>

                            <div className="d-flex align-items-center justify-content-start gap-1">
                                <Button
                                    type="button"
                                    color="secondary"
                                    outline
                                    onClick={goBack}
                                    className="mb-3"
                                >
                                    {translate('common.back')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </>
    );
};

export default ViewSliders
