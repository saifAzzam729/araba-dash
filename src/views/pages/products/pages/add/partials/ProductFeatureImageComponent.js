import defaultImage from "@src/assets/images/default2.svg";
import {Col, FormText} from "reactstrap";
import React, {useState} from "react";
import uuid from "draft-js/lib/uuid";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function ProductFeatureImageComponent() {
    const {translate} = useLocaleContext()
    const {
        register,
        formState:{errors},
    } = useFormContext()

    const [image, setImage] = useState(null);

    async function uploadImage(e) {
        const file = e.target.files[0];
        if (file) {
            const imageObject = await readFileAsync(file);
            setImage(imageObject);
        }
    }

    function readFileAsync(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({
                    id: uuid(),
                    url: reader.result,
                    type: "image"
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    return (
        <>
            <Col xs={12} md={5} lg={3}>
                <label htmlFor="image" className="form-label">
                    {translate('product.forms.feature-image')}
                </label>
                <img
                    src={image ? image.url : defaultImage}
                    width={"100%"}
                    height={'400px'}
                    alt="product feature image"
                    className={'mb-1'}
                />
                <input
                    className="form-control"
                    id="image"
                    {...register("image")}
                    type="file"
                    onChange={uploadImage}
                />
                <FormText color="danger">
                    {errors.image && errors.image.message}
                </FormText>
            </Col>

        </>
    )
}