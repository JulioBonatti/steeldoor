"use client"
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './styles.css'


type GeneralToastProps = {
    message: string
    show: boolean,
    setShow: (state: boolean) => void
    type: 'success' | 'warning' | 'danger' | 'dark' 
}


export default function GeneralToast(props: GeneralToastProps) {
    const headerMessage = {
        success: 'Success',
        warning: 'Alert',
        danger: 'Error',
        dark: 'Info',
    }
    return (
        <ToastContainer
            position={'top-end'}
            style={{ zIndex: 1000 }}
        >
            <Toast
                bg={props.type}
                onClose={() => props.setShow(false)}
                show={props.show}
                delay={3000}
                autohide>
                <Toast.Header>
                    <strong className="me-auto">{headerMessage[props.type]}</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer >
    );
}