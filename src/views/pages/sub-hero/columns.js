import CreateColumn from "../../../@core/components/table/CreateColumn";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import {Link} from "react-router-dom";
import formatDescription from "@src/utility/helpers/formatDescription";

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
                sx={{width: 56, height: 56}}
                src={ParseImageUrl(row.imageFileUrl)}
            />
        </Link>
    ),
});

const TitleColumn = CreateColumn({
    name: "Title",
    cellCustomizationFunction: (row) => <span>{row.title}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});


const columns = [AvatarColumn, TitleColumn, DescriptionColumn];

export default columns;
