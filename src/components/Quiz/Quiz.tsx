"use client";

import styles from "./quiz.module.scss";
import { useState } from "react";
import { Button } from "../Button/Button";

export type QuizOption = {
    id: string;
    label: string;
};

export const QUIZ_OPTIONS: QuizOption[] = [
    { id: "cinnamoroll", label: "Cinnamoroll" },
    { id: "hello-kitty", label: "Hello Kitty" },
    { id: "pompompurin", label: "Pompompurin" },
    { id: "kuromi", label: "Kuromi" }
];

const CORRECT_ANSWER_ID = "cinnamoroll";

export interface IQuizProps {
    question: string;
    options: QuizOption[];
    correctAnswerId: string;
}

export const Quiz = (props: IQuizProps) => {
    const [selectedOptionId, setSelectedOptionId] = useState<string>("");
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const handleSubmit = () => {
        if (!selectedOptionId) return;
        setHasSubmitted(true);
    };

    const handleReset = () => {
        setSelectedOptionId("");
        setHasSubmitted(false);
    };

    const isCorrect = hasSubmitted && selectedOptionId === CORRECT_ANSWER_ID;
    const isIncorrect = hasSubmitted && selectedOptionId !== CORRECT_ANSWER_ID;

    return (
        <div className={styles.quizRoot}>
            <div className={styles.quizHeader}>sanrio trivia</div>
            <p className={styles.quizQuestion}>
                {props.question}
            </p>

            <div className={styles.quizOptions}>
                {QUIZ_OPTIONS.map((opt) => (
                    <label key={opt.id} className={`${styles.quizOption} windowStyle`}>
                        <input
                            type="radio"
                            name="sanrio-quiz"
                            value={opt.id}
                            checked={selectedOptionId === opt.id}
                            onChange={() => setSelectedOptionId(opt.id)}
                        />
                        <span>{opt.label}</span>
                    </label>
                ))}
            </div>

            <div className={styles.quizActions}>
                {!hasSubmitted ? (
                    <Button text="Submit" onClick={handleSubmit} />
                ) : (
                    <>
                        {isCorrect && <span className={`${styles.quizResult} ${styles.correct}`}>Correct! ♡ Cinnamoroll!</span>}
                        {isIncorrect && <span className={`${styles.quizResult} ${styles.incorrect}`}>Not quite — try again!</span>}
                        <Button text="Try again" onClick={handleReset} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz;


