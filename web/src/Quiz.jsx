import data from "./assets/data.json";
import styles from "./Quiz.module.css";
import { useMemo, useState } from "react";
import { mixSameIdQuestions } from "./QuizUtils.jsx";

export function Quiz() {
    const [quizVersion, setQuizVersion] = useState(0);

    const mixedQuestions = useMemo(() => {
        return mixSameIdQuestions(data);
    }, [quizVersion]);

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <h1 className={styles.title}>{data.exam}</h1>

                <button
                    className={styles.generateButton}
                    onClick={() => setQuizVersion((prev) => prev + 1)}
                >
                    Сгенерировать новый тест
                </button>

                <div className={styles.questionsList}>
                    {mixedQuestions.map((question) => (
                        <div className={styles.questionCard} key={question.id}>
                            <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>
                  Вопрос {question.id}
                </span>

                                <span className={styles.variantBadge}>
                  Variant {question.sourceVariant}
                </span>
                            </div>

                            <h3 className={styles.questionText}>{question.question}</h3>

                            {question.image && (
                                <img src={question.image} alt="question" />
                            )}

                            <div className={styles.optionsList}>
                                {question.options ? (
                                    Object.entries(question.options).map(([key, value]) => (
                                        <div className={styles.optionItem} key={key}>
                                            <span className={styles.optionLetter}>{key}</span>
                                            <span className={styles.optionValue}>{value}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noOqptions}>
                                        У этого вопроса нет вариантов ответа
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}