import React, { useEffect, useState, useContext } from "react";
import { getFilteredResults } from "../api/operations";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import Products from "../components/Products/Products";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductProvider";

function Home({ setLocation }) {
    const navigate = useNavigate();
    const { setSelectedProduct } = useContext(ProductContext);
    const [productsList, setProductsList] = useState([]);
    const [searchTerm, setSearchterm] = useState("");
    // state for the filters
    const [filters, setFilters] = useState({
        category: "",
        brand: "",
        color: "",
        price: { min: 0, max: 32000 },
        freeShipping: "",
    });

    useEffect(() => {
        // console.log("Home", filters);
    }, [filters]);

    async function fetchFilteredResults() {
        const results = await getFilteredResults(
            filters.category,
            filters.brand,
            filters.color,
            filters.price.max,
            filters.freeShipping
        );
        // console.log(results);
        setProductsList(results);
    }

    useEffect(() => {
        // console.log("filters.category", filters.category);
        if (filters.category !== "") {
            setTimeout(() => fetchFilteredResults(), 100);
        }
    }, [filters]);

    function handleSearchterm(value) {
        setSearchterm(value);
    }

    function handleSelectProduct(product) {
        let x = product;
        // console.log(x);
        setSelectedProduct(x);
        navigate(`/${product._id}`);
    }

    function changeBreadcrumbs() {
        setLocation(["Home", "Products"]);
    }

    useEffect(() => {
        changeBreadcrumbs();
    }, []);

    return (
        <div className={styles.homeContainer}>
            <FilterPanel
                filters={filters}
                setFilters={setFilters}
                handleSearchterm={handleSearchterm}
            />
            <Products
                productsList={productsList}
                searchTerm={searchTerm}
                onSelectProduct={handleSelectProduct}
            />
        </div>
    );
}

export default Home;
