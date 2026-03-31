import data from "./assets/data.json";
import styles from "./Quiz.module.css";
import { useMemo, useState } from "react";
import { mixSameIdQuestions } from "./QuizUtils.jsx";

export function Quiz() {
    const [quizVersion, setQuizVersion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const mixedQuestions = useMemo(() => {
        return mixSameIdQuestions(data);
    }, [quizVersion]);

    function handleSelectAnswer(questionKey, optionKey) {
        if (showResults) return;

        setSelectedAnswers((prev) => ({
            ...prev,
            [questionKey]: optionKey
        }));
    }

    function handleGenerateNewQuiz() {
        setQuizVersion((prev) => prev + 1);
        setSelectedAnswers({});
        setShowResults(false);
    }

    // 🔥 Подсчёт правильных ответов
    const score = useMemo(() => {
        let correct = 0;

        mixedQuestions.forEach((question, index) => {
            const key = `${question.id}-${question.sourceVariant}-${index}`;
            if (selectedAnswers[key] === question.correctAnswer) {
                correct++;
            }
        });

        return correct;
    }, [showResults, selectedAnswers, mixedQuestions]);

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <h1 className={styles.title}>{data.exam}</h1>

                {/* 🔥 Верхняя панель */}
                <div className={styles.topBar}>
                    <button
                        className={styles.generateButton}
                        onClick={handleGenerateNewQuiz}
                    >
                        Новый тест
                    </button>
                </div>

                {/* 🔥 Счёт */}
                {showResults && (
                    <div className={styles.score}>
                        Õigeid vastuseid: {score} / {mixedQuestions.length}
                    </div>
                )}

                <div className={styles.questionsList}>
                    {mixedQuestions.map((question, index) => {
                        const questionKey = `${question.id}-${question.sourceVariant}-${index}`;
                        const selectedAnswer = selectedAnswers[questionKey];
                        const correctAnswer = question.correctAnswer;

                        return (
                            <div
                                className={styles.questionCard}
                                key={questionKey}
                            >
                                <div className={styles.questionHeader}>
                                    <span className={styles.questionNumber}>
                                        Вопрос {question.id}
                                    </span>

                                    <span className={styles.variantBadge}>
                                        Variant {question.sourceVariant}
                                    </span>
                                </div>

                                <h3 className={styles.questionText}>
                                    {question.question}
                                </h3>

                                {question.image && (
                                    <img src={question.image} alt="question" />
                                )}

                                <div className={styles.optionsList}>
                                    {question.options ? (
                                        Object.entries(question.options).map(([key, value]) => {
                                            const isSelected = selectedAnswer === key;
                                            const isCorrect = correctAnswer === key;
                                            const isWrong =
                                                showResults && isSelected && !isCorrect;

                                            let optionClass = styles.optionItem;

                                            if (isSelected) {
                                                optionClass += ` ${styles.selectedOption}`;
                                            }

                                            if (showResults && isCorrect) {
                                                optionClass += ` ${styles.correctOption}`;
                                            }

                                            if (isWrong) {
                                                optionClass += ` ${styles.wrongOption}`;
                                            }

                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={optionClass}
                                                    onClick={() =>
                                                        handleSelectAnswer(questionKey, key)
                                                    }
                                                >
                                                    <span className={styles.optionLetter}>
                                                        {key}
                                                    </span>
                                                    <span className={styles.optionValue}>
                                                        {value}
                                                    </span>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className={styles.noOptions}>
                                            Нет вариантов ответа
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <button
                className={styles.resultButton}
                onClick={() => setShowResults(true)}
            >
                Показать результаты
            </button>
        </div>
    );
}