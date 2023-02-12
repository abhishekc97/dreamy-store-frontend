import React, { useState, useReducer, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ProductContext, ProductProvider } from "./context/ProductProvider";
import "./App.css";

function App() {
    const [selectedProduct, setSelectedProduct] = useState({});

    return (
        <ProductContext.Provider
            value={{ selectedProduct, setSelectedProduct }}
        >
            <div className="App">
                <BrowserRouter>
                <Header />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/:productId" element={<ProductDetails />}>
                            {" "}
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Footer />
            </div>
        </ProductContext.Provider>
    );
}

export default App;
