import {Row, Col, Card, Button, CardBody} from "reactstrap";
import illustration from "@src/assets/images/illustration/faq-illustrations.svg";
import {FormattedMessage} from "react-intl";
import {useLocaleContext} from "@src/providers/LocaleProvider";

// ** Custom Components
export default function CustomAddCard({
                                          onAdd,
                                          addBtnText = 'Add New Item',
                                          addSubText = 'Add a new role, if it does not exist',
                                          cardClassName = ''
                                      }) {
    const {translate} = useLocaleContext();

    return (
        <Card className={cardClassName}>
            <Row>
                <Col sm={5}>
                    <div className="d-flex align-items-end justify-content-center h-100">
                        <img
                            className="img-fluid mt-2"
                            src={illustration}
                            alt="Image"
                            width={85}
                        />
                    </div>
                </Col>
                <Col sm={7}>
                    <CardBody className="text-sm-end text-center ps-sm-0">
                        <Button
                            color="primary"
                            className="text-nowrap mb-1"
                            onClick={() => {
                                onAdd();
                            }}
                        >
                            {translate(addBtnText)}
                        </Button>
                        <p className="mb-0">
                            {translate(addBtnText)}
                        </p>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    );
}
