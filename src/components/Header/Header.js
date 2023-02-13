import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductProvider";
import styles from "./Header.module.css";

function Header({ location }) {
    const { selectedProduct } = useContext(ProductContext);
    const [productName, setProductName] = useState("");

    function getParameters() {
        if (selectedProduct) {
            setProductName(selectedProduct.name);
            // console.log(selectedProduct);
        }
    }
    useEffect(() => {
        getParameters();
    }, [selectedProduct]);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerText}>
                {location.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <span className={styles.breadCrumb}>{crumb}</span>
                        {index < location.length - 1 && (
                            <span className={styles.slash}> / </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Header;
