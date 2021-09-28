import React, {useState} from "react";
import styles from "./Register.module.css";
import Button from "../UI/Button/Button";
import RegisterModal from "../UI/RegisterModal/RegisterModal";

function Register(props) {
    const [registerClicked, setRegisterClicked] = useState(false);

    const closeHandler = () => {
        setRegisterClicked(false);
    }

    const registerClickedHandler = () => {
        setRegisterClicked(true);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        props.onIsRegisteredChange();
    }

        return (
            <div className={styles.register}>
                {!registerClicked ? (<Button className={styles.registerBtn} onClick={registerClickedHandler}>Register</Button>)
                    : <RegisterModal
                        title="Registration Form"
                        buttonMessage="Click me!"
                        onFormSubmit={formSubmitHandler}
                        onClose={closeHandler}/>}
            </div>
        );
}

export default Register;