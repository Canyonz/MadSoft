import { FormControlLabel, Paper, Radio, RadioGroup, SxProps } from "@mui/material";
import { ChangeEvent, useEffect } from "react";

const Icon = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				width: 16,
				height: 16,
				backgroundColor: "#f5f8fa",
				border: "1px solid #444",
				borderRadius: "50%",
				"input:hover ~ &": {
					backgroundColor: "#ebf1f5",
				},
			}}
		/>
	);
};

const CheckedIcon = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				width: 16,
				height: 16,
				borderRadius: "50%",
				backgroundColor: "var(--bgColorStepsActive)",
				"input:hover ~ &": {
					backgroundColor: "var(--bgColorStepsActive-hover)",
				},
			}}
		/>
	);
};

const defaultSx = {
	alignContent: "start",
	columnGap: "20px",
};

interface AnswerOneChoiseProps {
	answers: string[];
	checkedAnswer?: string;
	onChange: (value: string) => void;
	sx?: SxProps;
}

export const AnswerOneChoise = ({ answers, checkedAnswer = "", onChange, sx }: AnswerOneChoiseProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	useEffect(() => {
		onChange(answers[0]);
	}, []);

	return (
		<RadioGroup
			aria-labelledby="radio-answers"
			name="radio-answers"
			value={checkedAnswer}
			defaultValue={answers[0]}
			onChange={handleChange}
			sx={{ ...defaultSx, ...sx }}
		>
			{Array.isArray(answers) &&
				answers.map((answer) => (
					<FormControlLabel
						key={answer}
						value={answer}
						control={<Radio icon={<Icon />} checkedIcon={<CheckedIcon />} />}
						label={answer}
					/>
				))}
		</RadioGroup>
	);
};
