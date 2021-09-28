import React from "react";
import styles from "./Card.module.css";

export default function Card({className, children}) {
    return (
        <div className={`${styles.card} ${className}`}>
            {children}
        </div>
    )
}