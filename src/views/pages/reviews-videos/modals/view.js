import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import ReviewsVideosService from "../../../../common/services/ReviewsVideosService";
import { useQuery } from "react-query";

const ViewReviewVideoModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}

	const {data} = useQuery(
		['review-video', item.id], 
		() => ReviewsVideosService.getById(item.id)
	)

	const review = data?.data ?? null;

	return (
		<CustomModal
			header={"Video Story Details"}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={12}>
					<ViewTextItem label="Name English" value={(review && review.userFullName) || item.userFullName}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label="Description English" value={(review && review.translations.en.comment) || item.comment}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label="Description Arabic" value={(review && review.translations.ar.comment) || item.comment}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewBooleanItem label="Published To Website" value={item.publish}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewReviewVideoModal;
