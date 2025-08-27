import styles from "./button.module.scss";

import {useState} from "react";

export const Button = ({
    text, 
    small = false,
    onClick,
    children
}: {text?: string, small?: boolean, onClick: () => void, children?: React.ReactNode}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <button 
            className={`${styles.button} ${isPressed ? styles.pressed : ""} ${small ? styles.small : ""} windowStyle`} 
            onClick={onClick} 
            onMouseDown={() => setIsPressed(true)} 
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
        >
            <div className={styles.buttonInner}>
                {
                    children ?
                    children
                    :
                    <span className={styles.buttonText}>
                        {text}
                    </span>
                }
            </div>
        </button>
    )
}