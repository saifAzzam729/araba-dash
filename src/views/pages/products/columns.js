import CreateColumn from "../../../@core/components/table/CreateColumn";
import { UncontrolledTooltip } from "reactstrap";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import { Link } from "react-router-dom";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import formatDescription from "@src/utility/helpers/formatDescription";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import {useLocaleContext} from "@src/providers/LocaleProvider";



const AvatarColumn = CreateColumn({
	name: "Image",
	translateKey: 'product.table.product-image',
	maxWidth: '130px',
	cellCustomizationFunction: (row) => (
		<Link
			to={row.imageFileUrl ? ParseImageUrl(row.imageFileUrl) : "#"}
			target={row.imageFileUrl ? "_blank" : undefined}
			className="my-2 gap-sm-1"
		>
			<Avatar
				alt={`${row.name} avatar`}
				sx={{ width: 56, height: 56 }}
				src={ParseImageUrl(row.imageFileUrl)}
			/>
		</Link>
	),
});

const AvatarProductColumn = CreateColumn({
	name: "Image",
	translateKey: 'product.table.product-image',
	cellCustomizationFunction: (row) => (
		<div className='d-flex flex-column gap-75 align-items-center my-1'>
			<div>
				<Link
					to={row.imageFileUrl ? ParseImageUrl(row.imageFileUrl) : "#"}
					target={row.imageFileUrl ? "_blank" : undefined}
					className="my-2 gap-sm-1"
				>
					<Avatar
						alt={`${row.name} avatar`}
						sx={{ width: 45, height: 45 }}
						src={ParseImageUrl(row.imageFileUrl)}
					/>
				</Link>
			</div>
			<div>
				<div className="h6 text-center" id={`product-name-${row.id}`}>
					{row.name}
				</div>
			</div>
		</div>

	),
})

const ProductColumn = CreateColumn({
	name: "Product Info",
	translateKey: 'product.table.product-info',
	cellCustomizationFunction: (row) => {
		const {makeLocaleUrl} = useLocaleContext();

		return (
		
		  <div className="d-flex flex-column my-2 w-100">
			<Link target={"_blank"} to={makeLocaleUrl(`/products/view/${row.id}`)} >
			<div className="h5" id={`product-name-${row.id}`}>
				{row.name}
			</div>
			</Link>
			

			<div  className={`d-flex gap-50 flex-column`}
			>
				{ row.brand &&
					<>
					<span className={'d-none d-md-block'} id={`product-brand-${row.id}`}>{row?.brand?.name}</span>
					<UncontrolledTooltip placement="top" target={`product-brand-${row.id}`}>
						Brand
					</UncontrolledTooltip>
					</>
				}

				{/*{row.categories.length > 0 && row.brand &&*/}
				{/*	<span className={'d-none d-lg-block'}>/</span>*/}
				{/*}*/}
				{ row.ProductGroup &&
					<div className={'d-none d-md-block'}
						 style={{
							 display: "flex",
							 gap: ".5rem",
							 width: '100%',
							 flexWrap: 'wrap'
						 }}

					>
						<span id={`product-group-${row.id}`}>{row?.ProductGroup?.name}</span>
						<UncontrolledTooltip placement="bottom" target={`product-group-${row.id}`}>
							Product Group
						</UncontrolledTooltip>
					</div>
				}

				{ row.categories?.length > 0 &&
					<>
						<span className='d-none d-md-flex gap-25 flex-md-wrap' id={`product-category-${row.id}`}>
						{row?.categories.map((category) => <span class="badge bg-secondary text-capitalize"
																 id={`product-category-${row.id}`}>{category?.name}</span>)}

						</span>
						<UncontrolledTooltip
							placement="top"
							target={`product-category-${row.id}`}
						>
							Category
						</UncontrolledTooltip>
					</>
				}
			</div>



			<UncontrolledTooltip placement="left" target={`product-name-${row.id}`}>
				Product Name
			</UncontrolledTooltip>

		  </div>
		);
	  }
});

const OtherInfoColumn = CreateColumn({
	name: "More Info",
	translateKey: 'product.table.more-info',
	cellCustomizationFunction: (row) => (
		<div className="d-flex flex-column my-2">
			<div
				style={{
					display: "flex",
					gap: "1rem",
				}}
			>
				<span id={`product-description-${row.id}`}>
					{row.description ? formatDescription(row.description) : "-"}
				</span>
			</div>

			<UncontrolledTooltip
				placement="top"
				target={`product-description-${row.id}`}
			>
				Description
			</UncontrolledTooltip>

		</div>
	),
});

const SkuColumn = CreateColumn({
	name: "sku",
	translateKey: 'product.table.sku',
	maxWidth: '100px',
	cellCustomizationFunction: (row) => {
		return (
			<span className="h5">{row.sku}</span>
		)
	},
});


const PriceColumn = CreateColumn({
	name: "Price",
	translateKey: 'product.table.price',
	maxWidth: '100px',
	cellCustomizationFunction: (row) => {
		return (
			<span className="h5">{row.price}</span>
		)
	},
});

const QuantityColumn = CreateColumn({
	name: "quantity",
	translateKey: 'product.table.quantity',
	maxWidth: '100px',
	cellCustomizationFunction: (row) => {
		return (
			<span className="h5">{row.quantity}</span>
		)
	},
});

const PublishColumn = CreateColumn({
	name: "Published To Website",
	translateKey: 'product.table.publish',
	cellCustomizationFunction: (row) => <span>{row.publish ? 'Published' : 'Not Published'}</span>,
});

const columns = [AvatarColumn, ProductColumn, OtherInfoColumn, PriceColumn, PublishColumn];

export const createColumns = (publishToggleMutation, isPublishToggleLoading, outOfStockToggleMutation, isOutOfStockToggleLoading, width) => {

	const PublishToggleColumn = CreateColumn({
		name: "Published To Website",
		translateKey: 'common.publish-to-website',
		cellCustomizationFunction: (row) => (
			<ToggleBtnWithMutation item={row} mutation={publishToggleMutation} isLoading={isPublishToggleLoading} booleanKey={'publish'} />
		),
	});

	const OutOfStockToggleColumn = CreateColumn({
		name: "Out Of Stock",
		translateKey: 'product.common.outOfStock',
		cellCustomizationFunction: (row) => (
			<ToggleBtnWithMutation item={row} mutation={outOfStockToggleMutation} isLoading={isOutOfStockToggleLoading} booleanKey={'outOfStock'} />
		),
	});

	const FeaturedToggleColumn = CreateColumn({
		name: "Featured To Website",
		translateKey: 'product.common.featured',
		cellCustomizationFunction: (row) => <ToggleBtnWithMutation
			item={row}
			mutation={publishToggleMutation}
			isLoading={isPublishToggleLoading}
			booleanKey={'featured'}
		/>,
	});

	if (width <= WindowBreakpoint.sm){
		return [
			AvatarProductColumn,
			PublishToggleColumn,
			OutOfStockToggleColumn,
			FeaturedToggleColumn
		]
	}
	if (width <= WindowBreakpoint.md){
		return [
			AvatarColumn,
			ProductColumn,
			PriceColumn,
			PublishToggleColumn,
			OutOfStockToggleColumn,
			FeaturedToggleColumn
		]
	}
    return [
		AvatarColumn,
		ProductColumn,
		PriceColumn,
		PublishToggleColumn,
		OutOfStockToggleColumn,
		QuantityColumn,
		FeaturedToggleColumn
	]
}

export default columns;
