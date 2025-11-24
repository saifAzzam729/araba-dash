import React from "react";
import {Card} from "reactstrap";
import NoPagingTableBase from "../../../../../../@core/components/table/NoPagingTableBase";
import wishlistColumns from "../tabsColumns/wishlistColumns";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function WishlistTab({wishlist}) {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();

    const openViewPageProduct = (item) => {
        navigate(makeLocaleUrl(`/products/view/${item.id}`));
    };
    return (
        <Card color="white" className="p-1">
            <NoPagingTableBase
                columns={wishlistColumns}
                data={(wishlist && wishlist.wishlistItems) ?? []}
                onView={openViewPageProduct}
            />

        </Card>
    )
}
