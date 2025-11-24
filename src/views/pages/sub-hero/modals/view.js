import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import SubHeroService from "@src/common/services/SubHeroService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import { useQuery } from "react-query";

const ViewSubHeroModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}

	const {data} = useQuery(
		['sub-hero', item.id], 
		() => SubHeroService.getById(item.id)
	)

	const subHero = data?.data ?? null;

	return (
		<CustomModal
			header={"Sub Hero Icon Details"}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label="Title English" value={(subHero && subHero.translations.en.title) || item.title}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label="Title Arabic" value={(subHero && subHero.translations.ar.title) || item.title}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label="Description English" value={(subHero && subHero.translations.en.description) || item.description}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label="Description Arabic" value={(subHero && subHero.translations.ar.description) || item.description}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewImageItem label="Image" value={item.imageFileUrl}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewSubHeroModal;
