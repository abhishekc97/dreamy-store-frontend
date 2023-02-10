import React, { useEffect, useState } from "react";
import { getFilteredResults } from "../api/operations";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import Products from "../components/Products/Products";
import styles from "./Home.module.css";

function Home() {
    const [category, setCategory] = useState("all");
	const [brand, setBrand] = useState("");
	const [color, setColor] = useState("");
	
	const [price, setPrice] = useState();
	const [freeshipping, setFreeshipping] = useState("");
	
	const [productsList, setProductsList] = useState([]);

	function handleChangeCategory(value) {
		setCategory("all");
	}
	function handleChangeBrand(value) {
		setBrand("durian");
	}
	function handleChangeColor(value) {
		setColor("black");
	}
	function handleChangePrice(value) {
		setPrice("30000");
	}
	function handleChangeShipping(value) {
		setFreeshipping("yes");
	}

	async function fetchFilteredResults(category, brand, color, price, freeshipping) {
		const results = await getFilteredResults(category, brand, color, price, freeshipping);
		setProductsList(results);
	}

	useEffect(() => {
		fetchFilteredResults(category, brand, color, price, freeshipping)
	}, [category, brand, color, price, freeshipping]);

    return (
        <div className={styles.homeContainer}>
            <FilterPanel 
			category={category}
			selectCategory={handleChangeCategory} 
			brand={brand}
			selectBrand={handleChangeBrand}
			color={color}
			selectColor={handleChangeColor}
			price={price}
			selectPrice={handleChangePrice}
			freeshipping={freeshipping}
			selectShipping={handleChangeShipping}
			/>
            <Products />
        </div>
    );
}

export default Home;
