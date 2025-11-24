import AlmostOutOfStockCard from "@components/home-out-of-stock-card/HomeOutOfStockCard";
import {useQuery} from "react-query";
import ProductsService from "@src/common/services/ProductsService";

function ProductOutOfStock() {
    const {data: productsOutOfStock} = useQuery({
        queryKey: ['product-out-of-stock'],
        queryFn: () => ProductsService.productOutOfStock({})
    });

    const productOutOfStock = productsOutOfStock?.items ?? null;

    return (
        <AlmostOutOfStockCard productOutOfStock={productOutOfStock}/>

    )
}

export default ProductOutOfStock