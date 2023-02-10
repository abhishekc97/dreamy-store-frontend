import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

function Products({ productsList }) {
    // change between grid and list view
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(productsList);
		console.log(products);
	}, [productsList]);

	console.log("products", products);

	console.log("productsList", productsList);
    return (
        <div className={styles.rightContainer}>
            <div className={styles.viewOptions}>
                Grid List view and Sort button
            </div>
            <div className={styles.productsContainer}>
				{products && products.map((product) => (
					<div key={product.name} className={styles.product}>
						{product.name}
					</div>
				))}
			</div>
        </div>
    );
}

export default Products;
