import React, {useEffect, useState} from "react";
import {arrayMove} from "react-sortable-hoc";
import SortableList
    from "@src/views/pages/products/pages/view/tabs-content/sort-options/partials/options-sort/sortable-list";
import {Button} from "reactstrap";
import _ from "lodash";
import {useMutation, useQueryClient} from "react-query";
import ProductAttributesService from "@src/common/services/ProductAttributesService";
import showSuccessAlert from "@components/alert/showSuccessAlert";

export default function SingleAttributeOptionsSorter({attribute, product}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (attribute && attribute.attributeOptions) {
            setItems([...attribute.attributeOptions])
        }
    }, [attribute]);
    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    }
    const isSortChanged = !_.isEqual(items, attribute.attributeOptions);

    const queryClient = useQueryClient();
    const {mutate} = useMutation(
        (items) => {
            return ProductAttributesService.sortOptions({product: product.id, items});
        },
        {
            onSuccess: (res) => {
                setItems(res.data[0].attributeOptions);
                showSuccessAlert({});
            }
        }
    );

    const handleSortClicked = () => {
        const itemsToSend = items.map((item, index) => {
            return {
                productAttributeOption: item.id,
                sortOrder: index,
            }
        });

        mutate(itemsToSend);
    }

    return (
        <div className={"mb-4"}>
            <div className={"d-flex justify-content-between"}>
                <h2 className={"mb-2"}>{attribute.name}</h2>
                {isSortChanged && <Button
                    type="button"
                    color="success"
                    onClick={handleSortClicked}
                    className="mb-3"
                >
                    {'Sort ' + attribute.name}
                </Button>}
            </div>
            <SortableList key={items} items={items} onSortEnd={onSortEnd} axis={"x"}/>
            <hr/>
        </div>
    )
}
