import CreateColumn from "../../../../../../@core/components/table/CreateColumn";
import {Link} from "react-router-dom";
import ParseImageUrl from "../../../../../../common/helpers/ParseImageUrl";
import Avatar from "@mui/material/Avatar";


const ImageColumn = CreateColumn({
    name: "Image",
    cellCustomizationFunction: (row) => (
        <Link
            to={row.product.imageFileUrl ? ParseImageUrl(row.product.imageFileUrl) : "#"}
            target={row.product.imageFileUrl ? "_blank" : undefined}
            className="my-2"
        >
            <Avatar
                alt={`${row.product.name} avatar`}
                sx={{width: 56, height: 56}}
                src={ParseImageUrl(row.product.imageFileUrl)}
            />
        </Link>
    ),
});

const nameColumn = CreateColumn({
    name: "Name",
    cellCustomizationFunction: (row) => <span>{row.product.name}</span>,
});
const priceColumn = CreateColumn({
    name: "Price",
    cellCustomizationFunction: (row) => <span className="h3">{row.product.price}</span>,
});
const categoryColumn = CreateColumn({
    name: "Category",
    cellCustomizationFunction: (row) => <span>{row.product.category.name}</span>,
});



const wishlistColumns = [
    ImageColumn,
    nameColumn,
    priceColumn,
    categoryColumn,
];

export default wishlistColumns;
