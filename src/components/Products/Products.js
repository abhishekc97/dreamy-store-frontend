import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../context/ProductProvider";

import styles from "./Products.module.css";

function Products({ productsList, searchTerm, onSelectProduct }) {
    const search = searchTerm;

    const [filteredProductsList, setFilteredProductsList] = useState([]);
    useEffect(() => {
        setFilteredProductsList(productsList);
    }, [productsList]);

    const [sort, setSort] = useState("default");

    function handleSortChange(e) {
        const sorting = e.target.value;
        let list = filteredProductsList;

        switch (sorting) {
            case "asc":
                setSort("asc");
                list = list.sort((a, b) => a.price - b.price);
                setFilteredProductsList(list);
                break;
            case "desc":
                setSort("desc");
                list = list.sort((a, b) => b.price - a.price);
                setFilteredProductsList(list);
                break;
            case "aToZ":
                setSort("aToZ");
                list = list.sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
                setFilteredProductsList(list);
                break;
            case "zToA":
                setSort("zToA");
                list = list.sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA > nameB) return -1;
                    if (nameA < nameB) return 1;
                    return 0;
                });
                setFilteredProductsList(list);
                break;

            default:
                break;
        }
    }

    useEffect(() => {}, [filteredProductsList]);

    const [currentView, setCurrentView] = useState(
        localStorage.getItem("list") === "true" ? "list" : "grid"
    );

    function applySearchFilter() {
        if (search && search.length > 0) {
            const searchFiltered = productsList.filter((product) => {
                const searchText =
                    typeof search === "string" && search.length > 1
                        ? search.toLowerCase()
                        : "";
                const prodName =
                    typeof product.name === "string"
                        ? product.name.toLowerCase()
                        : "";
                return searchText && prodName
                    ? prodName.includes(searchText)
                    : "";
            });
            setFilteredProductsList(searchFiltered);
        } else if (search.length < 1) {
            setFilteredProductsList(productsList);
        }
    }

    useEffect(() => {
        applySearchFilter();
    }, [searchTerm]);

    return (
        <div className={styles.rightContainer}>
            <div className={styles.viewOptions}>
                <button
                    className={`${styles.gridIconContainer} ${
                        currentView === "grid" ? styles.iconShadow : ""
                    }`}
                    onClick={function () {
                        setCurrentView("grid");
                        localStorage.list = false;
                    }}
                ></button>
                <button
                    className={`${styles.listIconContainer} ${
                        currentView === "list" ? styles.iconShadow : ""
                    }`}
                    onClick={function () {
                        setCurrentView("list");
                        localStorage.list = true;
                    }}
                ></button>

                <div className={styles.productCount}>
                    {filteredProductsList && filteredProductsList.length}{" "}
                    Products Found
                </div>
                <div className={styles.line}>
                    <hr></hr>
                </div>
                <div className={styles.filterDropwdown}>
                    Sort By &nbsp;
                    <select
                        name="Filter"
                        value={sort}
                        className={styles.filter}
                        onChange={handleSortChange}
                        defaultValue={"default"}
                    >
                        <option value="default" disabled>
                            Select
                        </option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="desc">Price (High to Low)</option>
                        <option value="aToZ">Name (A-Z)</option>
                        <option value="zToA">Name (Z-A)</option>
                    </select>
                </div>
            </div>
            <div className={styles.productsContainer}>
                <div
                    className={
                        currentView === "grid"
                            ? styles.productsGrid
                            : styles.productsList
                    }
                >
                    {currentView === "grid" &&
                        filteredProductsList &&
                        filteredProductsList.map((product) => (
                            <div
                                key={product.name}
                                className={styles.productGridBox}
                                onClick={() => {
                                    onSelectProduct(product);
                                }}
                            >
                                <img
                                    src={product.images[0]}
                                    alt="gridicon"
                                    className={styles.gridImage}
                                ></img>
                                <div className={styles.gridProductDetails}>
                                    <div>{product.name} &nbsp;</div>
                                    <div className={styles.productPrice}>
                                        ${product.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    {currentView === "list" &&
                        filteredProductsList &&
                        filteredProductsList.map((product) => (
                            <div
                                key={product.name}
                                className={styles.productListBox}
                            >
                                <img
                                    src={product.images[0]}
                                    alt="listicon"
                                    className={styles.listImage}
                                ></img>
                                <div className={styles.listProductDetails}>
                                    <div className={styles.productName}>
                                        {" "}
                                        {product.name}
                                    </div>
                                    <div className={styles.price}>
                                        ${product.price}{" "}
                                    </div>
                                    <div className={styles.description}>
                                        {product.description}{" "}
                                    </div>
                                    <div
                                        className={styles.openDetailsBox}
                                        onClick={() => {
                                            onSelectProduct(product);
                                        }}
                                    >
                                        DETAILS
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
