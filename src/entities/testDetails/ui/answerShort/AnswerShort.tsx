import { SxProps, TextField } from "@mui/material";
import { ChangeEvent } from "react";

const defaultSx = {
	".MuiOutlinedInput-root": {
		maxWidth: "400px",
		"&:hover fieldset": {
			borderColor: "var(--bgColorStepsActive-hover)",
		},
		"&.Mui-focused fieldset": {
			borderColor: "var(--bgColorStepsActive)",
		},
	},
};

interface AnswerShortProps {
	value?: string;
	onChange: (value: string) => void;
	sx?: SxProps;
}

export const AnswerShort = ({ value = "", onChange, sx }: AnswerShortProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<TextField fullWidth size="small" autoComplete="off" value={value} onChange={handleChange} sx={{ ...defaultSx, ...sx }} />
	);
};
