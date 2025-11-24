import CustomModal from "../../../../@core/components/modal";
import {Row, Col, Badge} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import {useQuery} from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import TaxesService from "@src/common/services/TaxesService";

const ViewTaxModal = ({isOpen, closeModal, item}) => {
    if (!item) {
        return null;
    }
    const {translate} = useLocaleContext()

    const {data} = useQuery(
        ['tax', item.id],
        () => TaxesService.getById(item.id)
    )

    const tax = data?.data ?? null;

    return (
        <CustomModal
            translatedHeader={translate("tax.common.tax-details")}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={6}>
                    <ViewTextItem label={translate("tax.forms.nameEn")}
                                  value={(tax && tax.translations.en.name) || item.name}/>
                </Col>
                <Col xs={6}>
                    <ViewTextItem label={translate("tax.forms.nameAr")}
                                  value={(tax && tax.translations.ar.name) || item.name}/>
                </Col>

                <div className="divider"></div>
                <Col xs={6}>
                    <ViewTextItem label={translate("tax.forms.descriptionEn")}
                                  value={(tax && tax.translations.en.description) || item.description}/>
                </Col>
                <Col xs={6}>
                    <ViewTextItem label={translate("tax.forms.descriptionAr")}
                                  value={(tax && tax.translations.ar.description) || item.description}/>
                </Col>
                <div className="divider"></div>

                <Col xs={6}>
                    <ViewTextItem label={translate("tax.forms.taxRate")} value={(tax && tax.taxRate) || item.taxRate}/>
                </Col>
                <Col xs={6}>
                    <ViewBooleanItem label={translate("tax.forms.publish")} value={item.publish}/>
                </Col>
                <div className="divider"></div>

                {/*{tax && tax.products.length > 0 &&*/}
                {/*    <Col xs={12}>*/}
                {/*        <p>{translate("tax.forms.products")}</p>*/}
                {/*        {tax.products.map((pro) => {*/}
                {/*            return (*/}
                {/*                <span className="h5">*/}
                {/*                    <Badge*/}
                {/*                        color={"primary"}*/}
                {/*                        className="text-capitalize m-1"*/}
                {/*                    >*/}
                {/*                        {pro.name}*/}
                {/*                    </Badge>*/}
                {/*                </span>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </Col>*/}

                {/*}*/}
            </Row>
        </CustomModal>
    );
};

export default ViewTaxModal;
