import React, { useState, useReducer, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ProductContext, ProductProvider } from "./context/ProductProvider";
import "./App.css";

// const initialState = { product: null };

// const productContext = createContext(initialState);

// const productReducer = (state, action) => {
//     switch (action.type) {
//         case "SELECT_PRODUCT":
//             return { ...state, product: action.payload };
//         default:
//             return state;
//     }
// };

function App() {
    // const [state, dispatch] = useReducer(productReducer, initialState);

    // const [product, setProduct] = useState();
    // function handleProduct(value) {
    //     const product = value;
    //     setProduct(product);
    // }
    //  handleProductOnChange={handleProduct}
    // product={product}
    const [selectedProduct, setSelectedProduct] = useState({});

    return (
        <div className="App">
            <Header />
            <ProductContext.Provider
                value={{ selectedProduct, setSelectedProduct }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/:productId" element={<ProductDetails />}>
                            {" "}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ProductContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
