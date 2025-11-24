import ApexDonutChart from "@components/charts/ApexDonutChart";
import {useQuery} from "react-query";
import StatisticService from "@src/common/services/StatisticService";

function ProductCategoriesReport() {

    const {data: productCategoryData} = useQuery({
        queryKey: ['product-category-reports'],
        queryFn: () => StatisticService.getCategoryProducts()
    });

    const categories = productCategoryData?.data ?? null;

    return(
        <ApexDonutChart categories={categories}/>
    )
}

export default ProductCategoriesReport