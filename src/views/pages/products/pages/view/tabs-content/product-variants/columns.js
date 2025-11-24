import { Badge } from "reactstrap";

const columns = [
	{ field: "price", headerName: "price", translateKey: "variants.table.price" },
	{ field: "cost", headerName: "cost", translateKey: "variants.table.cost" },
	{
		field: "quantity",
		headerName: "quantity",
		translateKey: "variants.table.quantity",
	},
	{
		field: "options",
		headerName: "options",
		translateKey: "variants.table.options",
		cellRenderer: (params) => {
			console.log(params);
			const options = params.value;

			return <div>{options.map((option) => option.value).join(", ")}</div>;
		},
	},
	{ field: "sku", headerName: "sku", translateKey: "variants.table.sku" },
];

export default columns;
