export type Answer = {
    id: string;
    text: string;
    correct: boolean;
}

export type Question = {
    id: string;
    question: string;
    multiple: boolean;
    answers: Answer[];
}

