export function QuizUtils () {

}

function shuffleArray(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

export function mixSameIdQuestions(data) {
    const result = [];

    const variants = data.variants;

    // предполагаем что в каждом варианте одинаковое количество вопросов
    const totalQuestions = variants[0].questions.length;

    for (let i = 0; i < totalQuestions; i++) {
        let sameIdGroup = [];

        for (const variant of variants) {
            sameIdGroup.push({
                ...variant.questions[i],
                sourceVariant: variant.variant
            });
        }

        // перемешиваем вопросы с одинаковым id
        sameIdGroup = shuffleArray(sameIdGroup);

        // добавляем в общий массив
        result.push(...sameIdGroup);
    }

    return result;
}