import { Card, Button, CardBody } from "reactstrap";
import illustration from "@src/assets/images/illustration/faq-illustrations.svg";
import {Eye, Plus} from "react-feather";

export default function CustomAddCardMinimal({
	image= false,
	onAdd,
	addBtnText = 'Add New Item',
	addSubText = 'Add a new Item, if it does not exist',
	}) {
	return (
		<Card className="text-center bg-white h-100">
			<CardBody className='d-flex align-items-center justify-content-center flex-column'
			>
				{image &&
					<div
						className={`avatar p-50 m-0 mb-1 bg-light-primary`}
					>
						<div className="avatar-content">
							<div className="d-flex align-items-center justify-content-center h-100">
								<Plus size={20}/>
							</div>
						</div>
					</div>
				}
				<div className="fw-bolder">
					<Button
						color="primary"
						className="text-nowrap mb-1"
						onClick={() => {
							onAdd();
						}}
					>
						{addBtnText}
					</Button>
				</div>
				<p className="card-text line-ellipsis">
					{addSubText}
				</p>
			</CardBody>
		</Card>
	);
}
