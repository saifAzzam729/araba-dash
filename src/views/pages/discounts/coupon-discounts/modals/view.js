import {Row, Col, Badge} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import {useQuery } from "react-query";
import DiscountsService from "@src/common/services/DiscountsService";
import CustomModal from "@components/modal";
import ViewDateItem from "@components/form-ui/view-item-component/ViewDateItem";
import {ListItem, List, ListItemText, Typography} from "@mui/material";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ViewCouponDiscountModal = ({ isOpen, closeModal, item }) => {
    const {isRtl, translate} = useLocaleContext();

    if (!item) {
        return null;
    }

    const {data} = useQuery(
        ['discount', item.id],
        () => DiscountsService.getById(item.id)
    )

    const discount = data?.data ?? null;

    return (
        <CustomModal
            translatedHeader={translate("discount.common.coupon-discount-details")}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={6} sm={4}>
                    <ViewTextItem label={translate("discount.forms.nameEn")} value={(discount && discount.translations.en.name) || item.name}/>
                </Col>
                <Col xs={6} sm={4}>
                    <ViewTextItem label={translate("discount.forms.nameAr")} value={(discount && discount.translations.ar.name) || item.name}/>
                </Col>
                <Col xs={6} sm={4}>
                    <ViewTextItem label={translate("discount.forms.value")} value={(discount && discount.value) || item.value}/>
                </Col>
                <div className="divider d-none-m"></div>

                <Col xs={6} sm={4}>
                    <ViewTextItem label={translate("discount.forms.couponCode")} value={(discount && discount.couponCode) || item.couponCode}/>
                </Col>
                <Col xs={6} sm={4}>
                    <ViewTextItem label={translate("discount.forms.usageLimitPerUser")} value={(discount && discount.usageLimitPerUser) || item.usageLimitPerUser}/>
                </Col>
                <Col xs={6} sm={4}>
                    <ViewTextItem label={translate("discount.forms.type")}
                                  value={(discount && discount.type === 'FIXED') ? 'Number' : discount?.type}
                    />
                </Col>
                <div className="divider d-none-m"></div>
                <Col xs={6} sm={4}>
                    <ViewTextItem label={translate("discount.forms.applicableTo")} value={(discount && discount.applicableTo) || item.applicableTo}/>
                </Col>
                <Col xs={6} sm={4}>
                    <ViewDateItem label={translate("discount.forms.startDate")} value={(discount && discount.startDate) || item.startDate}/>
                </Col>
                <Col xs={6} sm={4}>
                    <ViewDateItem label={translate("discount.forms.expiryDate")} value={(discount && discount.expiryDate) || item.expiryDate}/>
                </Col>
                <div className="divider d-none-m"></div>
                <Col xs={6} sm={4}>
                    <ViewBooleanItem label={translate("discount.common.active")} value={(discount && discount.active)}/>
                </Col>
                <Col xs={6} sm={4}>
                    <ViewBooleanItem label={translate("discount.forms.applyToAll")} value={(discount && discount.applyToAll)}/>
                </Col>

                {discount?.userGroup?.length > 0 &&
                    <>
                        {/*<div className="divider"></div>*/}
                        <Col xs={12} sm={8}>
                            <div className="d-flex flex-column" style={{gap: "0.5rem"}}>
                                <span>{translate("discount.forms.userGroups")}</span>
                                <span className="h5">
                                    {
                                        discount?.userGroup?.map((obj) => (
                                                <Badge className="ms-auto me-1 text-white mt-25" color={"light-primary"} pill>
                                                    {obj?.name}
                                                </Badge>
                                            )
                                        )
                                    }
                                </span>
                            </div>
                        </Col>
                    </>
                }

                {discount?.categories?.length > 0 &&
                    <>
                        <div className="divider"></div>
                        <Col xs={12}>
                            <ViewTextItem
                                label={translate("discount.forms.categories")}
                                value={
                                    <List>
                                        {discount?.categories?.map((category) => (
                                            <ListItem key={category?.id} className={`text-${isRtl ? 'start' : 'start'}`}>
                                                <ListItemText>
                                                    <Typography variant="body1" sx={{ fontSize: '20px' , fontFamily: 'inherit' }} component="div">
                                                        - {category?.name}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                            )
                                        )}
                                    </List>
                                }
                            />
                        </Col>
                    </>
                }
                {discount?.products?.length > 0 &&
                    <>
                        <div className="divider"></div>
                        <Col xs={12}>
                            <ViewTextItem
                                label={translate("discount.forms.products")}
                                value={
                                <List>
                                    {discount?.products?.map((product) => (
                                        <ListItem key={product?.id} className={`text-${isRtl ? 'start' : 'start'}`}>
                                            <ListItemText>
                                                <Typography className='' variant="body1" sx={{ fontSize: '20px' , fontFamily: 'inherit' }} component="div">
                                                    - {product?.name}
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                        )
                                    )}
                                </List>
                                }
                            />
                        </Col>
                    </>
                }

                {discount?.tags?.length > 0 &&
                    <>
                        <div className="divider"></div>
                        <Col xs={12}>
                            <ViewTextItem
                                label={translate("common.tags")}
                                value={
                                    <List>
                                        {discount?.tags?.map((tag) => (
                                                <ListItem key={tag?.id} className={`text-${isRtl ? 'start' : 'start'}`}>
                                                    <ListItemText>
                                                        <Typography className='' variant="body1" sx={{ fontSize: '20px' , fontFamily: 'inherit' }} component="div">
                                                            - {tag?.title}
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                }
                            />
                        </Col>
                    </>
                }


            </Row>
        </CustomModal>
    );
};

export default ViewCouponDiscountModal;
