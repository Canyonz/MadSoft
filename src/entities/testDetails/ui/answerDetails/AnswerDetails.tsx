import { SxProps, TextField } from "@mui/material";
import { ChangeEvent } from "react";

const defaultSx = {
	".MuiOutlinedInput-root": {
		maxWidth: "500px",
		"&:hover fieldset": {
			borderColor: "var(--bgColorStepsActive-hover)",
		},
		"&.Mui-focused fieldset": {
			borderColor: "var(--bgColorStepsActive)",
		},
	},
};

interface AnswerDetailsProps {
	value?: string;
	onChange: (value: string) => void;
	sx?: SxProps;
}

export const AnswerDetails = ({ value, onChange, sx }: AnswerDetailsProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<TextField
			fullWidth
			size="small"
			autoComplete="off"
			multiline
			minRows={6}
			value={value}
			onChange={handleChange}
			sx={{ ...defaultSx, ...sx }}
		/>
	);
};
