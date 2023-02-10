import React, { useEffect, useState } from "react";
import { getFilteredResults } from "../api/operations";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import Products from "../components/Products/Products";
import styles from "./Home.module.css";

function Home() {
	// state for the filters
	const [filters, setFilters] = useState({
		category: '',
		brand: '',
		color: '',
		price: { min: 0, max: 30000 },
		freeShipping: '',
	});

	useEffect(() => {
		console.log("Home", filters);
	}, [filters]);
	
	const [productsList, setProductsList] = useState([]);

	

	async function fetchFilteredResults() {
		const results = await getFilteredResults(filters.category, filters.brand, filters.color, filters.price.max, filters.freeShipping);
		console.log(results);
		setProductsList(results);
	}

	useEffect(() => {
		fetchFilteredResults();
	}, [filters]);

    return (
        <div className={styles.homeContainer}>
            <FilterPanel 
			filters={filters}
			setFilters={setFilters}
			
			/>
            <Products productsList={productsList}/>
        </div>
    );
}

export default Home;
