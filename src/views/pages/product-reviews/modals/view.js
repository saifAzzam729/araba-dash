import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ProductReviewsService from "@src/common/services/ProductReviewsService";

const ViewProductReviewModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}

	const {translate} = useLocaleContext()


	const {data} = useQuery(
		['product-review', item.id],
		() => ProductReviewsService.getById(item.id)
	)

	const productReview = data?.data ?? null;

	return (
		<CustomModal
			translatedHeader={translate("product-review.common.product-review-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("product-review.forms.title")}
								  value={(productReview && productReview.title) || item.title}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("product-review.forms.product")}
								  value={(productReview && productReview.product.name) || item.product.name}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("product-review.forms.user_fullname")}
								  value={(productReview && productReview.userFullName) || item.userFullName}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("product-review.forms.user_email")}
								  value={(productReview && productReview.userEmail) || item.userEmail}/>
				</Col>
				<div className="divider"></div>

				<Col xs={12}>
					<ViewTextItem label={translate("product-review.forms.message")}
								  value={(productReview && productReview.message) || item.message}/>
				</Col>

				<div className="divider"></div>
				<Col xs={12} sm={6}>
					<ViewBooleanItem label={translate("product-review.forms.publish")} value={item.publish}/>
				</Col>

				<Col xs={12} sm={6}>
					<ViewImageItem label={translate("product-review.forms.image")} value={item.imageFileUrl}/>
				</Col>

			</Row>
		</CustomModal>
	);
};

export default ViewProductReviewModal;
