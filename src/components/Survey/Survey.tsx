"use client";

import styles from "./survey.module.scss";
import { useState } from "react";
import { Button } from "../Button/Button";

type SurveyChoice = {
    id: string;
    label: string;
};

const CHOICES: SurveyChoice[] = [
    { id: "music", label: "More music recommendations" },
    { id: "fashion", label: "Fashion & gyaru coords" },
    { id: "beauty", label: "Health & beauty tips" },
    { id: "travel", label: "Tokyo life & travel" },
    { id: "coding", label: "Coding and dev logs" }
];

export const Survey = () => {
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
                What content would you like to see more of? <span className={styles.jp}>どんなコンテンツが見たい？</span>
            </p>
            <div className={styles.surveyOptions}>
                {CHOICES.map((choice) => (
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


