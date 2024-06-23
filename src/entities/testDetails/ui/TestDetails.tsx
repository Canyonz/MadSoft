import { Button, FormControl, FormLabel, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useState } from "react";
import { QuestionI, TestDetailsI } from "../model/types/testDetailsType";
import { AnswerMultiplyChoise } from "./answerMultiplyChoise/AnswerMultiplyChoise";
import { AnswerOneChoise } from "./answerOneChoise/AnswerOneChoise";
import { StepProgress } from "./stepProgress/StepProgress";
import { AnswerShort } from "./answerShort/AnswerShort";
import { AnswerDetails } from "./answerDetails/AnswerDetails";
import { Timer } from "./timer";

interface AnswerComponentProps {
	answers: { [key: string]: string | string[] };
	activeQuestion: QuestionI;
	handleChangeAnswer: (qustionName: string, value: string | string[]) => void;
	sx?: SxProps;
}

const AnswerComponent = ({ answers, activeQuestion, handleChangeAnswer, sx }: AnswerComponentProps) => {
	switch (activeQuestion.answerType) {
		case "one choise":
			return (
				<AnswerOneChoise
					answers={activeQuestion.answers as string[]}
					checkedAnswer={(answers[activeQuestion.text] as string) || activeQuestion.answers[0]}
					onChange={(value) => handleChangeAnswer(activeQuestion.text, value)}
					sx={sx}
				/>
			);
		case "multiple choice":
			return (
				<AnswerMultiplyChoise
					answers={activeQuestion.answers as string[]}
					checkedAnswers={answers[activeQuestion.text] as string[]}
					onChange={(value) => handleChangeAnswer(activeQuestion.text, value)}
					sx={sx}
				/>
			);
		case "short answer":
			return (
				<AnswerShort
					value={answers[activeQuestion.text] as string}
					onChange={(value) => handleChangeAnswer(activeQuestion.text, value)}
					sx={sx}
				/>
			);
		case "detailed answer":
			return (
				<AnswerDetails
					value={answers[activeQuestion.text] as string}
					onChange={(value) => handleChangeAnswer(activeQuestion.text, value)}
					sx={sx}
				/>
			);
		default:
			return null;
	}
};

interface TestDetailsProps {
	test: TestDetailsI;
	sx?: SxProps;
}

export const TestDetails = ({ test, sx }: TestDetailsProps) => {
	const [isPlay, setIsPlay] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState(0);
	const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
	const [isError, setIsError] = useState(false);
	const [resultTestText, setResultTestText] = useState("");

	const activeQuestion = test.questions[activeStep];

	const handleClickStartTest = () => {
		setIsPlay(true);
		setResultTestText("");
		setActiveStep(0);
		setAnswers({});
		setIsError(false);
	};

	const handleChangeAnswer = (qustionName: string, value: string | string[]) => {
		setAnswers((prev) => ({ ...prev, [qustionName]: value }));
	};

	const handleClickNextStep = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!(answers[activeQuestion.text] && answers[activeQuestion.text].length)) return setIsError(true);
		setIsError(false);

		if (activeStep >= test.questions.length - 1) return endTest();

		setActiveStep((prev) => prev + 1);
	};

	const endTest = () => {
		const rightAnswersTest = test.questions.filter((question) => {
			if (!answers[question.text]) return false;
			if (Array.isArray(question.rightAnswers)) {
				return question.rightAnswers.sort().toString() === (answers[question.text] as string[]).sort().toString();
			} else {
				return question.rightAnswers.toLowerCase() === (answers[question.text] as string).toLowerCase();
			}
		});

		setResultTestText(`У вас ${rightAnswersTest ? rightAnswersTest.length : 0} правильных ответа из ${test.questions.length}.`);

		setIsPlay(false);
	};

	return (
		<Box display="flex" flexDirection="column" gap="14px" sx={{ width: "100%", height: "100%", ...sx }}>
			<Box display="flex" alignItems="start" gap="12px">
				<Typography variant="h5" fontWeight={700}>
					{test.name}
				</Typography>
				{test.time && <Timer timeTest={test.time} isPlay={isPlay} endTime={endTest} />}
			</Box>

			<StepProgress activeStep={activeStep} length={test.questions.length} />

			{isPlay ? (
				<Box component="form" onSubmit={handleClickNextStep}>
					<FormControl
						component="fieldset"
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							gap: "16px",
							width: "100%",
						}}
					>
						<FormLabel focused={false} sx={{ color: "inherit", fontWeight: 500, minHeight: "50px" }}>
							{activeQuestion.text}
							{isError && <Typography color="tomato">Чтобы пройти дальше, нужно ответить на вопрос</Typography>}
						</FormLabel>

						<AnswerComponent
							answers={answers}
							activeQuestion={activeQuestion}
							handleChangeAnswer={handleChangeAnswer}
							sx={{ height: "200px" }}
						/>

						<Button
							type="submit"
							sx={{
								p: "4px 32px",
								bgcolor: "var(--bgColorStepsActive)",
								color: "var(--colorBtn)",
								textTransform: "none",
								fontWeight: "normal",
								"&:hover": {
									bgcolor: "var(--bgColorStepsActive-hover)",
								},
							}}
						>
							Ответить
						</Button>
					</FormControl>
				</Box>
			) : (
				<Box flex="1" display="flex" flexDirection="column" justifyContent="start" alignItems="start" gap="20px" mt="54px">
					<Typography textAlign="left">{resultTestText || test.descriptions}</Typography>
					<Button
						onClick={handleClickStartTest}
						sx={{
							p: "4px 32px",
							bgcolor: "var(--bgColorStepsActive)",
							color: "var(--colorBtn)",
							textTransform: "none",
							fontWeight: "normal",
							"&:hover": {
								bgcolor: "var(--bgColorStepsActive-hover)",
							},
						}}
					>
						{!resultTestText ? "Начать" : "Повторить"}
					</Button>
				</Box>
			)}
		</Box>
	);
};
