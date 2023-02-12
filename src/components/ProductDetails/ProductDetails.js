import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductProvider";
import ImageGallery from "react-image-gallery";
import styles from "./ProductDetails.module.css";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();
    console.log(productId);

    const { selectedProduct } = useContext(ProductContext);
    //style={{"display":"flex", "flexDirection":"column"}}
    const [imageArray, setImageArray] = useState([]);

    function storeImages() {
        const images = [];
        selectedProduct &&
            selectedProduct.images.map((link) => {
                images.push({ original: link, thumbnail: link, originalHeight: "400vh" });
            });
        setImageArray(images);
    }

    useEffect(() => {
        storeImages();
        console.log(imageArray);
    }, [selectedProduct]);

    return (
        <div>
            <button className={styles.backButton} onClick={() => navigate("/")}>
                BACK TO PRODUCTS
            </button>
            <div className={styles.productDetailsContainer}>
                {selectedProduct ? (
                    <>
                        <div className={styles.imagesContainer}>
                            <ImageGallery items={imageArray}  />
                        </div>
                        <div className={styles.detailsContainer}>
                            <div className={styles.productName}>{selectedProduct.name}</div>
							<div style={{"display":"flex", "flexDirection":"row", "alignItems":"center","justifyContent":"center"}}>
								<div className={styles.productRating}>{selectedProduct.averageRating} ⭐</div>
								<div className={styles.productText}> ({selectedProduct.reviews.length} customer reviews)</div>
							</div>
                            <div className={styles.productPrice}>${selectedProduct.price}</div>
							<div className={styles.productDescription}>{selectedProduct.description}</div>

							<div className={styles.pairBox}>
								<div className={styles.type}>Available Units:</div>
								<div className={styles.productText}> {selectedProduct.availableUnits} </div>
							</div>
							<div className={styles.pairBox}>
								<div className={styles.type}>SKU:</div>
								<div className={styles.productText}>  {selectedProduct.sku}</div>
							</div>
							<div className={styles.pairBox}>
								<div className={styles.type}>Brand:</div> 
								<div className={styles.productText}> {selectedProduct.brand}</div>
							</div>
                        </div>
                    </>
                ) : (
                    <p>Product not found</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
