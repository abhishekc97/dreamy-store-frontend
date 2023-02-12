import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductProvider';

function ProductDetails() {
  const { productId } = useParams();
  console.log(productId);
  // const { productsList } = useContext(ProductContext);
  // const product = productsList.find(p => p._id === productId);

  const { selectedProduct } = useContext(ProductContext);

  return (
    <div>
      {selectedProduct ? (
        <div>
          <h1>{selectedProduct.name}</h1>
          <p>${selectedProduct.price}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetails;