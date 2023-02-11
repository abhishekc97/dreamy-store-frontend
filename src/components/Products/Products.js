import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

function Products({ productsList, searchTerm }) {
    const search = searchTerm;

    // console.log("search", search, "searchTerm", searchTerm);
    // console.log("productsList", productsList);
    const [filteredProductsList, setFilteredProductsList] = useState([]);
    useEffect(() => {
        setFilteredProductsList(productsList);
    }, [productsList]);
    // console.log("filteredProductsList", filteredProductsList);

    const [sort, setSort] = useState("default");

	function handleSortChange(e) {
		const sorting = e.target.value;
		let list = filteredProductsList;
		// console.log("list", list);

		switch (sorting) {
			case "asc":
				setSort("asc");
				list = list.sort((a, b) => a.price - b.price);
				setFilteredProductsList(list);
				// console.log(list);
				break;
			case "desc":
				setSort("desc");
				list = list.sort((a, b) => b.price - a.price);
				setFilteredProductsList(list);
				// console.log(list);
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
			//   console.log(list);
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
			//   console.log(list);
			  break;
			 
			default:
			  break;
		}
	}

	useEffect(() => {
		console.log("changed");
	}, [filteredProductsList])
	
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
                console.log("searchText", searchText);
                const prodName =
                    typeof product.name === "string"
                        ? product.name.toLowerCase()
                        : "";
                // console.log("prodName", prodName);
                return searchText && prodName
                    ? prodName.includes(searchText)
                    : ""; //  && prodName !== searchText;
            });
            setFilteredProductsList(searchFiltered);
            console.log("searchfiltered", searchFiltered);
        } else if(search.length < 1) {
			setFilteredProductsList(productsList);
		}

        // console.log("filteredProductsList ", filteredProductsList);
    }

    useEffect(() => {
        applySearchFilter();
        console.log("filteredProductsList ", filteredProductsList);
    }, [searchTerm]);

    return (
        <div className={styles.rightContainer}>
            <div className={styles.viewOptions}>
                <button
                    className={styles.gridIconContainer}
                    style={{
                        boxShadow:
                            currentView === "grid" && "0px 0px 0px 3px black",
                        marginRight: "10px",
                    }}
                    onClick={function () {
                        setCurrentView("grid");
                        localStorage.list = false;
                    }}
                ></button>
                <button
                    className={styles.listIconContainer}
                    style={{
                        boxShadow:
                            currentView === "list" && "0px 0px 0px 3px black",
                    }}
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
                    >
                        <option value="default" selected disabled>
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
								
                            ><img src={product.images[0]} alt="gridicon" className={styles.gridImage}></img>
                                <div className={styles.gridProductDetails}>
									<div>{product.name}</div>
									<div>${product.price}</div>
								</div>
                            </div>
                        ))}
                    {currentView === "list" &&
                        filteredProductsList &&
                        filteredProductsList.map((product) => (
                            <div
                                key={product.name}
                                className={styles.productListBox}
                            ><img src={product.images[0]} alt="listicon" className={styles.listImage}></img>
                                <div  className={styles.listProductDetails}>{product.name}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
