import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

export async function getFilteredResults(
    category,
    brand,
    color,
    price,
    freeshipping
) {
    try {
        const reqUrl = `${URL}/api/operations/getProducts?category=${category}&brand=${brand}&color=${color}&price=${price}&freeshipping=${freeshipping}`;
        const results = await axios.get(reqUrl);

        if (results) {
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCategories() {
    try {
        const reqUrl = `${URL}/api/operations/getCategories`;
        const results = await axios.get(reqUrl);

        if (results) {
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getBrands() {
    try {
        const reqUrl = `${URL}/api/operations/getBrands`;
        const results = await axios.get(reqUrl);

        if (results) {
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getColors() {
    try {
        const reqUrl = `${URL}/api/operations/getColors`;
        const results = await axios.get(reqUrl);

        if (results) {
            return results.data;
        }
    } catch (error) {
        console.log(error);
    }
}
