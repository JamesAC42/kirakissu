"use client";

import styles from "./survey.module.scss";
import { useState } from "react";
import { Button } from "../Button/Button";

type SurveyChoice = {
    id: string;
    label: string;
};

export interface ISurveyProps {
    question: string;
    choices: SurveyChoice[];
}

export const Survey = (props: ISurveyProps) => {
    const [selections, setSelections] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState<boolean>(false);

    const toggle = (id: string) => {
        setSelections((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleReset = () => {
        setSelections({});
        setSubmitted(false);
    };

    return (
        <div className={styles.surveyRoot}>
            <div className={styles.surveyHeader}>mini survey</div>
            <p className={styles.surveyQuestion}>
                {props.question}
            </p>
            <div className={styles.surveyOptions}>
                {props.choices.map((choice) => (
                    <label key={choice.id} className={`${styles.surveyOption} windowStyle`}>
                        <input
                            type="checkbox"
                            checked={!!selections[choice.id]}
                            onChange={() => toggle(choice.id)}
                        />
                        <span>{choice.label}</span>
                    </label>
                ))}
            </div>
            <div className={styles.surveyActions}>
                {!submitted ? (
                    <Button text="Submit" onClick={handleSubmit} />
                ) : (
                    <>
                        <span className={styles.surveyThanks}>ありがとう ♡ your preferences are noted!</span>
                        <Button text="Reset" onClick={handleReset} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Survey;


