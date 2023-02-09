import React from 'react';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import Products from '../components/Products/Products';
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
        <FilterPanel />
        <Products />

    </div>
  )
}

export default Home