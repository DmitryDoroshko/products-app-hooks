import React, {useEffect, useState} from 'react';
import Products from "./components/Products/Products/Products";
import Register from "./components/Register/Register";
import { v4 as uuidv4 } from 'uuid';
import {NUMBER_OF_REQUESTS, REQUEST_URL} from "./utils/constants";

const App = (props) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [products, setProducts] = useState([]);
    const [filterText, setFilterText] = useState("");

    const filterTextChangeHandler = ({target: {value}}) => {
        setFilterText(value);
    }

    const registerChangeHandler = () => {
        setIsRegistered(!isRegistered);
    }

    useEffect(() => {
        const fetchedProducts = [];
        for (let i = 0; i < NUMBER_OF_REQUESTS; i++) {
            fetch(REQUEST_URL)
                .then(res => res.json())
                .then(product => {
                    fetchedProducts.push({
                        id: uuidv4(),
                        image_url: product[0].image_url,
                        name: product[0].name,
                        description: product[0].description
                    });
                });
        }
        setProducts(fetchedProducts);
    }, []);

    return (
        <div className="App">
            {isRegistered && <div>
                <label htmlFor="filter-text">Search beer by name: </label>
                <input type="text"
                       id="filter-text"
                       className="input-filter-text"
                       value={filterText}
                       onChange={filterTextChangeHandler} />
            </div>}
            {isRegistered
                ? <Products
                    filterText={filterText}
                    products={products} />
                : <Register isRegistered={isRegistered}
                            onIsRegisteredChange={registerChangeHandler} />}
        </div>
    );
}

export default App;
