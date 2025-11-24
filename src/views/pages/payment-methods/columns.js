import CreateColumn from "../../../@core/components/table/CreateColumn";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import { Link } from "react-router-dom";

const AvatarColumn = CreateColumn({
	name: "Image",
	cellCustomizationFunction: (row) => (
		<Link
			to={row.imageFileUrl ? ParseImageUrl(row.imageFileUrl) : "#"}
			target={row.imageFileUrl ? "_blank" : undefined}
			className="my-2"
		>
			<Avatar
				alt={`${row.name} avatar`}
				sx={{ width: 56, height: 56 }}
				src={ParseImageUrl(row.imageFileUrl)}
			/>
		</Link>
	),
});

const NameColumn = CreateColumn({
	name: "Name",
	cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const IdentifierColumn = CreateColumn({
	name: "Identifier",
	cellCustomizationFunction: (row) => <span>{row.identifier}</span>,
});
const PublishColumn = CreateColumn({
	name: "Published To Website",
	cellCustomizationFunction: (row) => <span>{row.publish ? 'Published' : 'Not Published'}</span>,
});

const columns = [AvatarColumn, NameColumn, IdentifierColumn, PublishColumn];

export default columns;
