import React from 'react';
import styles from "./Products.module.css";

function Products() {
  return (
    <div className={styles.rightContainer}>
        <div className={styles.viewOptions}>
            Grid List view and Sort button
        </div>
        <div className={styles.productsContainer}>
            Products
        </div>
    </div>
  )
}

export default Products;