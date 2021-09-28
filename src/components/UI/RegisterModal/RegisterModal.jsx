import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./RegisterModal.module.css";
import ReactDOM from "react-dom";
import React, {Component, useState} from "react";
import Moment from "moment";

function Backdrop(props) {
    return <div className={styles.backdrop} onClick={props.onClose}></div>;
}

function ModalOverlay(props) {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isNameValid, setIsNameValid] = useState(true);
    const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);


    const setInitialState = () => {
        setName("");
        setDateOfBirth("");
        setEmail("");
        setPassword("");

        setIsNameValid(true);
        setIsDateOfBirthValid(true);
        setIsEmailValid(true);
        setIsPasswordValid(true);
    }

    const nameChangeHandler = ({target: {value}}) => {
        let isNameValid_ = true;

        if (value.trim().length < 3) {
            isNameValid_ = false;
        }
        setName(value);
        setIsNameValid(isNameValid_);
    }

    const dateOfBirthChangeHandler = ({target: {value}}) => {
        let isDateOfBirthValid_ = true;
        let date_ = Moment(new Date(value)).format("YYYY-MM-DD");

        setDateOfBirth(date_);
        setIsDateOfBirthValid(isDateOfBirthValid_);
    }

    const emailChangeHandler = ({target: {value}}) => {
        let isEmailValid_ = true;
        if (!value.includes("@")) {
            isEmailValid_ = false;
        }
        setEmail(value);
        setIsEmailValid(isEmailValid_);
    }

    const passwordChangeHandler = ({target: {value}}) => {
        let isPasswordValid_ = true;
        if (value.trim().length < 6) {
            isPasswordValid_ = false;
        }
        setPassword(value);
        setIsPasswordValid(isPasswordValid_);
    }
    return (
        <Card className={styles.modal}>
            <button className={styles.closeButton} onClick={props.onClose}>X</button>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <form className={styles.content} onSubmit={(event) => {
                event.preventDefault();

                if (isNameValid
                    && isDateOfBirthValid
                    && isEmailValid && isPasswordValid) {

                    setInitialState();
                    props.onFormSubmit(event);
                } else {
                    alert("Something went wrong");
                }

            }}>
                <div className={`${styles.controls}`}>
                    <label htmlFor="name">Name {!isNameValid ? <span
                        className={styles.error}>{`Invalid name: (should be more than 2 characters)`}</span> : ""}</label>
                    <input type="text"
                           id="name"
                           value={name}
                           required
                           onChange={e => nameChangeHandler(e)}
                    />
                </div>
                <div className={`${styles.controls}`}>
                    <label htmlFor="date-of-birth">Date of Birth {isDateOfBirthValid ? "" :
                        <span className={styles.error}>{`Invalid date: (should be between 1900-2100)`}</span>
                    }</label>
                    <input type="date"
                           id="date-of-birth"
                           value={dateOfBirth}
                           min="1900-01-01"
                           max="2100-12-31"
                           required
                           onChange={e => dateOfBirthChangeHandler(e)}
                    />
                </div>
                <div className={`${styles.controls}`}>
                    <label htmlFor="email">Email {!isEmailValid ?
                        <span className={styles.error}>{`Invalid email: (should contain @)`}</span> : ""}</label>
                    <input type="email"
                           id="email"
                           value={email}
                           required
                           onChange={e => emailChangeHandler(e)}
                    />
                </div>
                <div className={`${styles.controls}`}>
                    <label htmlFor="password">Password {!isPasswordValid ? <span
                        className={styles.error}>{`Invalid password: (should be more than 5 characters)`}</span> : ""}</label>
                    <input type="password"
                           id="password"
                           value={password}
                           required
                           onChange={e => passwordChangeHandler(e)}
                    />
                </div>
                <div className={styles.actions}>
                    <Button type="submit">{props.buttonMessage}</Button>
                </div>
            </form>
        </Card>
    );
}

function RegisterModal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,
                document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<ModalOverlay
                    title={props.title}
                    message={props.message}
                    onFormSubmit={props.onFormSubmit}
                    onClose={props.onClose}
                    buttonMessage={props.buttonMessage}/>,
                document.getElementById('overlay-root'))}
        </>
    );
}

export default RegisterModal;