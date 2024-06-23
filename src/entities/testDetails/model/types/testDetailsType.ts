export type AnswerTypeI = "one choise" | "multiple choice" | "short answer" | "detailed answer";

export type QuestionTypeI = "text" | "text with images";

export interface QuestionI {
	text: string;
	type: QuestionTypeI;
	answerType: AnswerTypeI;
	answers: string | string[];
	rightAnswers: string | string[];
}

export interface TestDetailsI {
	name: string;
	time?: number;
	descriptions?: string;
	questions: QuestionI[];
}
