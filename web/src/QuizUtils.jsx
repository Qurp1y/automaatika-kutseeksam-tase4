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
    const totalQuestions = variants[0].questions.length;

    for (let i = 0; i < totalQuestions; i++) {
        const sameIdGroup = [];

        for (const variant of variants) {
            sameIdGroup.push({
                ...variant.questions[i],
                sourceVariant: variant.variant
            });
        }

        const shuffled = shuffleArray(sameIdGroup);
        result.push(shuffled[0]);
    }

    return result;
}