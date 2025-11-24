import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Col, Row} from "reactstrap";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import {yupResolver} from "@hookform/resolvers/yup";
import {addShipmentPackagesSchema} from "@src/views/pages/shipments/shipment-packages/schemas/Add";
import ShipmentPackagesService from "@src/common/services/ShipmentPackagesService";
import OptionsService from "@src/common/services/OptionsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";

const AddShipmentPackagesModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {
    const {translate, isRtl} = useLocaleContext()
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            height: '' ,
            width: '',
            length: '',
            weight: ''
        },
        resolver: yupResolver(addShipmentPackagesSchema(translate)),
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {data: DimensionsData} = useQuery(
        ['dimensions-list'],
        () => OptionsService.getStatisticDimension({
            locale: preferredTableContentLocale
        }),
    )

    const {data: WeightData} = useQuery(
        ['weight-list'],
        () => OptionsService.getStatisticWeight({
            locale: preferredTableContentLocale
        }),
    )

    const DimensionsList = DimensionsData?.data ?? []
    const WeightList = WeightData?.data ?? []

    const {mutate, isError, isLoading} = useMutation(
        (data) => ShipmentPackagesService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {name, description, dimensionUom, height, width, length, weightUom, weight} = data;
        mutate({name,
            description,
            dimensionUom: dimensionUom.value,
            height, width, length,
            weightUom: weightUom.value,
            weight});
    };


    return (
        <CustomModal translatedHeader={translate("shipment-packages.common.add-shipment-package")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-packages.forms.name")}
                                name="name"
                                control={control}
                                placeholder={translate("shipment-packages.forms.name")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-packages.forms.description")}
                                name="description"
                                control={control}
                                placeholder={translate("shipment-packages.forms.description")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate("shipment-packages.forms.dimensionUom")}
                                name={"dimensionUom"}
                                control={control}
                                options={DimensionsList}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-packages.forms.height")}
                                name="height"
                                control={control}
                                placeholder={translate("shipment-packages.forms.height")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-packages.forms.width")}
                                name="width"
                                control={control}
                                placeholder={translate("shipment-packages.forms.width")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-packages.forms.length")}
                                name="length"
                                control={control}
                                placeholder={translate("shipment-packages.forms.length")}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate("shipment-packages.forms.weightUom")}
                                name={"weightUom"}
                                control={control}
                                options={WeightList}
                                errors={errors}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate("shipment-packages.forms.weight")}
                                name="weight"
                                control={control}
                                placeholder={translate("shipment-packages.forms.weight")}
                                errors={errors}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6} className="d-flex align-items-center">
                            <LoadingButton
                                size="medium"
                                type="submit"
                                className={`text-success border-success rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                startIcon={<Edit size={14}/>}
                                loadingPosition="start"
                                loading={isLoading}
                                variant="outlined"
                            >
                                {translate('forms.save')}
                            </LoadingButton>
                        </Col>
                    </Row>

                </div>
            </form>
        </CustomModal>
    );
};

export default AddShipmentPackagesModal;
