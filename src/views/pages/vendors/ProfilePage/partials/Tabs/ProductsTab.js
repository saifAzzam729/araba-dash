// ** React Imports
import {Fragment} from "react";

// ** Vendor Products Table
import VendorProductsTable from "../vendor-products/VendorProductsTable";

const ProductsTab = ({vendor}) => {
    return (
        <Fragment>
            <VendorProductsTable vendor={vendor} />
        </Fragment>
    );
};

export default ProductsTab;

