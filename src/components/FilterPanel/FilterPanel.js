import React, { useEffect, useState } from 'react'
import { getBrands, getColors } from '../../api/operations';
import styles from "./FilterPanel.module.css";

function FilterPanel() {

    const [brandsList, setBrandsList] = useState([]);
    const [colorsList, setColorsList] = useState([]);

    async function fetchBrands() {
        const brands = await getBrands();
        setBrandsList(brands);
    }

    async function fetchColors() {
        const colors = await getColors();
        setColorsList(colors);
    }

    useEffect(() => {
        fetchBrands();
        fetchColors();
        console.log("brandslist", brandsList, "colorslist", colorsList);
    }, []);

  return (
    <div className={styles.filterPanelContainer}>
        FilterPanel
    </div>
  )
}

export default FilterPanel;