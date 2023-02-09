import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div className="App">
							<Header /> 
							<Home />
							<Footer />
						</div>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
