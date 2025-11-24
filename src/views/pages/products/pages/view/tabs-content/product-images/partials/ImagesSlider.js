import React, { useState } from "react";
import { Card } from "reactstrap";
import Slider from "react-slick";
import NoData from "@components/NoData";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocaleContext } from "@src/providers/LocaleProvider";
import useWindowSize from "@hooks/useWindowSize";
import { WindowBreakpoint } from "@src/utility/context/WindowBreakpoints";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import '../../../../../../../../@core/assets/css/slick.css'

const ImageSlider = ({ sliders, isLoading = {} }) => {
    const { isRtl } = useLocaleContext();
    const [activeIndex, setActiveIndex] = useState(0);

    if (isLoading) {
        return (
            <Stack className="d-flex align-items-center justify-content-center mt-5" sx={{ color: 'grey.500', margin: 'auto' }} direction="row">
                <CircularProgress color="secondary" />
            </Stack>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: !!isRtl,
        afterChange: (index) => setActiveIndex(index),
    };

    return (
        <div>
                {sliders.length === 0 && <NoData />}
                {sliders.length !== 0 && (
                    <Slider className="h-100" {...settings}>
                        {sliders.map((slider) => (
                            <div key={slider.id}>
                                <img
                                    src={ParseImageUrl(slider.imageFileUrl)}
                                    style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                                    alt=""
                                />
                            </div>
                        ))}
                    </Slider>
                )}
        </div>
    );
};

export default ImageSlider;
