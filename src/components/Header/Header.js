import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductProvider";
import styles from "./Header.module.css";

function Header({ location }) {
    const { selectedProduct } = useContext(ProductContext);
    const [productName, setProductName] = useState("");
    const navigate = useNavigate();

    function getParameters() {
        if (selectedProduct) {
            setProductName(selectedProduct.name);
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
                        <span
                            className={styles.breadCrumb}
                            onClick={() => navigate(`/`)}
                        >
                            {crumb}
                        </span>
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
