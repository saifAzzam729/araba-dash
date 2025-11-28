import CreateColumn from "@components/table/CreateColumn";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import {Link} from "react-router-dom";
import VendorProductBanToggle from "./VendorProductBanToggle";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import React from "react";

const ProductImageNameCell = ({row}) => {
	const {makeLocaleUrl} = useLocaleContext();
	// Get product image - try imageFileUrl first, then defaultImages array
	let productImageUrl = row.imageFileUrl;
	if (!productImageUrl && row.defaultImages && row.defaultImages.length > 0 && row.defaultImages[0]?.imageFileUrl) {
		productImageUrl = row.defaultImages[0].imageFileUrl;
	}
	
	return (
		<div className="d-flex align-items-center gap-3 my-2" style={{ justifyContent: 'flex-start' }}>
			{/* Product Image - links to product page */}
			<Link 
				to={makeLocaleUrl(`/products/view/${row.id}`)}
				className="text-decoration-none"
			>
				<Avatar
					alt={`${row.name} avatar`}
					sx={{ width: 56, height: 56 }}
					src={productImageUrl ? ParseImageUrl(productImageUrl) : undefined}
				/>
			</Link>
			
			{/* Product Name */}
			<div className="d-flex flex-column">
				<Link 
					to={makeLocaleUrl(`/products/view/${row.id}`)}
					className="text-decoration-none"
					id={`product-name-${row.id}`}
				>
					<div className="h5 mb-0" style={{ color: 'inherit' }}>
						{row.name}
					</div>
				</Link>
			</div>
		</div>
	);
};

const ProductImageNameColumn = CreateColumn({
	name: "Product",
	translateKey: 'product.table.product-info',
	cellCustomizationFunction: (row) => <ProductImageNameCell row={row} />,
	style: {
		justifyContent: 'flex-start',
		textAlign: 'left'
	}
});

export const createColumns = (vendorId, onToggleSuccess) => {
	return [
		ProductImageNameColumn,
		CreateColumn({
			name: "Active",
			translateKey: 'action-buttons.active',
			cellCustomizationFunction: (row) => (
				<VendorProductBanToggle 
					item={row} 
					vendorId={vendorId}
					onToggleSuccess={onToggleSuccess}
				/>
			),
		}),
	];
};

export default createColumns;

