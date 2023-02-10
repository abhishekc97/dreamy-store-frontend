import React, { useEffect, useState } from "react";
import { getBrands, getCategories, getColors } from "../../api/operations";
import styles from "./FilterPanel.module.css";

function FilterPanel({ filters, setFilters }) {
    const handleFilterChange = (filterType, value) => {
        setFilters({
            ...filters,
            [filterType]: value,
        });
    };

    useEffect(() => {
        console.log("Panel", filters);
    }, [filters]);

    const [categoryList, setCategoryList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);
    const [colorsList, setColorsList] = useState([]);

    async function fetchCategories() {
        const categories = await getCategories();
        setCategoryList(categories);
    }

    async function fetchBrands() {
        const brands = await getBrands();
        setBrandsList(brands);
    }

    async function fetchColors() {
        const colors = await getColors();
        setColorsList(colors);
    }

    useEffect(() => {
		handleFilterChange("category", "all");
        fetchCategories();
        fetchBrands();
        fetchColors();
        console.log(
            "categoryList",
            categoryList,
            "brandslist",
            brandsList,
            "colorslist",
            colorsList
        );
    }, []);
    // console.log("categoryList", categoryList, "brandslist", brandsList, "colorslist", colorsList);

    return (
        <div className={styles.filterPanelContainer}>
            <h3>Filter Panel</h3>
            <div className={styles.searchboxContainer}>
                <input type="text" placeholder="search..." />
            </div>
            <div className={styles.categoryContainer}>
                <label htmlFor="category">Category:</label>
                <div
                    className={
						filters.category === "all"
							? styles.cateoryOptionSelected
							: styles.categoryOption
					}
                    onClick={(e) =>
                        handleFilterChange("category", "all")
                    }
                >
                    All
                </div>
                {categoryList && categoryList.map((category, index) => (
                    <div
                        className={
                            filters.category === category.name
                                ? styles.cateoryOptionSelected
                                : styles.categoryOption
                        }
                        key={index}
                        // value={category.name}
                        onClick={(e) =>
                            handleFilterChange("category", category.name)
                        }
                    >
                        {category.name}
                    </div>
                ))}
            </div>
            <div className={styles.brandsDropdownContainer}>
                <label htmlFor="brand">Brand:</label>
				<br />
                <select
                    id="brand"
                    value={filters.brand}
                    onChange={(e) =>
                        handleFilterChange("brand", e.target.value)
                    }
                >
                    <option value="">All</option>
					{brandsList && brandsList.map((brand) => (
							<option value={brand.name}>{brand.name}</option>
						))
					}
                    
                </select>
            </div>
            <div className={styles.colorPalette}>
                <label htmlFor="color">Color:</label>
				<br />
				<div
                    className={styles.colorOption}
					style={{"border":"none"}}
                    onClick={(e) =>
                        handleFilterChange("color", "")
                    }
                >
                    All
                </div>
                {colorsList && colorsList.map((color) => (
                    <div
                        className={
                            filters.color === color.name
                                ? styles.colorOptionSelected
                                : styles.colorOption
                        }
                        key={color._id}
						style={{"backgroundColor":color.name}}
                        // value={color.name}
                        onClick={(e) =>
                            handleFilterChange("color", color.name)
                        }
                    >
                        
                    </div>
                ))}
            </div>
            <div className={styles.priceSliderContainer}>
                <label htmlFor="price">Price:</label>
				<p className={styles.price}>{filters.price.max}</p>
                <input
                    type="range"
                    id="price"
                    min={0}
                    max={50000}
                    value={filters.price.max}
					step="500"
                    onChange={(e) =>
                        handleFilterChange("price", {
                            min: e.target.min,
                            max: e.target.value,
                        })
                    }
                />
            </div>
            <div className={styles.freeshippingOptionContainer}>
                <label htmlFor="freeShipping">Free Shipping:</label>
                <input
                    type="checkbox"
                    id="freeShipping"
                    checked={filters.freeShipping}
                    onChange={(e) =>
                        handleFilterChange("freeShipping", e.target.checked)
                    }
                />
            </div>
        </div>
    );
}

export default FilterPanel;
