import {UncontrolledTooltip} from "reactstrap";
import CreateColumn from "@components/table/CreateColumn";
import {Link} from "react-router-dom";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import Avatar from "@mui/material/Avatar";

const AvatarColumn = CreateColumn({
    name: "Product Image",
    translateKey: 'common.product-image',
    cellCustomizationFunction: (row) => {
        const {productVariant} = row
        return (
            <Link
                to={productVariant.imageFileUrl ? ParseImageUrl(productVariant.imageFileUrl) : "#"}
                target={productVariant.imageFileUrl ? "_blank" : undefined}
                className="my-2"
            >
                <Avatar
                    alt={`${productVariant.name} avatar`}
                    sx={{width: 56, height: 56}}
                    src={ParseImageUrl(productVariant.imageFileUrl)}
                />
            </Link>
        )
    },
});


const ProductColumn = CreateColumn({
    name: "Product Info",
    translateKey: 'common.product-info',

    cellCustomizationFunction: (row) => {
        const {productVariant, saleOrderItemOptions} = row
        return (
            <div className="d-flex flex-column my-2">
                <div className="h4" id={`product-name-${row.id}`}>
                    {productVariant.name}
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                    }}
                >
                    { productVariant.brand &&
                        <>
                            <span id={`product-brand-${row.id}`}>{productVariant?.brand?.name}</span>
                            <UncontrolledTooltip placement="top" target={`product-brand-${row.id}`}>
                                Brand
                            </UncontrolledTooltip>
                        </>
                    }

                    {productVariant.categories.length > 0 && productVariant.brand && <span>/</span>}

                    { productVariant.categories.length > 0 &&
                        <>
						<span className='d-flex gap-25' id={`product-category-${row.id}`}>
						{productVariant?.categories.map((category) => <span class="badge bg-secondary text-capitalize"
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
            </div>
        )
    },
});

const ProductOptions = CreateColumn({
    name: "Product Options",
    translateKey: 'common.product-options',
    cellCustomizationFunction: (row) => {
        const {saleOrderItemOptions} = row
        return (
            <>
                { row.saleOrderItemOptions &&
                    <div
                        style={{
                            display: "flex",
                            gap: '0.5rem',
                            marginTop: '12px',
                            marginBottom: '12px',
                            width: '100%',
                            flexWrap: 'wrap'
                        }}
                    >
                        {saleOrderItemOptions.map((saleOrderItemOption) => {
                            return (
                                <>
                                    <span class="badge bg-warning text-capitalize fs-6" id={`attributeOption-${saleOrderItemOption.attribute}-${saleOrderItemOption.id}`}>
                                        {saleOrderItemOption?.attributeOption}
                                    </span>
                                    <UncontrolledTooltip placement="bottom" target={`attributeOption-${saleOrderItemOption.attribute}-${saleOrderItemOption.id}`}>
                                        {saleOrderItemOption?.attribute} / {saleOrderItemOption?.price}
                                    </UncontrolledTooltip>
                                </>
                            )
                        })
                        }
                    </div>
                }
            </>
        )
    },
});


const QuantityColumn = CreateColumn({
    name: "Quantity",
    translateKey: 'common.quantity',

    cellCustomizationFunction: (row) => (
        <div>
            {row.quantity}
        </div>
    ),
});

const UnitPriceColumn = CreateColumn({
    name: "Unit Price",
    translateKey: 'common.price',

    cellCustomizationFunction: (row) => (
        <div>
            {row.unitPriceAfterDiscount}
        </div>
    ),
});

const TotalProductPriceColumn = CreateColumn({
    name: "Total",
    translateKey: 'common.total',

    cellCustomizationFunction: (row) => (
        <div>
            {row.unitPriceAfterDiscount * row.quantity}
        </div>
    ),
});

const columns = [AvatarColumn, ProductColumn, ProductOptions, QuantityColumn, UnitPriceColumn, TotalProductPriceColumn];

export default columns;