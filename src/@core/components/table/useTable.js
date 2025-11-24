import {useState} from "react";

const useTable = () => {

    const [items, setItems] = useState([]);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({});


    const updateItems = (newItems) => setItems(newItems);
    const updateTotalItemsCount = (newCount) => setTotalItemsCount(newCount);
    const updateCurrentPage = (newCurrentPage) => setCurrentPage(newCurrentPage);

    const updateSearch = (newSearch) => {
        setSearchTerm(newSearch)
        // setCurrentPage(1);
    };

    const updateFilters = (newFiltersObj) => {
        setFilters(newFiltersObj);
    }

    return {
        items,
        totalItemsCount,
        currentPage,
        searchTerm,
        filters,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
        updateSearch,
        updateFilters,
    }

}

export default useTable;
