import {Card} from "reactstrap";
import Slider from "react-slick";
import React, { useState} from "react";
import ImageSliderImageDisplayer from "@components/image-slider-crud/partials/ImageSliderImageDisplayer";
import MediaSliderThumbnailDisplayer from "@components/image-slider-crud/partials/MediaSliderThumbnailDisplayer";
import ImageSliderFooter from "@components/image-slider-crud/partials/ImageSliderFooter";
import ImageSliderHeader from "@components/image-slider-crud/partials/ImageSliderHeader";
import NoData from "@components/NoData";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomCan from "@components/Authorize/CustomCan";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import VideoSliderDisplay from "@components/video-displayer/VideoSliderDisplay";
import RawVideoSliderDisplay from "@components/video-displayer/RawVideoSliderDisplay";

const MediaSliderBase = ({
                             openAddModal,
                             sliders,
                             openEditPage,
                             openViewPage,
                             onDelete,
                             isLoading,
                             permissionObject = {}
                         }) => {

    const {isRtl} = useLocaleContext();

    const {width} = useWindowSize()

    const [activeIndex, setActiveIndex] = useState(0);


    if (isLoading) {
        return (<Stack className="d-flex align-items-center justify-content-center mt-5"
                       sx={{color: 'grey.500', margin: 'auto'}} direction="row">
                <CircularProgress color="secondary"/>
            </Stack>);
    }


    const settings = {
        customPaging(i) {
            return (<a className='d-none-m'>
                <MediaSliderThumbnailDisplayer sliders={sliders} sliderIndex={i}/>
            </a>);
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: (!!isRtl),
        lazyLoad: true,
        afterChange: (index) => {
            setActiveIndex(index);
        },
    };



    return (<div>
            <Card className={`${width < WindowBreakpoint.md ? 'px-3 py-2 height-650' : 'p-4'}`}>
                <CustomCan permissionName={permissionObject?.add}>
                    <ImageSliderHeader openAddModal={openAddModal}/>
                </CustomCan>

                {sliders.length === 0 && <NoData/>}
                {sliders.length !== 0 && (
                    <Slider className="h-100" {...settings}>
                        {sliders.map((slider, idx) => {
                            return (<div key={slider.id}>
                                {slider.type === "IMAGE" && <ImageSliderImageDisplayer slider={slider}/>}
                                {slider.type === "VIDEO" && <RawVideoSliderDisplay slider={slider} isOnScreen={idx === activeIndex}/>}
                                <ImageSliderFooter
                                    slider={slider}
                                    openEditPage={openEditPage}
                                    openViewPage={openViewPage}
                                    onDelete={onDelete}
                                    permissionObject={permissionObject}
                                />
                            </div>);
                        })}
                    </Slider>
                )}

            </Card>
        </div>)
}


export default MediaSliderBase
