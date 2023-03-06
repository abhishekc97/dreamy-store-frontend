import React, { useEffect, useState } from "react";
import { getBrands, getCategories, getColors } from "../../api/operations";
import styles from "./FilterPanel.module.css";

function FilterPanel({ filters, setFilters, handleSearchterm }) {
    const handleFilterChange = (filterType, value) => {
        setFilters({
            ...filters,
            [filterType]: value,
        });
    };

    const [filtersCleared, setFiltersCleared] = useState(false);

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
    }, []);

    function onchangeSearch(e) {
        let text = e.target.value;
        handleSearchterm(text);
    }

    function clearFilters() {
        setFilters({
            category: "",
            brand: "",
            color: "",
            price: { min: 0, max: 32000 },
            freeShipping: "",
        });
        setFiltersCleared(true);
    }

    useEffect(() => {
        setTimeout(() => {
            if (filtersCleared) {
                handleFilterChange("category", "all");
                setFiltersCleared(false);
            }
        }, 100);
    }, [filtersCleared]);

    return (
        <div className={styles.filterPanelContainer}>
            <div className={styles.searchboxContainer}>
                <input
                    type="text"
                    placeholder="Search.."
                    onChange={onchangeSearch}
                />
            </div>
            <div className={styles.categoryContainer}>
                <label htmlFor="category" style={{ color: "black" }}>
                    <b>Category</b>
                </label>
                <div
                    className={
                        filters.category === "all"
                            ? styles.cateoryOptionSelected
                            : styles.categoryOption
                    }
                    onClick={(e) => handleFilterChange("category", "all")}
                >
                    All
                </div>
                {categoryList &&
                    categoryList.map((category) => (
                        <div
                            key={category._id}
                            className={
                                filters.category === category.name
                                    ? styles.cateoryOptionSelected
                                    : styles.categoryOption
                            }
                            onClick={(e) =>
                                handleFilterChange("category", category.name)
                            }
                        >
                            {category.name}
                        </div>
                    ))}
            </div>
            <div className={styles.brandsDropdownContainer}>
                <label htmlFor="brand">
                    <b>Brand</b>
                </label>
                <select
                    id="brand"
                    className={styles.brand}
                    value={filters.brand}
                    onChange={(e) =>
                        handleFilterChange("brand", e.target.value)
                    }
                >
                    <option value="">All</option>
                    {brandsList &&
                        brandsList.map((brand) => (
                            <option key={brand._id} value={brand.name}>
                                {brand.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className={styles.colorPalette}>
                <label htmlFor="color">
                    <b>Color</b>
                </label>
                <br />
                <div
                    className={styles.colorOption}
                    onClick={(e) => handleFilterChange("color", "")}
                >
                    All
                </div>
                {colorsList &&
                    colorsList.map((color) => (
                        <div
                            className={
                                filters.color === color.name
                                    ? styles.colorOptionSelected
                                    : styles.colorOption
                            }
                            key={color._id}
                            style={{ backgroundColor: color.name }}
                            onClick={(e) =>
                                handleFilterChange("color", color.name)
                            }
                        ></div>
                    ))}
            </div>
            <div className={styles.priceSliderContainer}>
                <label htmlFor="price">
                    <b>Price</b>
                </label>
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
                <label htmlFor="freeShipping">
                    <b>Free Shipping</b>
                </label>
                <input
                    type="checkbox"
                    id="freeShipping"
                    checked={filters.freeShipping}
                    onChange={(e) =>
                        handleFilterChange("freeShipping", e.target.checked)
                    }
                />
            </div>
            <div className={styles.clearFilterContainer}>
                <button
                    className={styles.clearFilterButton}
                    onClick={() => clearFilters()}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
}

export default FilterPanel;
