import {Card} from "reactstrap";
import SingleAttributeOptionsSorter from "./partials/options-sort/single-attribute-options-sorter";

export default function SortOptionsCard({product}) {

    return (
        <Card className="p-5 bg-white">
            {product.attributes.map(att => {
                return (
                    <SingleAttributeOptionsSorter
                        key={'SingleAttributeOptionsSorter-' + att.id}
                        attribute={att}
                        product={product}
                    />
                )
            })}
        </Card>
    )
}

