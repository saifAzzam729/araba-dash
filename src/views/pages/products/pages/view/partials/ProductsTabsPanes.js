import { TabContent, TabPane } from "reactstrap";
import ProductImagesTable from "@src/views/pages/products/pages/view/tabs-content/product-images/ProductImagesTable";
import React from "react";
import ProductInfoCard from "@src/views/pages/products/pages/view/tabs-content/info/ProductInfoCard";
import ProductMetaCard from "@src/views/pages/products/pages/view/tabs-content/meta/ProductMetaCard";
import ProductAttributesCard from "@src/views/pages/products/pages/view/tabs-content/attributes/ProductAttributesCard";
import { VIEW_PAGE_TABS_IDS } from "@src/views/pages/products/pages/view/data";
import ProductExtraInfoCard from "@src/views/pages/products/pages/view/tabs-content/extra-info/ProductExtraInfoCard";
import useWindowSize from "@hooks/useWindowSize";
import { WindowBreakpoint } from "@src/utility/context/WindowBreakpoints";
import SortOptionsCard from "@src/views/pages/products/pages/view/tabs-content/sort-options/SortOptionsCard";
import ProductVariantsPage from "@src/views/pages/products/pages/view/tabs-content/product-variants/ProductVariantsPage";
import {WITH_EXTRA_PRODUCT_DETAILS, WITH_PRODUCT_OPTIONS_AND_VARIANTS} from "@src/views/pages/products/config";

function ProductsTabsPanes({ product, activeTab }) {
	const { width } = useWindowSize();

	console.log("product", product);
	return (
		<TabContent activeTab={activeTab}>
			{/* INFO PANE */}
			<TabPane tabId={VIEW_PAGE_TABS_IDS.INFO}>
				<ProductInfoCard product={product} />
			</TabPane>

			{/* META PANE */}
			<TabPane tabId={VIEW_PAGE_TABS_IDS.META}>
				<ProductMetaCard product={product} />
			</TabPane>

			{/* IMAGES PANE */}
			{/*<TabPane tabId={VIEW_PAGE_TABS_IDS.IMAGES}>*/}
			{/*    <ProductImagesTable product={product}/>*/}
			{/*</TabPane>*/}

			{/* ATTRIBUTES PANE */}
			{WITH_PRODUCT_OPTIONS_AND_VARIANTS && <TabPane
				style={{ height: width > WindowBreakpoint.lg ? "500px" : "auto" }}
				tabId={VIEW_PAGE_TABS_IDS.ATTRIBUTES}
			>
				<ProductAttributesCard product={product} />
			</TabPane>}

			{/* EXTRA INFO PANE */}
			{WITH_EXTRA_PRODUCT_DETAILS && (
				<TabPane tabId={VIEW_PAGE_TABS_IDS.EXTRA_INFO}>
					<ProductExtraInfoCard product={product} />
				</TabPane>
			)}

			{/* SORT OPTIONS PANE */}
			{WITH_PRODUCT_OPTIONS_AND_VARIANTS && (
				<TabPane tabId={VIEW_PAGE_TABS_IDS.SORT_OPTIONS}>
					<SortOptionsCard product={product} />
				</TabPane>
			)}

			{/* PRODUCT VARIANTS PANE */}
			{WITH_PRODUCT_OPTIONS_AND_VARIANTS && (
				<TabPane tabId={VIEW_PAGE_TABS_IDS.PRODUCT_VARIANT}>
					{/*<p>{translate('product.common.variant-des')}</p>*/}
					<ProductVariantsPage product={product} />
				</TabPane>
			)}
			{/* PRODUCT IMAGES OPTIONS */}
			{WITH_PRODUCT_OPTIONS_AND_VARIANTS && (
				<TabPane tabId={VIEW_PAGE_TABS_IDS.OPTIONS_IMAGES}>
					{/*<ProductVariantsPage product={product}   />*/}
					<ProductImagesTable product={product} />
				</TabPane>
			)}
		</TabContent>
	);
}

export default ProductsTabsPanes;
