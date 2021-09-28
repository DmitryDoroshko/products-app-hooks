import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./ErrorModal.module.css";
import ReactDOM from "react-dom";

function Backdrop() {
    return <div className={styles.backdrop}></div>;
}

function ModalOverlay(props) {
    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <Button onClick={() => props.onErrorOccurred()}>{props.buttonMessage}</Button>
            </footer>
        </Card>
    )
}

function ErrorModal(props) {
        return (
            <>
                {ReactDOM.createPortal(<Backdrop/>,
                    document.getElementById('backdrop-root'))}
                {ReactDOM.createPortal(<ModalOverlay
                        title={props.title}
                        message={props.message}
                        onErrorOccurred={props.onErrorOccurred}
                        buttonMessage={props.buttonMessage}/>,
                    document.getElementById('overlay-root'))}
            </>
        )

}

export default ErrorModal;