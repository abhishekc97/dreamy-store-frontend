import React, { createContext, useReducer } from "react";

export const ProductContext = createContext();

// const initialState = {
//     product: null,
// };

// const reducer = (state, action) => {
//     switch (action.type) {
//         case "SET_PRODUCT":
//             return { ...state, product: action.payload };
//         default:
//             return state;
//     }
// };

// export const ProductProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     const setProduct = (product) => {
//         dispatch({ type: "SET_PRODUCT", payload: product });
//     };

//     return (
//         <ProductContext.Provider value={{ product: state.product, setProduct }}>
//             {children}
//         </ProductContext.Provider>
//     );
// };
