import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import ReviewsImagesService from "../../../../common/services/ReviewsImagesService";
import { useQuery } from "react-query";

const ViewReviewImageModal = ({ isOpen, closeModal, item }) => {

	if (!item) {
		return null;
	}
	
	const {data} = useQuery(
		['review', item.id], 
		() => ReviewsImagesService.getById(item.id)
	)

	const review = data?.data ?? null;

	return (
		<CustomModal
			header={"Image Story Details"}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={12}>
					<ViewTextItem label="User Full Name" value={(review && review.userFullName) || item.userFullName}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label="Comment English" value={(review && review.translations.en.comment) || item.comment}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label="Comment Arabic" value={(review && review.translations.ar.comment) || item.comment}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewImageItem label="Image" value={item.mediaFileUrl}/>
				</Col>
				<Col xs={6}>
					<ViewBooleanItem label="Published To Website" value={item.publish}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewReviewImageModal;
