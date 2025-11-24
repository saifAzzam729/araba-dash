import { Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { Copy, Star, Trash } from "react-feather";
import CustomCan from "@components/Authorize/CustomCan";
export default function CustomViewCard({
	item,
	onEdit = null,
	onDuplicate = null,
	onDelete = null,
	headingText = "",
	topRightChildren = null,
	editBtnText = "Edit item",
	duplicateTooltipText = "Duplicate Item",
	deleteBtnText = "Delete Item",
	permissionObject = {},
	children = null,
	className = "",
	style={}
}) {
	return (
		<Card className={className} style={style}>
			<CardBody>
				<div className="d-flex justify-content-between">
					<span>{headingText}</span>
					<div>{topRightChildren}</div>
				</div>
				<div className="d-flex justify-content-between align-items-end mt-1 pt-25">
					<div className="role-heading">
						<h4 className="fw-bolder">{item.name}</h4>
						{children}

						{onEdit && (
							<CustomCan permissionName={permissionObject?.edit}>
								<Link
									to=""
									className="role-edit-modal"
									onClick={(e) => {
										e.preventDefault();
										onEdit(item);
									}}
								>
									<small className="fw-bolder">{editBtnText}</small>
								</Link>
							</CustomCan>
						)}
					</div>
					<div className="d-flex">
						{onDuplicate && (
							<CustomCan permissionName={permissionObject?.add}>
								<Link
									to=""
									className="text-success mx-2"
									onClick={(e) => {
										e.preventDefault();
										onDuplicate(item);
									}}
								>
									<UncontrolledTooltip target={`item-cpy-icn-${item.id}`}>
										{duplicateTooltipText}
									</UncontrolledTooltip>
									<Copy
										className="font-medium-5"
										id={`item-cpy-icn-${item.id}`}
									/>
								</Link>
							</CustomCan>
						)}

						{onDelete && (
							<CustomCan permissionName={permissionObject?.delete}>
								<Link
									to=""
									className="text-danger"
									onClick={(e) => {
										e.preventDefault();
										onDelete(item);
									}}
								>
									<UncontrolledTooltip target={`item-trash-icn-${item.id}`}>
										{deleteBtnText}
									</UncontrolledTooltip>
									<Trash
										className="font-medium-5"
										id={`item-trash-icn-${item.id}`}
									/>
								</Link>
							</CustomCan>
						)}
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
