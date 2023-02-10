import axios from "axios";

export async function getFilteredResults(category, brand, color, price, freeshipping) {
    try {
        console.log(category);

        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getProducts?category=${category}&brand=${brand}&color=${color}&price=${price}&freeshipping=${freeshipping}`;
        console.log(reqUrl);
        const results = await axios.get(reqUrl);

        if(results) {
            console.log(results);
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCategories() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getCategories`;
        const results = await axios.get(reqUrl);

        if(results) {
            console.log(results);
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getBrands() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getBrands`;
        const results = await axios.get(reqUrl);

        if(results) {
            console.log(results);
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getColors() {
    try {
        const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/operations/getColors`;
        const results = await axios.get(reqUrl);

        if(results) {
            console.log(results);
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}