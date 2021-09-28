import React from "react";
import styles from "./Product.module.css";
import Card from "../../UI/Card/Card";

function Product(props) {
    const {product} = props;
    return (<Card key={product.id} className={styles.product}>
        <img src={product.image_url} alt="A beer pic..."/>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
    </Card>);
}

export default Product;