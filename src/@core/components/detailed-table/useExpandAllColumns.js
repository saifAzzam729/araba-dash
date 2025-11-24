import { useCallback, useState } from "react";

export default function useExpandCollapseAll(gridRef) {
    const [isExpanded, setIsExpanded] = useState(false);

    const expandCollapseAll = useCallback(() => {
        if (gridRef.current) {
            gridRef.current.api.forEachNode((node) => {
                node.setExpanded(!isExpanded);
            });
            gridRef.current.api.onGroupExpandedOrCollapsed();
            setIsExpanded((prev) => !prev);
        }
    }, [gridRef, isExpanded]);

    return {
    expandCollapseAll,
    isExpanded
    }
}
