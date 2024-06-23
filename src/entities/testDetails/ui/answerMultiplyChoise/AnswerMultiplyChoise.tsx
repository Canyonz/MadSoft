import { Checkbox, FormControlLabel, FormGroup, SxProps } from "@mui/material";
import { ChangeEvent } from "react";

const defaultSx = {
	alignContent: "start",
	columnGap: "20px",
};

interface AnswerMultiplyChoiseProps {
	answers: string[];
	checkedAnswers?: string[];
	onChange: (value: string[]) => void;
	sx?: SxProps;
}

export const AnswerMultiplyChoise = ({ answers, checkedAnswers = [], onChange, sx }: AnswerMultiplyChoiseProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (checkedAnswers.includes(e.target.name)) {
			return onChange(checkedAnswers.filter((checkedAnswer) => checkedAnswer !== e.target.name));
		}

		onChange([...checkedAnswers, e.target.name]);
	};

	return (
		<FormGroup sx={{ ...defaultSx, ...sx }}>
			{Array.isArray(answers) &&
				answers.map((answer) => (
					<FormControlLabel
						key={answer}
						control={
							<Checkbox
								name={answer}
								checked={checkedAnswers.some((cheked) => cheked === answer)}
								onChange={handleChange}
								sx={{
									color: "var(--bgColorStepsActive)",
									"&.Mui-checked": {
										color: "var(--bgColorStepsActive-hover)",
									},
								}}
							/>
						}
						label={answer}
					/>
				))}
		</FormGroup>
	);
};
