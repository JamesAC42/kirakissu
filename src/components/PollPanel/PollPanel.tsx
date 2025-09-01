import styles from "./pollpanel.module.scss";

import { Button } from "../Button/Button";

export interface IPollPanelProps {
    poll: {
        question: string;
        options: string[];
    };
}

export const PollPanel = (props: IPollPanelProps) => {
    return (
        <div className={`windowContent ${styles.pollFormContainer}`}>
            <p>{props.poll.question}</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("ありがとう ♡"); }}>
            <div className={styles.pollForm}>
                {props.poll.options.map((option) => (
                    <label key={option}><input type="radio" name="sanrio" /> {option}</label>
                ))}
            </div>
            <div className={styles.pollButtonContainer}>
                <Button text="Vote" onClick={() => {}} />
            </div>
            </form>
        </div>
    );
};