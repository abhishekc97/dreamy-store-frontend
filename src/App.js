import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ProductContext } from "./context/ProductProvider";
import "./App.css";

function App() {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [location, setLocation] = useState(["Home"]);

    return (
        <ProductContext.Provider
            value={{ selectedProduct, setSelectedProduct }}
        >
            <div className="App">
                <BrowserRouter>
                    <Header location={location} />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home setLocation={setLocation} />}
                        ></Route>
                        <Route
                            path="/:productId"
                            element={
                                <ProductDetails setLocation={setLocation} />
                            }
                        >
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
