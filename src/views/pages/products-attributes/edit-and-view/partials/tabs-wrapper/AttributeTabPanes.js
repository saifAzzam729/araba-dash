import ViewAndEditForm from "@src/views/pages/products-attributes/edit-and-view/partials/form/ViewAndEditForm";
import {createTabIndex} from "@src/views/pages/products-attributes/add/data";
import {TabPane} from "reactstrap";

function AttributeTabPanes({attributesList, activeTabIndex, refetchingAllAttributes, permissionObject}) {

    const isEqualToTabIndex = (itemId) => createTabIndex(itemId) === activeTabIndex;

    return (<>
        {attributesList.map((attributeItem) => {
            if (isEqualToTabIndex(attributeItem.id)) {
                return (
                    <TabPane tabId={createTabIndex(attributeItem.id)}>
                        <ViewAndEditForm
                            attributeItem={attributeItem}
                            refetchingAllAttributes={refetchingAllAttributes}
                            permissionObject={permissionObject}
                        />
                    </TabPane>
                )
            }
        })}
    </>)
}

export default AttributeTabPanes;
